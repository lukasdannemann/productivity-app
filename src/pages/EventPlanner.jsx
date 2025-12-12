import EventForm from '../components/eventForm/EventForm'
import Events from '../components/EventsDiv/Events'
import { useState } from 'react'
import styles from '../components/eventForm/EventForm.module.css'

export default function EventPlanner(){

    const [show, setShow] = useState(true)

    return(
        <>
        {!show ? <EventForm /> : 
        <button onClick={() => setShow(false)} className={styles.newEventButton}>Skapa ny händelse</button>}
        <Events />
        </>
    )
}