import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TodosActivities from "./pages/TodosActivities/TodosActivities";
import Habits from "./pages/Habits";
import EventPlanner from "./pages/EventPlanner";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import Navigation from "./components/navigation/Navigation";
import styles from "./App.module.css";
import SignUp from './pages/SignUp'
import EventProvider from "./context/EventContext";
import TodoProvider from "./context/TodoContext";

function App() {
  return (
    <>
      <EventProvider>
        <TodoProvider>
      <div className={styles.layout}>
        <Navigation />
        <main className={styles.content}>
          <Routes>
            <Route path="/" element={<Login />} />
      <Route path='/signup' element={<SignUp />}/>
            <Route path="/todos" element={<TodosActivities />} />
            <Route path="/habits" element={<Habits />} />
            <Route path="/events" element={<EventPlanner />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
      </div>
      </TodoProvider>
      </EventProvider>
    </>
  );
}

export default App;
