import React, { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet'

import DynamicNavbar from '../components/DynamicNavbar'
import DynamicFooter from '../components/DynamicFooter'
import { fetchFaqs } from '../services/api'
import { usePageContent } from '../hooks/usePageContent'
import './faq.css'

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null)
  const [faqs, setFaqs] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const { getText } = usePageContent('faq')

  useEffect(() => {
    fetchFaqs()
      .then(setFaqs)
      .catch(() => setFaqs([]))
      .finally(() => setLoading(false))
  }, [])

  const filteredFaqs = useMemo(() => {
    if (!searchTerm) return faqs
    return faqs.filter((faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [faqs, searchTerm])

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className="faq-container">
      <Helmet>
        <title>{getText('seo', 'title', 'FAQs - HĀRVÉST')}</title>
        <meta property="og:title" content={getText('seo', 'title', 'FAQs - HĀRVÉST')} />
      </Helmet>
      <DynamicNavbar />
      <div className="faq-main">
        <h1 className="faq-title">{getText('hero', 'heading', 'Frequently Asked Questions')}</h1>
        
        <div className="faq-search">
          <input
            type="text"
            placeholder={getText('search', 'placeholder', 'Search FAQs...')}
            className="faq-search-input"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        {loading ? (
          <p className="faq-loading">Loading FAQs...</p>
        ) : filteredFaqs.length === 0 ? (
          <p className="faq-empty">{getText('hero', 'empty_state', 'No answers found for that search.')}</p>
        ) : (
          <div className="faq-list">
            {filteredFaqs.map((faq, index) => (
              <div
                key={faq.id}
                className={`faq-item ${activeIndex === index ? 'active' : ''}`}
              >
                <button
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                  <span className="faq-icon">
                    {activeIndex === index ? '−' : '+'}
                  </span>
                </button>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="faq-contact">
          <h2>{getText('contact', 'heading', 'Still have questions?')}</h2>
          <p>{getText('contact', 'body', "If you couldn't find the answer you're looking for, please feel free to contact us.")}</p>
          <a href="/contact" className="contact-button">
            {getText('contact', 'cta', 'Contact Us')}
          </a>
        </div>
      </div>
      <DynamicFooter />
    </div>
  )
}

export default FAQ 