import React from 'react'
import { Helmet } from 'react-helmet'

import DynamicNavbar from '../components/DynamicNavbar'
import DynamicFooter from '../components/DynamicFooter'
import { usePageContent } from '../hooks/usePageContent'
import './about.css'

const About = () => {
  const { getText } = usePageContent('about')

  return (
    <div className="about-container">
      <Helmet>
        <title>{getText('seo', 'title', 'About - HĀRVÉST')}</title>
        <meta property="og:title" content={getText('seo', 'title', 'About - HĀRVÉST')} />
      </Helmet>
      <DynamicNavbar />
      <div className="about-main">
        <h1 className="about-title">{getText('hero', 'heading1', 'About Us')}</h1>
        <div className="about-content">
          <div className="about-section">
            <h2>{getText('mission', 'heading', 'Our Mission')}</h2>
            <p>{getText('mission', 'body', 'To empower communities through education, healthcare, and sustainable development initiatives.')}</p>
          </div>
          <div className="about-section">
            <h2>{getText('vision', 'heading', 'Our Vision')}</h2>
            <p>{getText('vision', 'body', 'To create a society where every individual has access to quality education and healthcare.')}</p>
          </div>
          <div className="about-section">
            <h2>{getText('values', 'heading', 'Our Values')}</h2>
            <ul>
              <li>{getText('values', 'value1', 'Integrity and Transparency')}</li>
              <li>{getText('values', 'value2', 'Community Empowerment')}</li>
              <li>{getText('values', 'value3', 'Innovation and Excellence')}</li>
              <li>{getText('values', 'value4', 'Social Responsibility')}</li>
            </ul>
          </div>
        </div>
      </div>
      <DynamicFooter />
    </div>
  )
}

export default About
