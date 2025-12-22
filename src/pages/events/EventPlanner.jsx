import { useContext } from "react";
import { EventContext } from "../../context/EventContext";
import EventForm from "../../components/event/eventForm/EventForm";
import Events from "../../components/event/EventsDiv/Events";
import Navigation from "../../components/navigation/Navigation";

export default function EventPlanner() {
  const { events, showForm, setShowForm } = useContext(EventContext);

  const closeForm = () => {
    setShowForm(false);
  };

  const openForm = () => {
    setShowForm(true);
  };

  return (
    <>
      <div className="layout">
        <Navigation />
        <main className="content">
          <header>
            <h1 className="page-heading">Event Planner</h1>
            {/*Eventuell räkning av events kan läggas här*/}
          </header>

          <div className="contentDiv">
            <div>
              {showForm ? (
                <>
                  {/* OVERLAY */}
                  <div className="overlay" onClick={closeForm}></div>

                  {/* MODAL */}
                  <div className="modal">
                    <button className="closeBtn" onClick={closeForm}>
                      ✕
                    </button>
                    <EventForm />
                  </div>
                </>
              ) : (
                <button onClick={openForm} className="addButton">
                  Create new event
                </button>
              )}
            </div>

            <div className="showDiv">
              {!showForm &&
                (events.length < 1 ? (
                  <p className="noData">Created events will show here!</p>
                ) : (
                  <Events />
                ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
