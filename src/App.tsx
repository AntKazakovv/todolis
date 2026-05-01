import { Routes, Route } from 'react-router-dom'
import { TaskProvider } from './context/TaskContext'
import NavBar from './components/NavBar'
import TaskList from './pages/TaskList'
import TaskEdit from './pages/TaskEdit'
import Settings from './pages/Settings'

function App() {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-50 max-w-2xl mx-auto">
        <NavBar />
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/task/:id?" element={<TaskEdit />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </TaskProvider>
  )
}

export default App
