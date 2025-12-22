import { useState } from "react";
import HabitForm from "../../components/habit/habitForm/HabitForm";
import HabitsDiv from "../../components/habit/habitsDiv/habitsDiv";
import styles from "./Habits.module.css";
import Navigation from "../../components/navigation/Navigation";

export default function Habits() {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="layout">
        <Navigation />
        <main className="content">
          <div>
            <h1 className="page-heading">Habits</h1>
          </div>
          <div className="contentDiv">
            <div>
              {show ? (
                <>
                  {/* OVERLAY */}
                  <div className="overlay" onClick={() => setShow(false)}></div>

                  {/* MODAL */}
                  <div className="modal">
                    <button className="closeBtn" onClick={() => setShow(false)}>
                      ✕
                    </button>
                    <HabitForm onClose={() => setShow(false)} />
                  </div>
                </>
              ) : (
                <button onClick={() => setShow(true)} className="addButton">
                  Add a new Habit
                </button>
              )}
            </div>

            <div className="showDiv">
              <HabitsDiv />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
