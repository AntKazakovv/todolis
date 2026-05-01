import { useTaskContext } from '../context/TaskContext'
import { useState } from 'react'

export default function Settings() {
  const { exportToJSON, importFromJSON, clearAllTasks, state } = useTaskContext()
  const [message, setMessage] = useState<string | null>(null)

  async function handleExport() {
    try {
      const json = await exportToJSON()
      const blob = new Blob([json], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `todolis-backup-${new Date().toISOString().split('T')[0]}.json`
      a.click()
      URL.revokeObjectURL(url)
      setMessage('Экспорт выполнен успешно')
    } catch {
      setMessage('Ошибка экспорта')
    }
  }

  async function handleImport() {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      
      if (!window.confirm('Импорт заменит все текущие задачи. Продолжить?')) return
      
      try {
        const text = await file.text()
        await importFromJSON(text)
        setMessage('Импорт выполнен успешно')
      } catch {
        setMessage('Ошибка импорта: неверный формат файла')
      }
    }
    input.click()
  }

  async function handleClearAll() {
    if (!window.confirm('Удалить ВСЕ задачи? Это действие нельзя отменить.')) return
    await clearAllTasks()
    setMessage('Все задачи удалены')
  }

  return (
    <div className="p-4 font-mono">
      <div className="mb-6">
        <p className="text-sm text-hacker-text mb-2 glow-console-text">Всего задач: {state.tasks.length}</p>
      </div>

      {message && (
        <div className="bg-hacker-surface border-2 border-hacker-accent text-hacker-accent p-3 mb-4 text-sm glow-console">
          {message}
        </div>
      )}

      <div className="space-y-3">
        <button
          onClick={handleExport}
          className="w-full bg-hacker-surface border-2 border-hacker-accentBlue text-hacker-accentBlue py-3 text-base font-medium active:bg-hacker-border min-h-[44px] glow-console"
        >
          [Экспорт базы данных]
        </button>

        <button
          onClick={handleImport}
          className="w-full bg-hacker-surface border-2 border-hacker-accent text-hacker-accent py-3 text-base font-medium active:bg-hacker-border min-h-[44px] glow-console"
        >
          [Импорт из JSON]
        </button>

        <div className="pt-4 border-t-2 border-hacker-border">
          <button
            onClick={handleClearAll}
            className="w-full bg-hacker-surface border-2 border-hacker-text text-hacker-text py-3 text-base font-medium active:bg-hacker-border min-h-[44px] glow-console"
          >
            [Удалить все задачи]
          </button>
        </div>
      </div>
    </div>
  )
}
