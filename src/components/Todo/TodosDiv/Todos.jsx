import { useTodos } from "../../../context/TodoContext";
import styles from "./Todos.module.css";

export default function Todos() {
  const { todos, toggleDone, deleteTodo, startEdit } = useTodos();

  return (
    <ul className={styles.list}>
      {todos.map((t) => (
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
      ))}
    </ul>
  );
}
