import React, { useState } from 'react'
import { Helmet } from 'react-helmet'

import DynamicNavbar from '../components/DynamicNavbar'
import DynamicFooter from '../components/DynamicFooter'
import { submitContactMessage } from '../services/api'
import { usePageContent } from '../hooks/usePageContent'
import './volunteer.css'

const Volunteer = () => {
  const { getText } = usePageContent('volunteer')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    area: '',
    availability: '',
    message: '',
  })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setStatus({ type: '', message: '' })
    try {
      await submitContactMessage({
        name: formData.name,
        email: formData.email,
        subject: `Volunteer interest: ${formData.area}`,
        message: `
Phone: ${formData.phone}
Availability: ${formData.availability}
Message: ${formData.message}
        `,
      })
      setStatus({ type: 'success', message: 'Application submitted! We will contact you soon.' })
      setFormData({
        name: '',
        email: '',
        phone: '',
        area: '',
        availability: '',
        message: '',
      })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.response?.data?.detail || 'Unable to send application right now.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="volunteer-container">
      <Helmet>
        <title>{getText('seo', 'title', 'Volunteer - HĀRVÉST')}</title>
        <meta property="og:title" content={getText('seo', 'title', 'Volunteer - HĀRVÉST')} />
      </Helmet>
      <DynamicNavbar />
      <div className="volunteer-main">
        <h1 className="volunteer-title">{getText('hero', 'heading', 'Become a Volunteer')}</h1>
        <div className="volunteer-content">
          <div className="volunteer-info">
            <h2>{getText('info', 'heading', 'Make a Difference')}</h2>
            <p>{getText('info', 'body', 'Join our team of dedicated volunteers and help us make a positive impact in our community. We offer various opportunities for you to contribute your time and skills.')}</p>
            
            <div className="volunteer-benefits">
              <h3>{getText('benefits', 'heading', 'Benefits of Volunteering')}</h3>
              <ul>
                <li>{getText('benefits', 'item1', 'Make a meaningful impact in your community')}</li>
                <li>{getText('benefits', 'item2', 'Develop new skills and gain experience')}</li>
                <li>{getText('benefits', 'item3', 'Meet like-minded people')}</li>
                <li>{getText('benefits', 'item4', 'Build your professional network')}</li>
                <li>{getText('benefits', 'item5', 'Personal growth and satisfaction')}</li>
              </ul>
            </div>

            <div className="volunteer-areas">
              <h3>{getText('areas', 'heading', 'Areas of Involvement')}</h3>
              <ul>
                <li>{getText('areas', 'item1', 'Education Support')}</li>
                <li>{getText('areas', 'item2', 'Community Outreach')}</li>
                <li>{getText('areas', 'item3', 'Event Organization')}</li>
                <li>{getText('areas', 'item4', 'Administrative Support')}</li>
                <li>{getText('areas', 'item5', 'Technical Assistance')}</li>
              </ul>
            </div>
          </div>

          <div className="volunteer-form-container">
            <h2>{getText('form', 'heading', 'Volunteer Application')}</h2>
            <form className="volunteer-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">{getText('form', 'name_label', 'Full Name')}</label>
                <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="email">{getText('form', 'email_label', 'Email')}</label>
                <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="phone">{getText('form', 'phone_label', 'Phone Number')}</label>
                <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="area">{getText('form', 'area_label', 'Area of Interest')}</label>
                <select id="area" name="area" required value={formData.area} onChange={handleChange}>
                  <option value="">Select an area</option>
                  <option value="education">Education Support</option>
                  <option value="outreach">Community Outreach</option>
                  <option value="events">Event Organization</option>
                  <option value="admin">Administrative Support</option>
                  <option value="technical">Technical Assistance</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="availability">{getText('form', 'availability_label', 'Availability')}</label>
                <select
                  id="availability"
                  name="availability"
                  required
                  value={formData.availability}
                  onChange={handleChange}
                >
                  <option value="">Select availability</option>
                  <option value="weekday-morning">Weekday Mornings</option>
                  <option value="weekday-afternoon">Weekday Afternoons</option>
                  <option value="weekday-evening">Weekday Evenings</option>
                  <option value="weekend">Weekends</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">{getText('form', 'message_label', 'Why do you want to volunteer?')}</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              {status.message && (
                <div className={`volunteer-status ${status.type}`}>{status.message}</div>
              )}
              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? 'Submitting...' : getText('form', 'submit', 'Submit Application')}
              </button>
            </form>
          </div>
        </div>
      </div>
      <DynamicFooter />
    </div>
  )
}

export default Volunteer 