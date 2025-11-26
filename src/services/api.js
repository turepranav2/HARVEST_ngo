import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const fetchPageContent = async (page, section) => {
  const params = { page }
  if (section) {
    params.section = section
  }
  const response = await client.get('/page-content', { params })
  return response.data || []
}

export const fetchEvents = async (options = {}) => {
  const response = await client.get('/events', {
    params: { active_only: options.activeOnly ?? true },
  })
  return response.data || []
}

export const fetchBlogs = async (options = {}) => {
  const response = await client.get('/blogs', {
    params: { published_only: options.publishedOnly ?? true },
  })
  return response.data || []
}

export const fetchGalleryItems = async (options = {}) => {
  const response = await client.get('/gallery', {
    params: { active_only: options.activeOnly ?? true },
  })
  return response.data || []
}

export const fetchFaqs = async () => {
  const response = await client.get('/faqs')
  return response.data || []
}

export const fetchContactInfo = async () => {
  const response = await client.get('/contact-info')
  return response.data || null
}

export const submitContactMessage = async (payload) => {
  const response = await client.post('/contact-messages', payload)
  return response.data
}

export const createDonationOrder = async (payload) => {
  const response = await client.post('/donations/create-order', payload)
  return response.data
}

export const fetchDonationStatus = async (orderId) => {
  const response = await client.get(`/donations/orders/${orderId}`)
  return response.data
}

export default client


