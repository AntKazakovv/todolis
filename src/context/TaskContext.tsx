import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react'
import type { Task, TaskStatus } from '../types/task'
import * as db from '../db/tasks'

interface TaskState {
  tasks: Task[]
  loading: boolean
  error: string | null
}

type TaskAction =
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_ALL' }

const initialState: TaskState = {
  tasks: [],
  loading: true,
  error: null,
}

function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case 'SET_TASKS':
      return { ...state, tasks: action.payload, loading: false }
    case 'ADD_TASK':
      return { ...state, tasks: [action.payload, ...state.tasks] }
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(t => t.id === action.payload.id ? action.payload : t),
      }
    case 'DELETE_TASK':
      return { ...state, tasks: state.tasks.filter(t => t.id !== action.payload) }
    case 'CLEAR_ALL':
      return { ...state, tasks: [] }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    default:
      return state
  }
}

interface TaskContextType {
  state: TaskState
  loadTasks: () => Promise<void>
  addTask: (text: string, time: string | null) => Promise<void>
  updateTask: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => Promise<void>
  deleteTask: (id: string) => Promise<void>
  updateTaskStatus: (id: string, status: TaskStatus) => Promise<void>
  clearAllTasks: () => Promise<void>
  exportToJSON: () => Promise<string>
  importFromJSON: (json: string) => Promise<Task[]>
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export function TaskProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(taskReducer, initialState)

  async function loadTasks() {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const tasks = await db.getAllTasks()
      dispatch({ type: 'SET_TASKS', payload: tasks })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Ошибка загрузки задач' })
    }
  }

  async function addTaskFn(text: string, time: string | null) {
    const task = await db.addTask(text, time)
    dispatch({ type: 'ADD_TASK', payload: task })
  }

  async function updateTaskFn(id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) {
    const task = await db.updateTask(id, updates)
    dispatch({ type: 'UPDATE_TASK', payload: task })
  }

  async function deleteTaskFn(id: string) {
    await db.deleteTask(id)
    dispatch({ type: 'DELETE_TASK', payload: id })
  }

  async function updateTaskStatus(id: string, status: TaskStatus) {
    await updateTaskFn(id, { status })
  }

  async function clearAllTasks() {
    await db.clearAllTasks()
    dispatch({ type: 'CLEAR_ALL' })
  }

  async function exportToJSON() {
    return db.exportToJSON()
  }

  async function importFromJSON(json: string) {
    const tasks = await db.importFromJSON(json)
    dispatch({ type: 'SET_TASKS', payload: tasks })
    return tasks
  }

  useEffect(() => {
    loadTasks()
  }, [])

  return (
    <TaskContext.Provider
      value={{
        state,
        loadTasks,
        addTask: addTaskFn,
        updateTask: updateTaskFn,
        deleteTask: deleteTaskFn,
        updateTaskStatus,
        clearAllTasks,
        exportToJSON,
        importFromJSON,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export function useTaskContext() {
  const context = useContext(TaskContext)
  if (!context) throw new Error('useTaskContext must be used within TaskProvider')
  return context
}
