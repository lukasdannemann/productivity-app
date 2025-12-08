import './App.css'
import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import TodosActivities from './pages/TodosActivities'
import Habits from './pages/Habits'
import EventPlanner from './pages/EventPlanner'
import Login from './pages/Login'
import ErrorPage from './pages/ErrorPage'
import EventProvider from './context/EventContext'

function App() {

  return (
    <EventProvider>
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/todos' element={<TodosActivities />}/>
      <Route path='/habits' element={<Habits />}/>
      <Route path='/events' element={<EventPlanner />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='*' element={<ErrorPage />}/>
    </Routes>
    </EventProvider>
  )
}

export default App
