import { useState, useContext } from "react";
import { HabitsContext } from "../../context/HabitsContext";
import styles from "./Habitform.module.css";
import waterIntakeIcn from "../../assets/Blur.svg";
import readingIcn from "../../assets/Books.svg";
import exerciceIcn from "../../assets/Dumbbell.svg";
import meditationIcn from "../../assets/Floating Guru.svg";
import journalingIcn from "../../assets/Hand With Pen.svg";
import sleepIcn from "../../assets/Sleeping in Bed.svg";

export default function HabitForm({ onClose }) {
  const { addHabit } = useContext(HabitsContext);

  const HABITS = {
    meditation: {
      id: "meditation",
      label: "Meditation",
      icon: meditationIcn,
    },
    journaling: {
      id: "journaling",
      label: "Journaling",
      icon: journalingIcn,
    },
    exercise: {
      id: "exercise",
      label: "Exercise",
      icon: exerciceIcn,
    },
    water: {
      id: "water",
      label: "Water Intake",
      icon: waterIntakeIcn,
    },
    reading: {
      id: "reading",
      label: "Reading",
      icon: readingIcn,
    },
    sleep: {
      id: "sleep",
      label: "Sleep 8hrs",
      icon: sleepIcn,
    },
  };

  const habitList = Object.values(HABITS);

  const priorityArray = ["High", "Medium", "Low"];

  const [selectedHabit, setSelectedHabit] = useState(habitList[0].id);
  const [selectedPriority, setSelectedPriority] = useState(priorityArray[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addHabit(HABITS[selectedHabit], selectedPriority);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formContent}>
        <label htmlFor="habits">Select a new habit</label>
        <select
          id="habits"
          value={selectedHabit}
          onChange={(e) => setSelectedHabit(e.target.value)}
        >
          {habitList.map((habit) => (
            <option key={habit.id} value={habit.id}>
              {habit.label}
            </option>
          ))}
        </select>
        <label htmlFor="priorities">Priority</label>
        <select
          name="priorities"
          id="priorities"
          value={selectedPriority}
          onChange={(e) => setSelectedPriority(e.target.value)}
        >
          {priorityArray.map((priority) => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className={styles.addBtn}>
        Add
      </button>
    </form>
  );
}
