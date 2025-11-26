import React, { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet'

import DynamicNavbar from '../components/DynamicNavbar'
import DynamicFooter from '../components/DynamicFooter'
import { fetchBlogs } from '../services/api'
import { usePageContent } from '../hooks/usePageContent'
import './blog.css'

const Blog = () => {
  const { getText } = usePageContent('blog')
  const [blogs, setBlogs] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlogs({ publishedOnly: true })
      .then(setBlogs)
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false))
  }, [])

  const categories = useMemo(() => {
    const unique = new Set(blogs.map((blog) => blog.category || 'General'))
    return ['All', ...Array.from(unique)]
  }, [blogs])

  const filteredBlogs = useMemo(() => {
    if (selectedCategory === 'All') return blogs
    return blogs.filter((blog) => (blog.category || 'General') === selectedCategory)
  }, [blogs, selectedCategory])

  return (
    <div className="blog-container">
      <Helmet>
        <title>{getText('seo', 'title', 'Blog - HĀRVÉST')}</title>
        <meta property="og:title" content={getText('seo', 'title', 'Blog - HĀRVÉST')} />
      </Helmet>
      <DynamicNavbar />
      <div className="blog-main">
        <h1 className="blog-title">{getText('hero', 'heading', 'Our Blog')}</h1>
        
        {categories.length > 1 && (
          <div className="blog-categories">
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
          <p className="blog-loading">Loading blogs...</p>
        ) : filteredBlogs.length === 0 ? (
          <p className="blog-empty">{getText('hero', 'empty_state', 'No blog posts available yet.')}</p>
        ) : (
          <div className="blog-grid">
            {filteredBlogs.map((post) => (
              <article key={post.id} className="blog-card">
                <div className="blog-image-container">
                  {post.image && <img src={post.image} alt={post.title} className="blog-image" />}
                  <span className="blog-category">{post.category || 'General'}</span>
                </div>
                <div className="blog-content">
                  <div className="blog-date">
                    {post.published_at
                      ? new Date(post.published_at).toLocaleDateString()
                      : ''}
                  </div>
                  <h2 className="blog-post-title">{post.title}</h2>
                  <p className="blog-excerpt">{post.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="blog-pagination" aria-hidden="true">
          <button className="pagination-button" disabled>Previous</button>
          <div className="pagination-numbers">
            <button className="pagination-number active">1</button>
          </div>
          <button className="pagination-button" disabled>Next</button>
        </div>
      </div>
      <DynamicFooter />
    </div>
  )
}

export default Blog 