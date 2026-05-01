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
    <nav className="bg-hacker-surface border-b-2 border-hacker-border px-4 py-3 flex items-center justify-between sticky top-0 z-10 font-mono glow-console">
      {!isHome ? (
        <button
          onClick={() => navigate(-1)}
          className="text-hacker-accent text-base min-h-[44px] min-w-[44px] flex items-center glow-console-text"
        >
          &lt;- Назад
        </button>
      ) : (
        <div className="w-[44px] flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="text-hacker-accent w-18 h-18">
            <title>heart</title>
            <path fill="currentColor" d="M9 2H5v2H3v2H1v6h2v2h2v2h2v2h2v2h2v2h2v-2h2v-2h2v-2h2v-2h2v-2h2V6h-2V4h-2V2h-4v2h-2v2h-2V4H9zm0 2v2h2v2h2V6h2V4h4v2h2v6h-2v2h-2v2h-2v2h-2v2h-2v-2H9v-2H7v-2H5v-2H3V6h2V4z"/>
          </svg>
        </div>
      )}

      <h1 className="text-lg font-semibold text-hacker-textBright glow-console-text">{title}</h1>

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
