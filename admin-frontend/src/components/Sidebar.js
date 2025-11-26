import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Sidebar.css'

const Sidebar = ({ user, onLogout }) => {
  const location = useLocation()

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/dashboard#payments', label: 'Payments', icon: '💳' },
    { path: '/page-content', label: 'Page Content', icon: '📝' },
    { path: '/events', label: 'Events', icon: '📅' },
    { path: '/blogs', label: 'Blogs', icon: '📰' },
    { path: '/faqs', label: 'FAQs', icon: '❓' },
    { path: '/gallery', label: 'Gallery', icon: '🖼️' },
    { path: '/contact', label: 'Contact', icon: '📧' },
  ]

  const pathWithHash = `${location.pathname}${location.hash || ''}`

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>HĀRVÉST Admin</h2>
        {user && (
          <div className="user-info">
            <span>👤 {user.username}</span>
          </div>
        )}
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const isDashboard = item.path === '/dashboard'
          const isActive =
            pathWithHash === item.path ||
            (isDashboard && location.pathname === '/dashboard' && !location.hash)
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          )
        })}
      </nav>
      <div className="sidebar-footer">
        <button onClick={onLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  )
}

export default Sidebar

