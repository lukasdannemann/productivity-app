import { useContext } from "react"
import { EventContext } from "../../context/EventContext"
import styles from '../EventsDiv/Events.module.css'

const Events = () => {

    const {sortedEvents, deleteEvent} = useContext(EventContext)
    return(
        <div className={styles.eventsGrid}>
            {sortedEvents?.map(event => (
                <div key={event.id} className={styles.eventsDiv}>
                    <h3>{event.title}</h3>
                    <ul>
                        <li>Beskrivning: {event.description}</li>
                        <li>Starttid: {new Date(event.start).toLocaleDateString('sv-SE')} {' '}
                             {new Date(event.start).toLocaleTimeString('sv-SE', 
                                {hour: '2-digit', minute: '2-digit'})}</li>
                        <li>Sluttid: {new Date(event.end).toLocaleDateString('sv-SE')} {' '}
                             {new Date(event.end).toLocaleTimeString('sv-SE', 
                                {hour: '2-digit', minute: '2-digit'})}</li>
                    </ul>
                    <button onClick={() => deleteEvent(event.id)}>Ta bort</button>  
                </div>
            ))}
        </div>
    )
}
export default Events