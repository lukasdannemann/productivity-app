import { createContext, useState } from "react"

export const EventContext = createContext()

export default function EventProvider({children}){

    const [events, setEvents] = useState([])

    const sortedEvents = [...events].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    )
    return(
        <EventContext value={{events, setEvents, sortedEvents}}>
            {children}
        </EventContext>
    )
}