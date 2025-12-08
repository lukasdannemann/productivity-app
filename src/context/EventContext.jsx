import { createContext } from "react"

export const EventContext = createContext()

export default function EventProvider({children}){


    return(
        <EventContext>
            {children}
        </EventContext>
    )
}