import { useContext, useState } from 'react'
import { EventContext } from '../context/EventContext'
import styles from '../components/EventsDiv/Events.module.css' 
import EventForm from '../components/eventForm/EventForm'
import Events from '../components/EventsDiv/Events'

export default function EventPlanner(){

    const {events, showForm, setShowForm} = useContext(EventContext)

    return(
        <>
        {showForm ? <EventForm /> : 
        <button onClick={() => setShowForm(true)} className={styles.newEventButton}>Create new event</button>
        }
        { events.length < 1 ? <p className={styles.popupText}>Created events will show here!</p> : <Events />}
        </>
    )
}