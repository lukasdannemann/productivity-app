import { useTodos } from "../../context/TodoContext";
import TodoForm from "../../components/Todo/TodoForm/TodoForm";
import Todos from "../../components/Todo/TodosDiv/Todos";
import styles from "./TodosActivities.module.css";
import Navigation from "../../components/navigation/Navigation";

export default function TodosActivities() {
  const { todos, showForm, setShowForm, cancelForm } = useTodos();

  const openFormForNewTodo = () => {
    cancelForm(); // nollar ev edit-läge
    setShowForm(true); // öppnar formuläret
  };

  return (
    <div className="layout">
      <Navigation />
      <main className="content">
        <section className={styles.page}>
          <header className={styles.header}>
            <h1 className={styles.title}>Todos & Activities</h1>
            {/*Eventuell räkning av todos kan läggas här*/}
          </header>

          <div className={styles.main}>
            {showForm ? (
              <TodoForm />
            ) : (
              <button
                onClick={openFormForNewTodo}
                className={styles.newTodoButton}
              >
                + Add todo
              </button>
            )}

            {!showForm &&
              (todos.length < 1 ? (
                <p className={styles.popupText}>
                  Created todos will show here!
                </p>
              ) : (
                <Todos />
              ))}
          </div>
        </section>
      </main>
    </div>
  );
}
