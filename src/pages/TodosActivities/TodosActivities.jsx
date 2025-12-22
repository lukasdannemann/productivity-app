import { useTodos } from "../../context/TodoContext";
import TodoForm from "../../components/Todo/TodoForm/TodoForm";
import Todos from "../../components/Todo/TodosDiv/Todos";
import styles from "./TodosActivities.module.css";
import Navigation from "../../components/navigation/Navigation";

export default function TodosActivities() {
  const { todos, showForm, setShowForm, cancelForm } = useTodos();

  const openFormForNewTodo = () => {
    cancelForm();
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    cancelForm();
  };

  return (
    <div className="layout">
      <Navigation />
      <main className="content">
        <header>
          <h1 className="page-heading">Todos & Activities</h1>
          {/*Eventuell räkning av todos kan läggas här*/}
        </header>

        <div className="contentDiv">
        <div>
          {showForm ? (
            <>
              {/* OVERLAY */}
              <div className="overlay" onClick={closeForm}></div>

              {/* MODAL */}
              <div className="modal">
                <button className="closeBtn" onClick={closeForm}>
                  ✕
                </button>
                <TodoForm />
              </div>
            </>
          ) : (
            <button onClick={openFormForNewTodo} className="addButton">Add todo</button>
          )}
        </div>

        <div className="showDiv">
          {!showForm &&
            (todos.length < 1 ? (
              <p className="noData">Created todos will show here!</p>
            ) : (
              <Todos />
            ))}
        </div>
        </div>
      </main>
    </div>
  );
}
