import React, { useState, useEffect } from 'react'
import { Route, Switch, Redirect, useHistory, useRouteMatch } from 'react-router-dom'

import Login from './components/Login'
import Dashboard from './components/Dashboard'
import PageContentManager from './components/PageContentManager'
import EventsManager from './components/EventsManager'
import BlogsManager from './components/BlogsManager'
import FAQManager from './components/FAQManager'
import GalleryManager from './components/GalleryManager'
import ContactManager from './components/ContactManager'
import Sidebar from './components/Sidebar'

import './components/styles.css'
import './components/Sidebar.css'
import './components/Dashboard.css'
import './components/PageContentManager.css'
import './components/EventsManager.css'
import './components/BlogsManager.css'
import './components/FAQManager.css'
import './components/GalleryManager.css'
import './components/ContactManager.css'
import './components/Login.css'

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'

function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const history = useHistory()
  const { path } = useRouteMatch()

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    const userData = localStorage.getItem('admin_user')
    if (token && userData) {
      setIsAuthenticated(true)
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogin = (token, userData) => {
    localStorage.setItem('admin_token', token)
    localStorage.setItem('admin_user', JSON.stringify(userData))
    setIsAuthenticated(true)
    setUser(userData)
    history.push('/admin/dashboard')
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    setIsAuthenticated(false)
    setUser(null)
    history.push('/admin/login')
  }

  if (!isAuthenticated) {
    return (
      <Switch>
        <Route path={`${path}/login`}>
          <Login onLogin={handleLogin} apiBaseUrl={API_BASE_URL} />
        </Route>
        <Redirect to={`${path}/login`} />
      </Switch>
    )
  }

  return (
    <div className="app-container">
      <Sidebar user={user} onLogout={handleLogout} />
      <div className="main-content">
        <Switch>
          <Route exact path={`${path}/dashboard`}>
            <Dashboard apiBaseUrl={API_BASE_URL} />
          </Route>
          <Route path={`${path}/page-content`}>
            <PageContentManager apiBaseUrl={API_BASE_URL} />
          </Route>
          <Route path={`${path}/events`}>
            <EventsManager apiBaseUrl={API_BASE_URL} />
          </Route>
          <Route path={`${path}/blogs`}>
            <BlogsManager apiBaseUrl={API_BASE_URL} />
          </Route>
          <Route path={`${path}/faqs`}>
            <FAQManager apiBaseUrl={API_BASE_URL} />
          </Route>
          <Route path={`${path}/gallery`}>
            <GalleryManager apiBaseUrl={API_BASE_URL} />
          </Route>
          <Route path={`${path}/contact`}>
            <ContactManager apiBaseUrl={API_BASE_URL} />
          </Route>
          <Redirect to={`${path}/dashboard`} />
        </Switch>
      </div>
    </div>
  )
}

export default AdminApp


