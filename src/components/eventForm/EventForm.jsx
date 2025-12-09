import { useContext, useState } from "react"
import { EventContext } from "../../context/EventContext"

const EventForm = () => {

    const {events, setEvents} = useContext(EventContext)
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const addEvent = () => {
        let newEvent = {
            title,
            description,
            start,
            end
        }

        setEvents([...events, newEvent])
        console.log(events)

        new Date(start).toLocaleString()
        new Date(end).toLocaleString()        
    }
    return(
        <>
        <form onSubmit={(e) => {e.preventDefault(); addEvent()}}>
            <h2>Skapa ett event</h2>
            <label>Titel: 
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </label>
            <label>Beskrivning: 
                <input type="textarea" value={description} onChange={(e) => setDescription(e.target.value)}/>
            </label>
            <label>Start: 
                <input type="date" value={start} onChange={(e) => setStart(e.target.value)}/>
            </label>
            <label>Slut: 
                <input type="date" value={end} onChange={(e) => setEnd(e.target.value)}/>
            </label>
            <button>Lägg till</button>
        </form>
        
        </>
    )
}
export default EventForm