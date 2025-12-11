import { useContext, useState } from "react"
import { EventContext } from "../../context/EventContext"
import styles from '../eventForm/EventForm.module.css'

const EventForm = () => {

    const { events, setEvents } = useContext(EventContext)
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')

    const addEvent = (e) => {
        e.preventDefault()

        let newEvent = {
            title,
            description,
            date,
            start,
            end
        }

        if (!title || !description || !date || !start || !end){
            alert('Du måste fylla i alla fälten')
            return;
        }

        setEvents([...events, newEvent])
        console.log(events)
        setTitle('')
        setDescription('')
        setDate('')
        setStart('')
        setEnd('')

        new Date(date).toLocaleString()
    }
    return (
        <div className={styles.formDiv}>
            <form className={styles.form} onSubmit={addEvent}>
                <h2>Skapa ett event</h2>
                <label>Titel:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

                <label>Beskrivning:</label>
                <input type="textarea" value={description} onChange={(e) => setDescription(e.target.value)} />

                <label>Datum:</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

                <label>Start:</label>
                <input type="time" value={start} onChange={(e) => setStart(e.target.value)} />

                <label>Slut:</label>
                <input type="time" value={end} onChange={(e) => setEnd(e.target.value)} />

                <button>Lägg till</button>
            </form>

        </div>
    )
}
export default EventForm