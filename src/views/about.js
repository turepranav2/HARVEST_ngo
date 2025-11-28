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
            <p>{getText('mission', 'body', 'To empower communities through education, healthcare, and sustainable development initiatives.HĀRVÉST is committed to empowering rural communities through holistic, sustainable, and equitable solutions that foster agricultural prosperity, environmental stewardship, and socioeconomic transformation. By harnessing the ingenuity and resilience of rural populations, we strive to elevate lives, nurture ecosystems, and cultivate a future of shared abundance.')}</p>
          </div>
          <div className="about-section">
            <h2>{getText('vision', 'heading', 'Our Vision')}</h2>
            <p>{getText('vision', 'body', 'To create a society where every individual has access to quality education and healthcare.HĀRVÉST envisions a world where rural communities thrive, with access to innovative resources, technologies, and opportunities that catalyze their development and self-reliance. We aspire to be a driving force in the global movement towards sustainable agriculture, climate-resilient livelihoods, and inclusive, community-led progress, ensuring that no one is left behind in the pursuit of a more just, prosperous, and environmentally conscious future.')}</p>
            <p>{getText('vision', 'body2','Through our multifaceted approach, we aim to:')}</p>
            <li>{getText('values', 'value1', '1. Promote sustainable agricultural practices that enhance food security, improve farmer livelihoods, and foster environmental regeneration.')}</li>
            <li>{getText('values', 'value2', '2. Empower rural women, youth, and marginalized groups with the necessary skills, knowledge, and resources to become agents of positive change.')}</li>
            <li>{getText('values', 'value3', '3. Facilitate access to quality education, vocational training, and lifelong learning opportunities that unlock the full potential of rural communities.')}</li>
            <li>{getText('values', 'value4', '4. Advocate for policies and interventions that address the unique challenges faced by rural populations, ensuring their voices are heard and their needs are met.')}</li>
            <li>{getText('values', 'value5', '5. Collaborate with diverse stakeholders, including governments, NGOs, private sector, and community-based organizations, to catalyze integrated, multidimensional solutions.')}</li>
            <li>{getText('values', 'value6', '6. Promote climate change adaptation and mitigation strategies that build community resilience and safeguard the natural resources upon which rural livelihoods depend.')}</li>
            <li>{getText('values', 'value7', '7. Cultivate a culture of innovation, entrepreneurship, and social impact, enabling rural communities to become self-reliant and resilient in the face of emerging challenges.')}</li>
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
