import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Sidebar.css'

const Sidebar = ({ user, onLogout }) => {
  const location = useLocation()
  const pathWithHash = `${location.pathname}${location.hash || ''}`

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/dashboard#payments', label: 'Payments', icon: '💳' },
    { path: '/admin/page-content', label: 'Page Content', icon: '📝' },
    { path: '/admin/events', label: 'Events', icon: '📅' },
    { path: '/admin/blogs', label: 'Blogs', icon: '📰' },
    { path: '/admin/faqs', label: 'FAQs', icon: '❓' },
    { path: '/admin/gallery', label: 'Gallery', icon: '🖼️' },
    { path: '/admin/contact', label: 'Contact', icon: '📧' },
  ]

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
          const isDashboard = item.path === '/admin/dashboard'
          const isActive =
            pathWithHash === item.path ||
            (isDashboard && location.pathname === '/admin/dashboard' && !location.hash)
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


