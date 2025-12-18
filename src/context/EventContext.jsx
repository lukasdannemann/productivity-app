import { createContext, useContext, useEffect, useState } from "react"
import { UserContext } from "./UserContext"

export const EventContext = createContext()

export default function EventProvider({children}){

    const { currentUser } = useContext(UserContext)

    const [events, setEvents] = useState(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('currentUser')) ||
    JSON.parse(localStorage.getItem('currentUser'))

    if(storedUser){
      const allEvents = JSON.parse(localStorage.getItem('events')) || {};
      return allEvents[storedUser.id] || [];
    }
    return []
  });
  
    const [editEvent, setEditEvent] = useState(null)
    const [filter, setFilter] = useState('')
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        if(currentUser){
            const allEvents = JSON.parse(localStorage.getItem('events')) || {}
            const currentUserEvents = allEvents[currentUser.id] || []
            setEvents(currentUserEvents)
        }else{
            setEvents([])
        }
    }, [currentUser])

    useEffect(() => {
        if (currentUser && events.length >= 0){

            const allEvents = JSON.parse(localStorage.getItem('events')) || {}

            allEvents[currentUser.id] = events
            localStorage.setItem('events', JSON.stringify(allEvents))
        }
    }, [events, currentUser])

    const startEditing = (event) => {
        setEditEvent(event)
        setShowForm(true)
    }
    const stopEditing = () => {
        setEditEvent(null)
    }

    const sortedEvents = [...events].sort(
        (a, b) => new Date(a.start) - new Date(b.start)
    )

    const getFilteredEvents = () => {
        const now = new Date()

        if (filter === 'past'){
            return sortedEvents.filter(event => new Date(event.end) < now)
        }
        if (filter === 'upcoming'){
            return sortedEvents.filter(event => new Date(event.end) >= now)
        }
        return sortedEvents
    }

    const deleteEvent = (id) => {
        setEvents([...events].filter(event => event.id !== id))
    }
    
    return(
        <EventContext value={{
            events, setEvents, deleteEvent, editEvent, 
            startEditing, stopEditing, getFilteredEvents, filter, setFilter,
            showForm, setShowForm}}>
            {children}
        </EventContext>
    )
}