export type TaskStatus = 'queued' | 'in-progress' | 'done'

export interface Task {
  id: string
  text: string
  status: TaskStatus
  time: string | null
  createdAt: number
  updatedAt: number
}
