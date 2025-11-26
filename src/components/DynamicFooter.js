import React from 'react'
import Footer from './footer'
import { usePageContent } from '../hooks/usePageContent'

const DynamicFooter = () => {
  const { getText } = usePageContent('global')

  return (
    <Footer
      content1={getText('footer', 'content1')}
      content2={getText('footer', 'content2')}
      copyright={getText('footer', 'copyright')}
    />
  )
}

export default DynamicFooter


