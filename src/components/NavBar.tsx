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
    <nav className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
      {!isHome ? (
        <button
          onClick={() => navigate(-1)}
          className="text-blue-500 text-base min-h-[44px] min-w-[44px] flex items-center"
        >
          ← Назад
        </button>
      ) : (
        <div className="w-[44px]" />
      )}
      
      <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
      
      {!isSettings ? (
        <button
          onClick={() => navigate('/settings')}
          className="text-blue-500 text-base min-h-[44px] min-w-[44px] flex items-center justify-end"
        >
          ⚙️
        </button>
      ) : (
        <div className="w-[44px]" />
      )}
    </nav>
  )
}
