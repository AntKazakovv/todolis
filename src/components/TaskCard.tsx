import type { Task } from '../types/task'
import { useNavigate } from 'react-router-dom'
import { useSwipe } from '../hooks/useSwipe'

interface TaskCardProps {
  task: Task
  onStatusClick?: () => void
}

const statusColors = {
  'queued': 'bg-hacker-text',
  'in-progress': 'bg-hacker-accentBlue',
  'done': 'bg-hacker-accentRed',
}

const statusLabels = {
  'queued': 'В очереди',
  'in-progress': 'В работе',
  'done': 'Выполнено',
}

const nextStatus: Record<Task['status'], Task['status']> = {
  'queued': 'in-progress',
  'in-progress': 'done',
  'done': 'queued',
}

export default function TaskCard({ task, onStatusClick }: TaskCardProps) {
  const navigate = useNavigate()

  const { swipeOffset, handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipe({
    onSwipeLeft: onStatusClick,
    onSwipeRight: onStatusClick,
    threshold: 60,
  })

  const nextStatusLabel = statusLabels[nextStatus[task.status]]

  const absOffset = Math.abs(swipeOffset)

  return (
    <div className="relative overflow-hidden">
      <div
        className={`absolute inset-y-0 left-0 flex items-center pl-4 text-xs font-mono transition-opacity ${
          swipeOffset > 50 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="px-2 py-1 bg-hacker-accentBlue/20 border border-hacker-accentBlue rounded">
          → {nextStatusLabel}
        </span>
      </div>

      <div
        className={`absolute inset-y-0 right-0 flex items-center pr-4 text-xs font-mono transition-opacity ${
          swipeOffset < -50 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="px-2 py-1 bg-hacker-accentRed/20 border border-hacker-accentRed rounded">
          {nextStatusLabel} ←
        </span>
      </div>

      <div
        onClick={() => navigate(`/task/${task.id}`)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: `translateX(${swipeOffset}px)`,
          transition: absOffset === 0 ? 'transform 0.2s ease-out' : 'none',
        }}
        className="flex items-center gap-3 p-4 bg-hacker-surface border-2 border-hacker-border min-h-[60px] active:bg-hacker-border cursor-pointer font-mono glow-console"
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
    </div>
  )
}
