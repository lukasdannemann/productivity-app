
import { useTodos } from "../../../context/TodoContext";
import CategoryFilter from "../CategoryFilter/CategoryFilter";
import styles from "./Todos.module.css";


  export default function Todos() {
    const {
      todos,
      toggleDone,
      deleteTodo,
      startEdit,
      showForm,
      filterStatus,
      setFilterStatus,
      sort,
      setSort,
      sortOrder,
      setSortOrder,
      getFilteredTodos,
      selectedCategories,
      setSelectedCategories,
      categoriesArray,
    } = useTodos();
  
    const displayedTodos = getFilteredTodos();

    return (
      <>
        {!showForm && todos.length > 0 && (
          <>
            <div className="controls">
              <select
                value={filterStatus}
                className={styles.select}
                onChange={(e) => setFilterStatus(e.target.value)}>

                <option value="all">Show all</option>
                <option value="active">Not completed</option>
                <option value="done">Completed</option>
              </select>

              <label htmlFor="filter">Sort by: </label>
              <select
                value={sort}
                className={styles.select}
                onChange={(e) => setSort(e.target.value)}>

                <option value="deadline">Deadline</option>
                <option value="time">Time estimate</option>
                <option value="status">Status</option>
              </select>
  
              <select
                value={sortOrder}
                className={styles.select}
                onChange={(e) => setSortOrder(e.target.value)}>

                <option value="asc">Oldest</option>
                <option value="desc">Newest</option>
              </select>
            </div>
  
            <CategoryFilter
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              categoriesArray={categoriesArray}
            />
          </>
        )}
  
        <ul className={styles.list}>
          {displayedTodos.length > 0 ? (
            displayedTodos.map((t) => (
              <li key={t.id} className={styles.listItem}>
                <strong className={t.isDone ? styles.done : styles.title}>
                  {t.title}
                </strong>
  
                {t.description && <p className={styles.text}>{t.description}</p>}
  
                <div className={styles.info}>
                  <div className={styles.top}>
                    <span className={styles.tag}>{t.category}</span>
                    {t.deadline && <span>Deadline: {t.deadline}</span>}
                  </div>
  
                  <div className={styles.row}>
                    <span>{t.timeEstimateMinutes} min</span>
                    <span>{t.isDone ? "Completed" : "Not completed"}</span>
                  </div>
                </div>
  
                <div className={styles.buttons}>
                  <button onClick={() => toggleDone(t.id)} className={styles.button}>
                    {t.isDone ? "Undo" : "Done"}
                  </button>
                  <button onClick={() => startEdit(t)} className={styles.button}>
                    Edit
                  </button>
                  <button onClick={() => deleteTodo(t.id)} className={styles.delete}>
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className={styles.popupText}>
                {todos.length > 0 ? "No todos match your filters. Try selecting more categories." : "No todos found"}
           </p>
          )}
        </ul>
      </>
    );
  }






