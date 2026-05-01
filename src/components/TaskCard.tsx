import type { Task } from '../types/task'
import { useNavigate } from 'react-router-dom'

interface TaskCardProps {
  task: Task
}

const statusColors = {
  'queued': 'bg-gray-400',
  'in-progress': 'bg-blue-500',
  'done': 'bg-green-500',
}

const statusLabels = {
  'queued': 'В очереди',
  'in-progress': 'В работе',
  'done': 'Выполнено',
}

export default function TaskCard({ task }: TaskCardProps) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/task/${task.id}`)}
      className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100 min-h-[60px] active:bg-gray-50 cursor-pointer"
    >
      <div className={`w-3 h-3 rounded-full flex-shrink-0 ${statusColors[task.status]}`} />
      
      <div className="flex-1 min-w-0">
        <p className={`text-base ${task.status === 'done' ? 'line-through text-gray-400' : 'text-gray-900'}`}>
          {task.text}
        </p>
        {task.time && (
          <p className="text-sm text-gray-500 mt-1">⏰ {task.time}</p>
        )}
      </div>
      
      <div className="flex-shrink-0 text-xs text-gray-400">
        {statusLabels[task.status]}
      </div>
    </div>
  )
}
