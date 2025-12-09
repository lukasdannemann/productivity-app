import { useContext } from "react"
import { EventContext } from "../../context/EventContext"
import styles from '../EventsDiv/Events.module.css'

const Events = () => {

    const { sortedEvents} = useContext(EventContext)
    return(
        <div className={styles.eventsGrid}>
            {sortedEvents?.map(event => (
                <div key={event.title} className={styles.eventsDiv}>
                    <h3>{event.title}</h3>
                    <ul>
                        <li>Beskrivning: {event.description}</li>
                        <li>Datum: {event.date}</li>
                        <li>Starttid: {event.start}</li>
                        <li>Sluttid: {event.end}</li>
                    </ul>
                </div>
            ))}
        </div>
    )
}
export default Events