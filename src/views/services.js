import React from 'react'
import { Helmet } from 'react-helmet'

import DynamicNavbar from '../components/DynamicNavbar'
import DynamicFooter from '../components/DynamicFooter'
import { usePageContent } from '../hooks/usePageContent'
import './services.css'

const Services = () => {
  const { getText } = usePageContent('services')
  const serviceCards = [
    {
      title: getText('cards', 'service1_title', 'Education Support'),
      description: getText(
        'cards',
        'service1_description',
        'Providing quality education and learning resources to underprivileged students'
      ),
    },
    {
      title: getText('cards', 'service2_title', 'Community Development'),
      description: getText(
        'cards',
        'service2_description',
        'Working towards sustainable community development through various initiatives'
      ),
    },
    {
      title: getText('cards', 'service3_title', 'Healthcare Services'),
      description: getText(
        'cards',
        'service3_description',
        'Offering basic healthcare services and medical camps for the community'
      ),
    },
    {
      title: getText('cards', 'service4_title', 'Skill Development'),
      description: getText(
        'cards',
        'service4_description',
        'Training programs to enhance employability and self-reliance'
      ),
    },
  ]

  return (
    <div className="services-container">
      <Helmet>
        <title>{getText('seo', 'title', 'Services - HĀRVÉST')}</title>
        <meta property="og:title" content={getText('seo', 'title', 'Services - HĀRVÉST')} />
      </Helmet>
      <DynamicNavbar />
      <div className="services-main">
        <h1 className="services-title">{getText('hero', 'heading', 'Our Services')}</h1>
        <div className="services-grid">
          {serviceCards.map((card, index) => (
            <div key={index} className="service-card">
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      </div>
      <DynamicFooter />
    </div>
  )
}

export default Services 