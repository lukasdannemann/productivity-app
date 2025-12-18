import { useContext } from "react"
import { EventContext } from "../../../context/EventContext"
import styles from '../EventsDiv/Events.module.css'

const Events = () => {

    const { deleteEvent, startEditing, 
        getFilteredEvents, events, filter, setFilter, setShowForm } = useContext(EventContext)

    //Checkar om ett event redan infallit
    const isPastEvent = (event) => {
        const now = new Date();
        const endDate = new Date(event.end);
        return endDate < now;
    }

    const displayedEvents = getFilteredEvents()
    return (
        <>
        { events.length > 0 && (
        <div className="controls">
            <label htmlFor="filter">Filter: </label>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="all">Show all</option>
                <option value="past">Past events</option>
                <option value="upcoming">Upcoming events</option>
            </select>
        </div>
        )}

        <div className={styles.eventsGrid}>
            
            { displayedEvents.length > 0 ? (
                displayedEvents?.map(event => (
                //Mappar igenom alla event och lägger till styling beroende på om det är ett past event
                <div key={event.id} className={`${styles.eventsDiv} ${isPastEvent(event) ? styles.past : ''}`}>
                    <h3>{event.title}</h3>
                    <ul>
                        <li className={styles.description}>{event.description}</li>
                        <li className={styles.time}><strong>Starts:</strong> {new Date(event.start).toLocaleDateString('sv-SE')} {' '}
                            {new Date(event.start).toLocaleTimeString('sv-SE',
                                { hour: '2-digit', minute: '2-digit' })}</li>
                        <li className={styles.time}><strong>Ends:</strong> {new Date(event.end).toLocaleDateString('sv-SE')} {' '}
                            {new Date(event.end).toLocaleTimeString('sv-SE',
                                { hour: '2-digit', minute: '2-digit' })}</li>
                    </ul>
                    <div>
                        <button onClick={() => startEditing(event)}>Edit</button>
                        <button onClick={() => deleteEvent(event.id)}>Delete</button>
                    </div>
                </div>
                ))) : (
                    <p className={styles.popupText}>
                        {filter === 'past' && 'No past events found'}
                        {filter === 'upcoming' && 'No upcoming events found'}
                        {filter === 'all' && 'No events found'}
                    </p>
                )}
        </div>
        </>
    )
}
export default Events