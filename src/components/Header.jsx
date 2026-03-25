import React, { useState, useRef, useEffect } from 'react'
import { NavBarMenu, searchMenu } from '../mock/data'
import { useNavigate } from 'react-router-dom'
import { FiSearch, FiBell } from 'react-icons/fi'

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const notificationRef = useRef(null)
  const userMenuRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setNotificationsOpen(false)
      }
    }
    if (notificationsOpen) {
      document.addEventListener('click', handleClickOutside)
    }
    return () => document.removeEventListener('click', handleClickOutside)
  }, [notificationsOpen])

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem('corsesor_user')
      if (stored) {
        setUser(JSON.parse(stored))
      }
    } catch (err) {
      setUser(null)
    }
  }, [])

  useEffect(() => {
    const handleClickOutsideUser = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false)
      }
    }
    if (userMenuOpen) {
      document.addEventListener('click', handleClickOutsideUser)
    }
    return () => document.removeEventListener('click', handleClickOutsideUser)
  }, [userMenuOpen])

  const handleSearch = (e) => {
    e.preventDefault()
    const trimmed = searchTerm.trim()
    if (!trimmed) return

    const match = searchMenu.find((item) =>
      item.title.toLowerCase().includes(trimmed.toLowerCase())
    )

    if (match) {
      navigate(match.path)
      setSearchTerm('')
    }
  }

  const handleLogout = () => {
    try {
      window.localStorage.removeItem('corsesor_user')
    } catch (err) {
      // ignore
    }
    setUser(null)
    setUserMenuOpen(false)
    navigate('/login')
  }

  return (
    <header className="bg-[#6d5440] w-full p-4 shadow-md flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3">
        <span className="text-white font-semibold text-xl">Corsesor</span>
      </div>

      <div className="flex-1 flex justify-center px-4">
        <form onSubmit={handleSearch} className="relative w-full max-w-md">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="w-full pl-4 pr-12 py-2 rounded-full text-sm text-gray-800 bg-white focus:outline-none"
          />
          <button
            type="submit"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center bg-[#7D6450] text-white rounded-full cursor-pointer"
          >
            <FiSearch />
          </button>
        </form>
      </div>

      <nav className="flex items-center gap-4 relative">
        <div ref={notificationRef}>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setNotificationsOpen((prev) => !prev)
            }}
            className="text-white p-2 hover:bg-[#7D6450] rounded-full transition-colors"
            aria-label="Notifications"
            aria-expanded={notificationsOpen}
          >
            <FiBell className="w-6 h-6" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 max-h-96 overflow-hidden bg-gray-200 rounded-lg shadow-lg border border-gray-200 flex flex-col z-50">
              <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 font-semibold text-gray-800">
                Notifications
              </div>
              <div className="overflow-y-auto flex-1">
                <div className="px-4 py-6 text-center text-gray-500 text-sm">
                  No new updates yet.
                </div>
              </div>
            </div>
          )}
        </div>

        {!user && (
          <ul className="flex gap-6 text-white">
            {NavBarMenu.map((item) => (
              <li key={item.id}>
                <a
                  href={item.path}
                  className={
                    item.title === 'Login'
                      ? 'bg-white text-[#6d5440] px-4 py-1 rounded-md font-semibold hover:bg-[#f3e5d8] transition-colors'
                      : 'hover:underline'
                  }
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        )}

        {user && (
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setUserMenuOpen((prev) => !prev)
              }}
              className="w-9 h-9 rounded-full bg-[#f3e5d8] text-[#6d5440] flex items-center justify-center font-semibold cursor-pointer hover:bg-white transition-colors"
              aria-label="User menu"
              aria-expanded={userMenuOpen}
            >
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </button>
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-800">
                    {user.name || 'User'}
                  </p>
                  {user.email && (
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  )}
                </div>
                <button
                  type="button"
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => navigate('/profile')}
                >
                  Profile
                </button>
                <button
                  type="button"
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => navigate('/dashboard')}
                >
                  Dashboard
                </button>
                <button
                  type="button"
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => navigate('/settings')}
                >
                  Settings
                </button>
                <button
                  type="button"
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header