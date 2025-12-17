import { useState } from "react";
import HabitForm from "../../components/habitForm/HabitForm";
import HabitsDiv from "../../components/habitsDiv/habitsDiv";
import styles from "./Habits.module.css";
import habitsIcon from "../../assets/glove.png";
import Navigation from "../../components/navigation/Navigation";

export default function Habits() {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="layout">
        <Navigation />
        <main className="content">
          <div className={styles.titleDiv}>
            <h1>Habits</h1>
            <h2>
              <strong>X</strong> of <strong>Y</strong> habits honored today
            </h2>
            <img
              src={habitsIcon}
              alt="Two hands reaching upward with a 3D box floating above them, symbolizing support, collaboration, or receiving resources"
            />
          </div>
          <div className={styles.habitsForm}>
            {show ? (
              <>
                {/* OVERLAY */}
                <div
                  className={styles.overlay}
                  onClick={() => setShow(false)}
                ></div>

                {/* MODAL */}
                <div className={styles.modal}>
                  <button
                    className={styles.closeBtn}
                    onClick={() => setShow(false)}
                  >
                    ✕
                  </button>
                  <HabitForm onClose={() => setShow(false)} />
                </div>
              </>
            ) : (
              <button
                onClick={() => setShow(true)}
                className={styles.addNewHabit}
              >
                Add a new Habit
              </button>
            )}
          </div>

          <div className={styles.habitsDiv}>
            <HabitsDiv />
          </div>
        </main>
      </div>
    </>
  );
}
