import "./App.css";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import TodosActivities from "./pages/TodosActivities";
import Habits from "./pages/Habits";
import EventPlanner from "./pages/EventPlanner";
import Login from "./pages/Login";
import ErrorPage from "./pages/errorpage/ErrorPage";
import Navigation from "./components/navigation/Navigation";
import styles from "./App.module.css";
import SignUp from './pages/SignUp'
import EventProvider from "./context/EventContext";

function App() {
  return (
    <>
      <EventProvider>
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
      </EventProvider>
    </>
  );
}

export default App;
