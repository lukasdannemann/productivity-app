import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const HabitsContext = createContext();

export function HabitsProvider({ children }) {
  const {currentUser} = useContext(UserContext)

  const [habits, setHabits] = useState(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('currentUser')) ||
    JSON.parse(localStorage.getItem('currentUser'))

    if(storedUser){
      const allHabits = JSON.parse(localStorage.getItem('habits')) || {};
      return allHabits[storedUser.id] || [];
    }
    return []
  });

  //Hämtar habits från localStorage, skapar nytt objekt med alla habits av currentUser.id
  //Detta händer varje gång [currentUser] uppdateras.
  useEffect(() => {
        if(currentUser){
            const allHabits = JSON.parse(localStorage.getItem('habits')) || {}
            const currentUserHabits = allHabits[currentUser.id] || []
            setHabits(currentUserHabits)
        }else{
            setHabits([])
        }
    }, [currentUser])

  //Hämtar habits från localStorage, ersätter habits med den specifika användarens habits och lägger
  //till i localStorage. Detta händer varje gång habits och currentUser uppdateras
  useEffect(() => {
        if (currentUser && habits.length >= 0){

            const allHabits = JSON.parse(localStorage.getItem('habits')) || {}

            allHabits[currentUser.id] = habits
            localStorage.setItem('habits', JSON.stringify(allHabits))
        }
    }, [habits, currentUser])

  const addHabit = (habit, priority) => {
    const newHabit = {
      id: Date.now(),
      userId: currentUser.id,
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