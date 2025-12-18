import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/dashboard/Home";
import TodosActivities from "./pages/TodosActivities/TodosActivities";
import Habits from "./pages/habits/Habits";
import EventPlanner from "./pages/events/EventPlanner";
import Login from "./pages/login/Login";
import ErrorPage from "./pages/errorpage/ErrorPage";
import SignUp from "./pages/signup/SignUp";
import EventProvider from "./context/EventContext";
import { HabitsProvider } from "./context/HabitsContext";
import UserProvider from "./context/UserContext";
import TodoProvider from "./context/TodoContext";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App() {
  return (
    <>
      <UserProvider>
      <EventProvider>
        <HabitsProvider>
        <TodoProvider>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/todos" element={<PrivateRoute><TodosActivities /></PrivateRoute>} />
                <Route path="/habits" element={<PrivateRoute><Habits /></PrivateRoute>} />
                <Route path="/events" element={<PrivateRoute><EventPlanner /></PrivateRoute>} />
                <Route path="/dashboard" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path="*" element={<PrivateRoute><ErrorPage /></PrivateRoute>} />
              </Routes>
              </TodoProvider>
        </HabitsProvider>
      </EventProvider>
      </UserProvider>
    </>
  );
}

export default App;
