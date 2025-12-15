import { useTodos } from "../context/TodoContext";
import TodoForm from "../components/Todo/TodoForm/TodoForm";
import Todos from "../components/Todo/TodosDiv/Todos";
import styles from "../components/Todo/TodosDiv/Todos.module.css";

export default function TodosActivities() {
  const { todos, showForm, setShowForm, cancelForm } = useTodos();

  const openFormForNewTodo = () => {
    cancelForm();       // nollar ev edit-läge
    setShowForm(true);  // öppnar formuläret
  };

  return (
    <>
      {showForm ? (
        <TodoForm />
      ) : (
        <button onClick={openFormForNewTodo} className={styles.newTodoButton}>
          + Add todo
        </button>
      )}

      {todos.length < 1 ? (
        <p className={styles.popupText}>Created todos will show here!</p>
      ) : (
        <Todos />
      )}
    </>
  );
}









