import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useTaskContext } from '../context/TaskContext'
import type { TaskStatus } from '../types/task'
import { useEffect } from 'react'

interface FormData {
  text: string
  time: string
  status: TaskStatus
}

export default function TaskEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state, addTask, updateTask, deleteTask } = useTaskContext()
  const isNew = !id || id === 'new'
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      text: '',
      time: '',
      status: 'queued' as TaskStatus,
    }
  })

  const existingTask = !isNew ? state.tasks.find(t => t.id === id) : null

  useEffect(() => {
    if (existingTask) {
      reset({
        text: existingTask.text,
        time: existingTask.time || '',
        status: existingTask.status,
      })
    }
  }, [existingTask, reset])

  async function onSubmit(data: FormData) {
    try {
      if (isNew) {
        await addTask(data.text, data.time || null)
      } else if (existingTask) {
        await updateTask(existingTask.id, {
          text: data.text,
          time: data.time || null,
          status: data.status,
        })
      }
      navigate('/')
    } catch {
      alert('Ошибка сохранения задачи')
    }
  }

  async function handleDelete() {
    if (!existingTask) return
    if (window.confirm('Удалить задачу?')) {
      await deleteTask(existingTask.id)
      navigate('/')
    }
  }

  return (
    <div className="p-4 font-mono">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="text" className="block text-sm font-medium text-hacker-text mb-1 glow-console-text">
            Описание задачи
          </label>
          <textarea
            id="text"
            {...register('text', { required: 'Введите описание' })}
            className="w-full p-3 border-2 border-hacker-border bg-hacker-surface text-hacker-textBright min-h-[100px] text-base focus:border-hacker-accent outline-none glow-console"
            placeholder="Что нужно сделать?"
          />
          {errors.text && <p className="text-hacker-accent text-sm mt-1 glow-console-text">{errors.text.message}</p>}
        </div>

        <div>
          <label htmlFor="time" className="block text-sm font-medium text-hacker-text mb-1 glow-console-text">
            Время (необязательно)
          </label>
          <input
            id="time"
            type="time"
            {...register('time')}
            className="w-full p-3 border-2 border-hacker-border bg-hacker-surface text-hacker-textBright text-base focus:border-hacker-accent outline-none glow-console"
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-hacker-text mb-1 glow-console-text">
            Статус
          </label>
          <select
            id="status"
            {...register('status')}
            className="w-full p-3 border-2 border-hacker-border bg-hacker-surface text-hacker-textBright text-base focus:border-hacker-accent outline-none glow-console"
          >
            <option value="queued">В очереди</option>
            <option value="in-progress">В работе</option>
            <option value="done">Выполнено</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-hacker-surface border-2 border-hacker-accent text-hacker-accent py-3 text-base font-medium active:bg-hacker-border min-h-[44px] glow-console"
        >
          Сохранить
        </button>

        {!isNew && (
          <button
            type="button"
            onClick={handleDelete}
            className="w-full bg-hacker-surface border-2 border-hacker-text text-hacker-text py-3 text-base font-medium active:bg-hacker-border min-h-[44px] glow-console"
          >
            Удалить задачу
          </button>
        )}
      </form>
    </div>
  )
}
