import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

import DynamicNavbar from '../components/DynamicNavbar'
import DynamicFooter from '../components/DynamicFooter'
import { usePageContent } from '../hooks/usePageContent'
import { fetchContactInfo, submitContactMessage } from '../services/api'
import './contact.css'

const Contact = () => {
  const { getText } = usePageContent('contact')
  const [contactInfo, setContactInfo] = useState(null)
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchContactInfo().then(setContactInfo).catch(() => setContactInfo(null))
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setStatus({ type: '', message: '' })
    try {
      await submitContactMessage(formState)
      setStatus({ type: 'success', message: 'Thanks! We will get back to you shortly.' })
      setFormState({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.response?.data?.detail || 'Unable to send message right now.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="contact-container">
      <Helmet>
        <title>{getText('seo', 'title', 'Contact Us - HĀRVÉST')}</title>
        <meta property="og:title" content={getText('seo', 'title', 'Contact Us - HĀRVÉST')} />
      </Helmet>
      <DynamicNavbar />
      <div className="contact-main">
        <h1 className="contact-title">{getText('hero', 'heading1', 'Contact Us')}</h1>
        
        <div className="contact-content">
          <div className="contact-info">
            <h2>{getText('info', 'heading', 'Get in Touch')}</h2>
            <div className="info-item">
              <i className="fas fa-map-marker-alt"></i>
              <p>{contactInfo?.address || getText('info', 'address', '123 Institute Road, Maharashtra, India')}</p>
            </div>
            <div className="info-item">
              <i className="fas fa-phone"></i>
              <p>{contactInfo?.phone || getText('info', 'phone', '+91 123 456 7890')}</p>
            </div>
            <div className="info-item">
              <i className="fas fa-envelope"></i>
              <p>{contactInfo?.email || getText('info', 'email', 'info@harvest.org')}</p>
            </div>
            <div className="social-links">
              <a
                href={contactInfo?.facebook_url || 'https://facebook.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <i className="fab fa-facebook"></i> Facebook
              </a>
              <a
                href={contactInfo?.twitter_url || 'https://x.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <i className="fab fa-twitter"></i> Twitter / X
              </a>
              <a
                href={contactInfo?.instagram_url || 'https://instagram.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <i className="fab fa-instagram"></i> Instagram
              </a>
            </div>
          </div>

          <div className="contact-form">
            <h2>{getText('form', 'heading', 'Send us a Message')}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">{getText('form', 'name_label', 'Full Name')}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formState.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">{getText('form', 'email_label', 'Email')}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formState.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject">{getText('form', 'subject_label', 'Subject')}</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formState.subject}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">{getText('form', 'message_label', 'Message')}</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  value={formState.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              {status.message && (
                <div className={`contact-status ${status.type}`}>{status.message}</div>
              )}
              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? 'Sending...' : getText('form', 'submit', 'Send Message')}
              </button>
            </form>
          </div>
        </div>
      </div>
      <DynamicFooter />
    </div>
  )
}

export default Contact 