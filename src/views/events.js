import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

import DynamicNavbar from '../components/DynamicNavbar'
import DynamicFooter from '../components/DynamicFooter'
import { fetchEvents } from '../services/api'
import { usePageContent } from '../hooks/usePageContent'
import './events.css'

const Events = () => {
  const { getText } = usePageContent('events')
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEvents({ activeOnly: true })
      .then(setEvents)
      .catch(() => setEvents([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="events-container">
      <Helmet>
        <title>{getText('seo', 'title', 'Events - HĀRVÉST')}</title>
        <meta property="og:title" content={getText('seo', 'title', 'Events - HĀRVÉST')} />
      </Helmet>
      <DynamicNavbar />
      <div className="events-main">
        <h1 className="events-title">{getText('hero', 'heading', 'Upcoming Events')}</h1>
        {loading ? (
          <p className="events-loading">Loading events...</p>
        ) : events.length === 0 ? (
          <p className="events-empty">{getText('hero', 'empty_state', 'No events scheduled right now.')}</p>
        ) : (
          <div className="events-grid">
            {events.map((event) => (
              <div key={event.id} className="event-card">
                {event.image && <img src={event.image} alt={event.title} className="event-image" />}
                <h3>{event.title}</h3>
                <div className="event-details">
                  <p className="event-date">📅 {new Date(event.date).toLocaleDateString()}</p>
                  <p className="event-location">📍 {event.location}</p>
                </div>
                <p className="event-description">{event.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <DynamicFooter />
    </div>
  )
}

export default Events 