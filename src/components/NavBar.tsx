import { useLocation, useNavigate } from 'react-router-dom'

const pageTitles: Record<string, string> = {
  '/': 'Мои задачи',
  '/task/new': 'Новая задача',
  '/settings': 'Настройки',
}

export default function NavBar() {
  const location = useLocation()
  const navigate = useNavigate()
  
  const isHome = location.pathname === '/'
  const isSettings = location.pathname === '/settings'
  
  let title = pageTitles[location.pathname]
  if (!title && location.pathname.startsWith('/task/')) {
    title = 'Редактировать задачу'
  }

  return (
    <nav className="bg-hacker-surface border-b-2 border-hacker-border px-4 py-3 flex items-center justify-between sticky top-0 z-10 font-mono">
      {!isHome ? (
        <button
          onClick={() => navigate(-1)}
          className="text-hacker-accent text-base min-h-[44px] min-w-[44px] flex items-center"
        >
          &lt;- Назад
        </button>
      ) : (
        <div className="w-[44px]" />
      )}

      <h1 className="text-lg font-semibold text-hacker-textBright">{title}</h1>

      {!isSettings ? (
        <button
          onClick={() => navigate('/settings')}
          className="text-hacker-accent text-base min-h-[44px] min-w-[44px] flex items-center justify-end"
        >
          [*]
        </button>
      ) : (
        <div className="w-[44px]" />
      )}
    </nav>
  )
}
