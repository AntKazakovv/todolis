import { openDB, type IDBPDatabase } from 'idb'
import type { Task } from '../types/task'

const DB_NAME = 'TodoLisDB'
const STORE_NAME = 'tasks'
const DB_VERSION = 1

async function getDb(): Promise<IDBPDatabase> {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' })
      }
    },
  })
}

export async function getAllTasks(): Promise<Task[]> {
  const db = await getDb()
  const tasks = await db.getAll(STORE_NAME)
  return tasks.sort((a, b) => b.createdAt - a.createdAt)
}

export async function getTaskById(id: string): Promise<Task | undefined> {
  const db = await getDb()
  return db.get(STORE_NAME, id)
}

export async function addTask(text: string, time: string | null): Promise<Task> {
  const db = await getDb()
  const now = Date.now()
  const task: Task = {
    id: crypto.randomUUID(),
    text,
    status: 'queued',
    time,
    createdAt: now,
    updatedAt: now,
  }
  await db.put(STORE_NAME, task)
  return task
}

export async function updateTask(id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>): Promise<Task> {
  const db = await getDb()
  const existing = await db.get(STORE_NAME, id)
  if (!existing) throw new Error('Task not found')
  
  const updated: Task = {
    ...existing,
    ...updates,
    updatedAt: Date.now(),
  }
  await db.put(STORE_NAME, updated)
  return updated
}

export async function deleteTask(id: string): Promise<void> {
  const db = await getDb()
  await db.delete(STORE_NAME, id)
}

export async function clearAllTasks(): Promise<void> {
  const db = await getDb()
  await db.clear(STORE_NAME)
}

export async function exportToJSON(): Promise<string> {
  const tasks = await getAllTasks()
  return JSON.stringify(tasks, null, 2)
}

export async function importFromJSON(jsonString: string): Promise<Task[]> {
  try {
    const tasks: Task[] = JSON.parse(jsonString)
    const db = await getDb()
    
    // Validate tasks structure
    if (!Array.isArray(tasks)) throw new Error('Invalid JSON: not an array')
    
    // Clear existing and import new
    await db.clear(STORE_NAME)
    for (const task of tasks) {
      await db.put(STORE_NAME, task)
    }
    
    return tasks
  } catch (error) {
    throw new Error('Invalid JSON format for import')
  }
}
