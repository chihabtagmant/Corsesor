import React from 'react'
import { FiHome, FiBook, FiUsers, FiList, FiSettings } from 'react-icons/fi'
import { PiStudent } from "react-icons/pi";
import { MdOutlineSubscriptions } from "react-icons/md";
import { Link } from 'react-router-dom'

const sidebarItems = [
  { id: 1, title: 'Home', path: '/', icon: FiHome },
  { id: 2, title: 'Courses', path: '/courses', icon: FiBook },
  { id: 3, title: 'Subscription', path: '/subscription', icon: MdOutlineSubscriptions },
  { id: 4, title: 'Members', path: '/users', icon: FiUsers },
  { id: 5, title: 'Students', path: '/students', icon: PiStudent },
]

const DBSidebar = ({ isOpen }) => {
  return (
    <aside
      className={`bg-[#5a4a3a] text-white flex flex-col transition-all duration-300 ease-in-out shrink-0 ${
        isOpen ? 'w-60' : 'w-18'
      }`}
    >
      <nav className="flex-1 py-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.id}
              to={item.path}
              className="flex items-center gap-3 px-4 py-3 hover:bg-[#6d5440] transition-colors"
            >
              <Icon className="w-6 h-6 shrink-0" />
              {isOpen && <span>{item.title}</span>}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

export default DBSidebar