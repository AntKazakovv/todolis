import { useNavigate } from 'react-router-dom'
import { useTaskContext } from '../context/TaskContext'
import TaskCard from '../components/TaskCard'

export default function TaskList() {
  const navigate = useNavigate()
  const { state, updateTaskStatus } = useTaskContext()

  async function toggleStatus(taskId: string, currentStatus: string) {
    const statusFlow: Record<string, string> = {
      'queued': 'in-progress',
      'in-progress': 'done',
      'done': 'queued',
    }
    const newStatus = statusFlow[currentStatus] as 'queued' | 'in-progress' | 'done'
    await updateTaskStatus(taskId, newStatus)
  }

  if (state.loading) {
    return <div className="p-4 text-center text-gray-500">Загрузка...</div>
  }

  return (
    <div className="p-4 pb-20">
      {state.error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
          {state.error}
        </div>
      )}
      
      {state.tasks.length === 0 ? (
        <p className="text-gray-600 text-center mt-8">Список задач пуст</p>
      ) : (
        <div className="space-y-3">
          {state.tasks.map(task => (
            <div key={task.id} onClick={() => toggleStatus(task.id, task.status)} className="cursor-pointer">
              <TaskCard task={task} />
            </div>
          ))}
        </div>
      )}
      
      <button
        onClick={() => navigate('/task/new')}
        className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg text-3xl flex items-center justify-center active:scale-95 transition-transform"
        aria-label="Добавить задачу"
      >
        +
      </button>
    </div>
  )
}
