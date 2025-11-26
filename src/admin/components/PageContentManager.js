import React, { useState, useEffect } from 'react'
import { apiClient, uploadFile } from '../api'
import './PageContentManager.css'

const PAGE_OPTIONS = [
  { value: 'global', label: 'Global (Navbar & Footer)' },
  { value: 'home', label: 'Home' },
  { value: 'about', label: 'About' },
  { value: 'services', label: 'Services' },
  { value: 'events', label: 'Events' },
  { value: 'gallery', label: 'Gallery' },
  { value: 'blog', label: 'Blog' },
  { value: 'faq', label: 'FAQ' },
  { value: 'contact', label: 'Contact' },
  { value: 'donate', label: 'Donate' },
  { value: 'volunteer', label: 'Volunteer' },
  { value: 'login', label: 'Login' },
  { value: 'register', label: 'Register' },
  { value: 'not-found', label: '404 / Not found' },
]

const SECTION_SUGGESTIONS = [
  'seo',
  'hero',
  'navbar',
  'footer',
  'cta',
  'features',
  'mission',
  'vision',
  'values',
  'stats',
  'info',
  'form',
  'testimonials',
  'programs',
  'team',
  'contact',
  'gallery',
  'blog',
]

const DEFAULT_FORM = {
  page: 'home',
  section: 'hero',
  field_name: '',
  text_content: '',
  image_url: '',
  image_alt: '',
  order: 0,
  is_active: true,
}

const PageContentManager = ({ apiBaseUrl }) => {
  const [contents, setContents] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [formData, setFormData] = useState(DEFAULT_FORM)
  const [filterPage, setFilterPage] = useState('')
  const [filterSection, setFilterSection] = useState('')

  useEffect(() => {
    fetchContents()
  }, [filterPage, filterSection])

  const fetchContents = async () => {
    try {
      const client = apiClient(apiBaseUrl)
      const params = {}
      if (filterPage) params.page = filterPage
      if (filterSection) params.section = filterSection

      const response = await client.get('/page-content', { params })
      setContents(response.data)
    } catch (error) {
      console.error('Error fetching contents:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const client = apiClient(apiBaseUrl)
      if (editing) {
        await client.put(`/page-content/${editing.id}`, formData)
      } else {
        await client.post('/page-content', formData)
      }
      setEditing(null)
      setFormData(DEFAULT_FORM)
      fetchContents()
    } catch (error) {
      alert('Error saving content: ' + (error.response?.data?.detail || error.message))
    }
  }

  const handleEdit = (content) => {
    setEditing(content)
    setFormData({
      page: content.page,
      section: content.section,
      field_name: content.field_name,
      text_content: content.text_content || '',
      image_url: content.image_url || '',
      image_alt: content.image_alt || '',
      order: content.order,
      is_active: content.is_active,
    })
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this content?')) return
    try {
      const client = apiClient(apiBaseUrl)
      await client.delete(`/page-content/${id}`)
      fetchContents()
    } catch (error) {
      alert('Error deleting content: ' + (error.response?.data?.detail || error.message))
    }
  }

  const handleImageUpload = async (file, contentId) => {
    try {
      const result = await uploadFile(
        apiBaseUrl,
        `/page-content/${contentId}/upload-image`,
        file,
        { alt_text: formData.image_alt }
      )

      setFormData({ ...formData, image_url: result.image_url })
      fetchContents()
    } catch (error) {
      alert('Error uploading image: ' + (error.response?.data?.detail || error.message))
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="page-content-manager">
      <h1>Page Content Manager</h1>

      <div className="filters">
        <select value={filterPage} onChange={(e) => setFilterPage(e.target.value)}>
          <option value="">All Pages</option>
          {PAGE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select value={filterSection} onChange={(e) => setFilterSection(e.target.value)}>
          <option value="">All Sections</option>
          {SECTION_SUGGESTIONS.map((section) => (
            <option key={section} value={section}>
              {section}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            setEditing(null)
            setFormData(DEFAULT_FORM)
          }}
        >
          Add New
        </button>
      </div>

      <form onSubmit={handleSubmit} className="content-form">
        <div className="form-row">
          <div className="form-group">
            <label>Page</label>
            <select
              value={formData.page}
              onChange={(e) => setFormData({ ...formData, page: e.target.value })}
              required
            >
              {PAGE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Section</label>
            <input
              type="text"
              list="section-suggestions"
              value={formData.section}
              onChange={(e) => setFormData({ ...formData, section: e.target.value })}
              required
              placeholder="e.g., hero, seo, mission"
            />
            <datalist id="section-suggestions">
              {SECTION_SUGGESTIONS.map((section) => (
                <option key={section} value={section} />
              ))}
            </datalist>
          </div>
        </div>

        <div className="form-group">
          <label>Field Name</label>
          <input
            type="text"
            value={formData.field_name}
            onChange={(e) => setFormData({ ...formData, field_name: e.target.value })}
            required
            placeholder="e.g., heading1, content1"
          />
        </div>

        <div className="form-group">
          <label>Text Content</label>
          <textarea
            value={formData.text_content}
            onChange={(e) => setFormData({ ...formData, text_content: e.target.value })}
            rows="4"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Image URL</label>
            <input
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Image Alt Text</label>
            <input
              type="text"
              value={formData.image_alt}
              onChange={(e) => setFormData({ ...formData, image_alt: e.target.value })}
            />
          </div>
        </div>

        {editing && (
          <div className="form-group">
            <label>Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files[0]) {
                  handleImageUpload(e.target.files[0], editing.id)
                }
              }}
            />
          </div>
        )}

        <div className="form-row">
          <div className="form-group">
            <label>Order</label>
            <input
              type="number"
              value={formData.order}
              onChange={(e) =>
                setFormData({ ...formData, order: parseInt(e.target.value, 10) || 0 })
              }
            />
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) =>
                  setFormData({ ...formData, is_active: e.target.checked })
                }
              />
              Active
            </label>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit">{editing ? 'Update' : 'Create'}</button>
          {editing && (
            <button type="button" onClick={() => setEditing(null)} className="secondary-btn">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="contents-list">
        <h2>Existing Contents</h2>
        <table>
          <thead>
            <tr>
              <th>Page</th>
              <th>Section</th>
              <th>Field</th>
              <th>Content Preview</th>
              <th>Order</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {contents.map((content) => (
              <tr key={content.id}>
                <td>{content.page}</td>
                <td>{content.section}</td>
                <td>{content.field_name}</td>
                <td>
                  {content.text_content?.substring(0, 50) ||
                    content.image_url?.substring(0, 50) ||
                    '-'}
                </td>
                <td>{content.order}</td>
                <td>{content.is_active ? '✓' : '✗'}</td>
                <td>
                  <button onClick={() => handleEdit(content)}>Edit</button>
                  <button
                    onClick={() => handleDelete(content.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  )
}

export default PageContentManager


