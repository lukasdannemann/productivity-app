import { useContext, useState } from "react";
import { HabitsContext } from "../../context/HabitsContext";
import styles from "./habitsDiv.module.css";
import Repetition from "./repetiton";

export default function HabitsDiv() {
  const { habits, updateRepetitions } = useContext(HabitsContext);

  // State for filtering and sorting
  const [filterPriority, setFilterPriority] = useState("All");
  const [sortBy, setSortBy] = useState("none");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleIncrement = (id, currentCount) => {
    updateRepetitions(id, currentCount + 1);
  };

  const handleDecrement = (id, currentCount) => {
    if (currentCount > 0) {
      updateRepetitions(id, currentCount - 1);
    }
  };

  const handleReset = (id) => {
    updateRepetitions(id, 0);
  };

  // FILTERING - Filtering on priority
  let filteredHabits = habits;
  if (filterPriority !== "All") {
    filteredHabits = habits.filter(
      (habit) => habit.priority === filterPriority
    );
  }

  // SORTING - Sort for choosen alternativ
  let sortedHabits = [...filteredHabits];

  if (sortBy === "repetitions") {
    sortedHabits.sort((a, b) => {
      return sortOrder === "asc"
        ? a.repetitions - b.repetitions
        : b.repetitions - a.repetitions;
    });
  } else if (sortBy === "priority") {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    sortedHabits.sort((a, b) => {
      const orderA = priorityOrder[a.priority];
      const orderB = priorityOrder[b.priority];
      return sortOrder === "asc" ? orderA - orderB : orderB - orderA;
    });
  }

  // IF THERE ARE NO HABITS AT ALL - SHOW NOTHING
  if (habits.length === 0) {
    return (
      <div className={styles.noHabitsYet}>
        <h2>No habits yet. Add one to get started!</h2>
      </div>
    );
  }

  return (
    <div className={styles.habits}>
      <h2>Your Habits</h2>

      {/* FILTERING */}
      <div className={styles.controls}>
        <div>
          <label htmlFor="filter">Filter by priority: </label>
          <select
            id="filter"
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="All">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* SORTING */}
        <div>
          <label htmlFor="sortBy">Sort by: </label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="none">None</option>
            <option value="repetitions">Repetitions</option>
            <option value="priority">Priority</option>
          </select>

          <label htmlFor="sortOrder"> Order: </label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Ascending </option>
            <option value="desc">Descending </option>
          </select>
        </div>
      </div>

      {/* LIST */}
      <div className={styles.habitCards}>
        {sortedHabits.length === 0 ? (
          <p>No habits match your filters.</p>
        ) : (
          sortedHabits.map((habit) => (
            <div key={habit.id} className={styles.habitCard}>
              <div className={styles.habitIcn}>
                <img src={habit.icon} alt={habit.label} />
              </div>
              <h3>{habit.label}</h3>
              <span className={`${styles.priority} ${styles[habit.priority]}`}>
                {habit.priority}
              </span>
              <Repetition
                count={habit.repetitions}
                onIncrement={() => handleIncrement(habit.id, habit.repetitions)}
                onDecrement={() => handleDecrement(habit.id, habit.repetitions)}
                onReset={() => handleReset(habit.id)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
