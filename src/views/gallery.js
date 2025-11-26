import React, { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet'

import DynamicNavbar from '../components/DynamicNavbar'
import DynamicFooter from '../components/DynamicFooter'
import { fetchGalleryItems } from '../services/api'
import { usePageContent } from '../hooks/usePageContent'
import './gallery.css'

const Gallery = () => {
  const { getText } = usePageContent('gallery')
  const [items, setItems] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGalleryItems({ activeOnly: true })
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [])

  const categories = useMemo(() => {
    const unique = new Set(items.map((item) => item.category || 'General'))
    return ['All', ...Array.from(unique)]
  }, [items])

  const filtered = useMemo(() => {
    if (selectedCategory === 'All') return items
    return items.filter((item) => (item.category || 'General') === selectedCategory)
  }, [items, selectedCategory])

  return (
    <div className="gallery-container">
      <Helmet>
        <title>{getText('seo', 'title', 'Gallery - HĀRVÉST')}</title>
        <meta property="og:title" content={getText('seo', 'title', 'Gallery - HĀRVÉST')} />
      </Helmet>
      <DynamicNavbar />
      <div className="gallery-main">
        <h1 className="gallery-title">{getText('hero', 'heading', 'Our Gallery')}</h1>
        
        {categories.length > 1 && (
          <div className="gallery-categories">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-button ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <p className="gallery-loading">Loading gallery...</p>
        ) : filtered.length === 0 ? (
          <p className="gallery-empty">{getText('hero', 'empty_state', 'No items available yet.')}</p>
        ) : (
          <div className="gallery-grid">
            {filtered.map((item) => (
              <div key={item.id} className="gallery-item">
                <div className="gallery-image-container">
                  {item.image && <img src={item.image} alt={item.title} className="gallery-image" />}
                  <div className="gallery-overlay">
                    <h3>{item.title}</h3>
                    <span className="gallery-category">{item.category || 'General'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <DynamicFooter />
    </div>
  )
}

export default Gallery 