import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTaskContext } from '../context/TaskContext'
import TaskCard from '../components/TaskCard'

const statusLabels: Record<string, string> = {
  'queued': 'В очереди',
  'in-progress': 'В работе',
  'done': 'Выполнено',
}

export default function TaskList() {
  const navigate = useNavigate()
  const { state, updateTaskStatus, deleteCompletedTasks } = useTaskContext()
  const [toast, setToast] = useState<string | null>(null)

  const showToast = useCallback((message: string) => {
    setToast(message)
    setTimeout(() => setToast(null), 2000)
  }, [])

  async function toggleStatus(taskId: string, currentStatus: string) {
    const statusFlow: Record<string, string> = {
      'queued': 'in-progress',
      'in-progress': 'done',
      'done': 'queued',
    }
    const newStatus = statusFlow[currentStatus] as 'queued' | 'in-progress' | 'done'
    await updateTaskStatus(taskId, newStatus)
    showToast(`Статус изменен на: ${statusLabels[newStatus]}`)
  }

  async function handleDeleteCompleted() {
    const completedCount = state.tasks.filter(t => t.status === 'done').length
    if (completedCount === 0) {
      showToast('Нет выполненных задач')
      return
    }
    if (!window.confirm(`Удалить ${completedCount} выполненных задач?`)) return
    const count = await deleteCompletedTasks()
    showToast(`Удалено выполненных: ${count}`)
  }

  if (state.loading) {
    return <div className="p-4 text-center text-hacker-text font-mono">Загрузка...</div>
  }

  return (
    <div className="p-4 pb-20 font-mono">
      {state.error && (
        <div className="bg-hacker-surface border-2 border-hacker-accent text-hacker-accent p-3 mb-4 text-sm glow-console">
          {state.error}
        </div>
      )}
      
      {state.tasks.length === 0 ? (
        <p className="text-hacker-text text-center mt-8 glow-console-text">Список задач пуст</p>
      ) : (
        <div className="space-y-3">
          {state.tasks.map(task => (
            <TaskCard 
              key={task.id}
              task={task} 
              onStatusClick={() => toggleStatus(task.id, task.status)} 
            />
          ))}
        </div>
      )}
      
      <button
        onClick={() => navigate('/task/new')}
        className="fixed bottom-6 right-6 bg-hacker-surface border-2 border-hacker-accent text-hacker-accent w-14 h-14 text-3xl flex items-center justify-center active:scale-95 transition-transform font-mono glow-console"
        aria-label="Добавить задачу"
      >
        +
      </button>

      <button
        onClick={handleDeleteCompleted}
        className="fixed bottom-6 left-6 bg-hacker-surface border-2 border-hacker-accentBlue text-hacker-accentBlue w-14 h-14 text-2xl flex items-center justify-center active:scale-95 transition-transform font-mono glow-console-blue"
        aria-label="Удалить выполненные задачи"
      >
        ✗
      </button>

      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-hacker-surface border-2 border-hacker-accent text-hacker-accent px-4 py-2 text-sm animate-fade-in font-mono glow-console">
          {toast}
        </div>
      )}
    </div>
  )
}
