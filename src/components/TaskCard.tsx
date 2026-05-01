import type { Task } from '../types/task'
import { useNavigate } from 'react-router-dom'

interface TaskCardProps {
  task: Task
  onStatusClick?: () => void
}

const statusColors = {
  'queued': 'bg-hacker-text',
  'in-progress': 'bg-hacker-accent',
  'done': 'bg-hacker-accentBright',
}

const statusLabels = {
  'queued': 'В очереди',
  'in-progress': 'В работе',
  'done': 'Выполнено',
}

export default function TaskCard({ task, onStatusClick }: TaskCardProps) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/task/${task.id}`)}
      className="flex items-center gap-3 p-4 bg-hacker-surface border-2 border-hacker-border min-h-[60px] active:bg-hacker-border cursor-pointer font-mono"
    >
      <div
        className="p-3 -m-3 cursor-pointer active:scale-95 transition-transform"
        onClick={(e) => {
          e.stopPropagation()
          onStatusClick?.()
        }}
        role="button"
        tabIndex={0}
        aria-label={`Изменить статус: ${statusLabels[task.status]}`}
      >
        <div className={`w-5 h-5 rounded-full ${statusColors[task.status]} transition-colors`} />
      </div>

      <div className="flex-1 min-w-0">
        <p className={`text-base ${task.status === 'done' ? 'line-through text-hacker-text' : 'text-hacker-textBright'}`}>
          {task.text}
        </p>
        {task.time && (
          <p className="text-sm text-hacker-text mt-1">[{task.time}]</p>
        )}
      </div>

      <div className="flex-shrink-0 text-xs text-hacker-text">
        {statusLabels[task.status]}
      </div>
    </div>
  )
}
