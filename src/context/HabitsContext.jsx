import { createContext, useState } from "react";

export const HabitsContext = createContext();

export function HabitsProvider({ children }) {
  const [habits, setHabits] = useState([]);

  const addHabit = (habit, priority) => {
    const newHabit = {
      id: Date.now(),
      habitId: habit.id,
      label: habit.label,
      icon: habit.icon,
      priority,
      repetitions: 0,
    };
    setHabits((prev) => [...prev, newHabit]);
  };

  const updateRepetitions = (id, newCount) => {
    setHabits(
      habits.map((h) => (h.id === id ? { ...h, repetitions: newCount } : h))
    );
  };

  return (
    <HabitsContext.Provider value={{ habits, addHabit, updateRepetitions }}>
      {children}
    </HabitsContext.Provider>
  );
}
