import React, { useState, useEffect } from 'react'
import { apiClient, uploadFile } from '../utils/api'
import './GalleryManager.css'

const GalleryManager = ({ apiBaseUrl }) => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'General',
    is_featured: false,
    is_active: true,
  })
  const [pendingImage, setPendingImage] = useState(null)
  const [imagePreview, setImagePreview] = useState('')

  useEffect(() => {
    fetchItems()
  }, [])

  useEffect(() => {
    if (!pendingImage) return undefined
    const previewUrl = URL.createObjectURL(pendingImage)
    setImagePreview(previewUrl)
    return () => URL.revokeObjectURL(previewUrl)
  }, [pendingImage])

  const fetchItems = async () => {
    try {
      const client = apiClient(apiBaseUrl)
      const response = await client.get('/gallery?active_only=false')
      setItems(response.data)
    } catch (error) {
      console.error('Error fetching gallery items:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const client = apiClient(apiBaseUrl)
      const response = editing
        ? await client.put(`/gallery/${editing.id}`, formData)
        : await client.post('/gallery', formData)

      const savedItem = response.data

      if (pendingImage && (savedItem?.id || editing?.id)) {
        await handleImageUpload(pendingImage, savedItem?.id || editing.id, {
          silent: true,
          skipRefresh: true,
        })
      }

      resetForm()
      fetchItems()
    } catch (error) {
      alert('Error saving gallery item: ' + (error.response?.data?.detail || error.message))
    }
  }

  const handleEdit = (item) => {
    setEditing(item)
    setFormData({
      title: item.title,
      description: item.description || '',
      category: item.category,
      is_featured: item.is_featured,
      is_active: item.is_active,
    })
    setImagePreview(item.image || '')
    setPendingImage(null)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this gallery item?')) return
    try {
      const client = apiClient(apiBaseUrl)
      await client.delete(`/gallery/${id}`)
      fetchItems()
    } catch (error) {
      alert('Error deleting gallery item: ' + (error.response?.data?.detail || error.message))
    }
  }

  const handleImageUpload = async (file, itemId, options = {}) => {
    if (!file || !itemId) return
    try {
      const data = await uploadFile(apiBaseUrl, `/gallery/${itemId}/upload-image`, file)
      if (data?.image) {
        setImagePreview(data.image)
      }
      setPendingImage(null)
      if (!options.skipRefresh) {
        fetchItems()
      }
      if (!options.silent) {
        alert('Image uploaded successfully!')
      }
    } catch (error) {
      alert('Error uploading image: ' + (error.response?.data?.detail || error.message))
    }
  }

  const resetForm = () => {
    setEditing(null)
    setFormData({
      title: '',
      description: '',
      category: 'General',
      is_featured: false,
      is_active: true,
    })
    setPendingImage(null)
    setImagePreview('')
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="gallery-manager">
      <h1>Gallery Manager</h1>

      <form onSubmit={handleSubmit} className="gallery-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows="3"
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="General">General</option>
              <option value="Events">Events</option>
              <option value="Education">Education</option>
              <option value="Health">Health</option>
              <option value="Culture">Culture</option>
              <option value="Community">Community</option>
            </select>
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={formData.is_featured}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
              />
              Featured
            </label>
            <label>
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              />
              Active
            </label>
          </div>
        </div>
        <div className="form-group">
          <label>{editing ? 'Update' : 'Add'} Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
                if (e.target.files[0]) {
                  setPendingImage(e.target.files[0])
                }
            }}
          />
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
              {!pendingImage && editing && <p className="image-hint">Current image</p>}
            </div>
          )}
          {pendingImage && editing && (
            <button
              type="button"
              onClick={() => handleImageUpload(pendingImage, editing.id)}
            >
              Upload selected image now
            </button>
          )}
        </div>
        <button type="submit">{editing ? 'Update' : 'Create'}</button>
        {editing && <button type="button" onClick={resetForm}>Cancel</button>}
      </form>

      <div className="gallery-grid">
        {items.map((item) => (
          <div key={item.id} className="gallery-item">
            {item.image && <img src={item.image} alt={item.title} />}
            <div className="gallery-info">
              <h3>{item.title}</h3>
              {item.description && <p>{item.description}</p>}
              <div className="gallery-meta">
                <span>📁 {item.category}</span>
                {item.is_featured && <span>⭐ Featured</span>}
              </div>
              <div className="gallery-actions">
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item.id)} className="delete-btn">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GalleryManager

