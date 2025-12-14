import { createContext, useState } from "react"

export const EventContext = createContext()

export default function EventProvider({children}){

    const [events, setEvents] = useState([])
    const [editEvent, setEditEvent] = useState(null)
    const [filter, setFilter] = useState('')
    const [showForm, setShowForm] = useState(false)

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