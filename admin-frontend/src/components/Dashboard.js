import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { apiClient } from '../utils/api'
import './Dashboard.css'

const formatCurrency = (value = 0) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value || 0)

const Dashboard = ({ apiBaseUrl }) => {
  const [stats, setStats] = useState({
    events: 0,
    blogs: 0,
    faqs: 0,
    gallery: 0,
    messages: 0,
  })
  const [paymentInsights, setPaymentInsights] = useState({
    overview: {
      totalAmount: 0,
      totalTransactions: 0,
      successAmount: 0,
      successTransactions: 0,
      successRate: 0,
    },
    statusSummary: [],
    trend: [],
    recent: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const client = apiClient(apiBaseUrl)

      // Fetch all collections in parallel
      const [events, blogs, faqs, gallery, messages, donations] = await Promise.all([
        client.get('/events?active_only=false'),
        client.get('/blogs?published_only=false'),
        client.get('/faqs?active_only=false'),
        client.get('/gallery?active_only=false'),
        client.get('/contact-messages'),
        client.get('/donations/insights'),
      ])

      // Since API returns a direct array → use data.length
      setStats({
        events: Array.isArray(events.data) ? events.data.length : 0,
        blogs: Array.isArray(blogs.data) ? blogs.data.length : 0,
        faqs: Array.isArray(faqs.data) ? faqs.data.length : 0,
        gallery: Array.isArray(gallery.data) ? gallery.data.length : 0,
        messages: Array.isArray(messages.data) ? messages.data.length : 0,
      })
      if (donations.data) {
        setPaymentInsights(donations.data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const quickActions = useMemo(
    () => [
      {
        label: 'Page Content',
        description: 'Edit hero, SEO, and CTAs',
        icon: '📝',
        path: '/page-content',
      },
      { label: 'Events', description: 'Manage upcoming events', icon: '📅', path: '/events' },
      { label: 'Blogs', description: 'Publish new stories', icon: '📰', path: '/blogs' },
      { label: 'FAQs', description: 'Tweak help articles', icon: '❓', path: '/faqs' },
      { label: 'Gallery', description: 'Upload impact photos', icon: '🖼️', path: '/gallery' },
      { label: 'Contact & Leads', description: 'Reply to enquiries', icon: '📧', path: '/contact' },
      {
        label: 'Payment Insights',
        description: 'Review donation flow',
        icon: '💳',
        anchor: '#payments',
      },
    ],
    []
  )

  const trendMax = useMemo(() => {
    if (!paymentInsights.trend?.length) return 1
    return Math.max(...paymentInsights.trend.map((day) => day.successAmount || 0), 1)
  }, [paymentInsights.trend])

  if (loading) {
    return <div className="dashboard-loading">Loading...</div>
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-info">
            <h3>{stats.events}</h3>
            <p>Events</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📰</div>
          <div className="stat-info">
            <h3>{stats.blogs}</h3>
            <p>Blog Posts</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">❓</div>
          <div className="stat-info">
            <h3>{stats.faqs}</h3>
            <p>FAQs</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🖼️</div>
          <div className="stat-info">
            <h3>{stats.gallery}</h3>
            <p>Gallery Items</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📧</div>
          <div className="stat-info">
            <h3>{stats.messages}</h3>
            <p>Contact Messages</p>
          </div>
        </div>

      </div>

      <section className="quick-actions">
        {quickActions.map((action) =>
          action.anchor ? (
            <a key={action.label} href={action.anchor} className="quick-action-card">
              <span className="qa-icon">{action.icon}</span>
              <div>
                <h4>{action.label}</h4>
                <p>{action.description}</p>
              </div>
            </a>
          ) : (
            <Link key={action.label} to={action.path} className="quick-action-card">
              <span className="qa-icon">{action.icon}</span>
              <div>
                <h4>{action.label}</h4>
                <p>{action.description}</p>
              </div>
            </Link>
          )
        )}
      </section>

      <section className="payment-insights" id="payments">
        <div className="section-header">
          <h2>Payment Insights</h2>
          <p>Real-time view of donation performance</p>
        </div>

        <div className="payment-cards">
          <div className="payment-card primary">
            <span>Total Raised</span>
            <strong>{formatCurrency(paymentInsights.overview.totalAmount)}</strong>
            <small>{paymentInsights.overview.totalTransactions} payments</small>
          </div>
          <div className="payment-card success">
            <span>Successful Payments</span>
            <strong>{formatCurrency(paymentInsights.overview.successAmount)}</strong>
            <small>
              {paymentInsights.overview.successTransactions} orders •{' '}
              {paymentInsights.overview.successRate.toFixed(1)}% success rate
            </small>
          </div>
          <div className="payment-card neutral">
            <span>Top Statuses</span>
            <ul>
              {(paymentInsights.statusSummary || []).slice(0, 3).map((status) => (
                <li key={status.status}>
                  <strong>{status.status}</strong>
                  <span>
                    {status.totalCount} • {formatCurrency(status.totalAmount)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="payment-grid">
          <div className="trend-card">
            <h3>Last 30 Days</h3>
            <div className="trend-rows">
              {(paymentInsights.trend || []).slice(-10).map((day) => (
                <div key={day.date} className="trend-row">
                  <span className="trend-date">
                    {new Date(day.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                  </span>
                  <div className="trend-bar">
                    <span
                      style={{
                        width: `${Math.min((day.successAmount / trendMax) * 100, 100)}%`,
                      }}
                    />
                  </div>
                  <span className="trend-amount">{formatCurrency(day.successAmount)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="recent-donations">
            <h3>Latest Donations</h3>
            <div className="recent-table">
              {(paymentInsights.recent || []).slice(0, 6).map((txn) => (
                <div key={txn.id} className="recent-row">
                  <div>
                    <strong>{txn.customer_name || 'Anonymous'}</strong>
                    <p>{txn.order_id}</p>
                  </div>
                  <div className={`status-chip status-${txn.status}`}>
                    {txn.status}
                  </div>
                  <div className="recent-amount">
                    {formatCurrency(txn.amount)}
                    <small>{new Date(txn.created_at).toLocaleDateString()}</small>
                  </div>
                </div>
              ))}
              {!paymentInsights.recent?.length && <p>No donations recorded yet.</p>}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard
