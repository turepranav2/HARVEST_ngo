import React from 'react'
import { Helmet } from 'react-helmet'

import DynamicNavbar from '../components/DynamicNavbar'
import DynamicFooter from '../components/DynamicFooter'
import { usePageContent } from '../hooks/usePageContent'
import './not-found.css'

const NotFound1 = () => {
  const { getText } = usePageContent('not-found')

  return (
    <div className="not-found1-container1">
      <Helmet>
        <title>{getText('seo', 'title', 'Page Not Found - HĀRVÉST')}</title>
      </Helmet>
      <DynamicNavbar />
      <div className="not-found1-content">
        <p className="not-found1-eyebrow">{getText('hero', 'eyebrow', 'Oops! Page not found')}</p>
        <div className="not-found1-container2">
          <h1 className="not-found1-text2">{getText('hero', 'headline', '404')}</h1>
        </div>
        <div className="not-found1-container3">
          <h2 className="not-found1-text3">
            {getText(
              'hero',
              'body',
              'We are sorry, but the page you requested was not found.'
            )}
          </h2>
          <p className="not-found1-helper">
            {getText('hero', 'helper', 'Use the navigation above to continue exploring.')}
          </p>
        </div>
      </div>
      <DynamicFooter />
    </div>
  )
}

export default NotFound1
