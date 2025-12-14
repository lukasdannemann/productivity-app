import { useContext, useEffect, useState } from "react"
import { EventContext } from "../../context/EventContext"
import styles from '../eventForm/EventForm.module.css'

const EventForm = () => {

    const { 
        events, setEvents, editEvent, stopEditing,
        showForm, setShowForm} = useContext(EventContext)

    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const emptyInputs = () => {
        setTitle('')
        setDescription('')
        setStart('')
        setEnd('')
    }

    useEffect(() => {
        // Använder useEffect för att sätta alla tomma inputs till värdena för valt event
        // vid redigering
        if(editEvent){
            setTitle(editEvent.title)
            setDescription(editEvent.description)
            setStart(editEvent.start)
            setEnd(editEvent.end)
        }
    }, [editEvent])

    const addEvent = (e) => {
        e.preventDefault()
        console.log(events)

        if(editEvent){

            //Om användaren redigerar, uppdatera event till updatedEvents i events[] med samma id som
            //användaren valt
            const updatedEvents = events.map(event => 
                event.id === editEvent.id ? 
                {...event, title, description, start, end} : event
            )
            
            setEvents(updatedEvents)
            stopEditing()
            emptyInputs()
            setShowForm(false)
            return;
        }

        let newEvent = {
            //Ger nytt event unikt id beroende på datum
            id: Date.now().toString(),
            title,
            description,
            start,
            end
        }

        if (start >= end ){
            alert('You need to pick a valid date')
            return;
        }

        if (!title || !description || !start || !end){
            alert('You need to fill all the empty fields')
            return;
        }

        setEvents([...events, newEvent])
        emptyInputs()
        setShowForm(false)

        if(!showForm) return null;
        
    }

    return (
        <div className={styles.formDiv}>
            <form className={styles.form} onSubmit={addEvent}>
                <h2>Create an event</h2>
                <div className={styles.inputContainer}>
                <div>
                <label className={styles.startTime}>Starts: </label>
                <input type="datetime-local" min='2025-01-01T00:00' max='2099-12-31T23:59' value={start} onChange={(e) => setStart(e.target.value)} />
                </div>
                <div>
                <label className={styles.endTime}>Ends: </label>
                <input type="datetime-local" min='2025-01-01T00:00' max='2099-12-31T23:59' value={end} onChange={(e) => setEnd(e.target.value)} />
                </div>
                <input type="text" value={title} placeholder="Choose a title..." onChange={(e) => setTitle(e.target.value)} />

                <textarea value={description} rows='4' cols='30' placeholder="Describe your event..." onChange={(e) => setDescription(e.target.value)} />
                <div>
                <button>{ editEvent ? 'Save changes' : 'Add event' }</button>
                <button type="button" onClick={() => emptyInputs()}>Clear</button>
                </div>
                </div>
            </form>

        </div>
    )
}
export default EventForm