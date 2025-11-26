import React from 'react'
import Navbar from './navbar'
import { usePageContent } from '../hooks/usePageContent'

const DynamicNavbar = ({ rootClassName = '' }) => {
  const { getText, getImage } = usePageContent('global')

  return (
    <Navbar
      rootClassName={rootClassName}
      link1={getText('navbar', 'link_home', 'Home')}
      link2={getText('navbar', 'link_about', 'About Us')}
      link3={getText('navbar', 'link_services', 'Services')}
      link4={getText('navbar', 'link_events', 'Events')}
      link5={getText('navbar', 'link_contact', 'Contact')}
      text={getText('navbar', 'primary_cta', 'Donate us')}
      text1={getText('navbar', 'secondary_cta', 'Contact Us')}
      logoSrc={getImage('navbar', 'logo')?.src || '/Harvest_logo.jpg'}
      logoAlt={getImage('navbar', 'logo')?.alt || 'HĀRVÉST logo'}
    />
  )
}

export default DynamicNavbar


