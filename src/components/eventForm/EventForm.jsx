import { useContext, useState } from "react"
import { EventContext } from "../../context/EventContext"
import styles from '../eventForm/EventForm.module.css'

const EventForm = () => {

    const { events, setEvents } = useContext(EventContext)
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const addEvent = (e) => {
        e.preventDefault()
        console.log(events)

        let newEvent = {
            id: Date.now().toString(),
            title,
            description,
            start,
            end
        }

        if (start >= end ){
            alert('Du måste välja korrekt datum')
            return;
        }

        if (!title || !description || !start || !end){
            alert('Du måste fylla i alla fälten')
            return;
        }

        setEvents([...events, newEvent])
        
        setTitle('')
        setDescription('')
        setStart('')
        setEnd('')
    }

    return (
        <div className={styles.formDiv}>
            <form className={styles.form} onSubmit={addEvent}>
                <h2>Skapa ett event</h2>
                <label>Titel:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

                <label>Beskrivning:</label>
                <input type="textarea" value={description} onChange={(e) => setDescription(e.target.value)} />

                <label>Start:</label>
                <input type="datetime-local" value={start} onChange={(e) => setStart(e.target.value)} />

                <label>Slut:</label>
                <input type="datetime-local" value={end} onChange={(e) => setEnd(e.target.value)} />

                <button>Lägg till</button>
            </form>

        </div>
    )
}
export default EventForm