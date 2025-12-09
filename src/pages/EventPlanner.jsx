import EventForm from '../components/eventForm/eventForm'
import Events from '../components/EventsDiv/Events'
import { useState } from 'react'

export default function EventPlanner(){

    const [show, setShow] = useState(true)

    return(
        <>
        {!show ? <EventForm /> : <button onClick={() => setShow(false)}>Lägg till händelse</button>}
        <Events />
        </>
    )
}