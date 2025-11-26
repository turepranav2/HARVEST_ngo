const express = require('express')

const authRoutes = require('./authRoutes')
const pageContentRoutes = require('./pageContentRoutes')
const eventRoutes = require('./eventRoutes')
const blogRoutes = require('./blogRoutes')
const faqRoutes = require('./faqRoutes')
const galleryRoutes = require('./galleryRoutes')
const contactRoutes = require('./contactRoutes')
const donationRoutes = require('./donationRoutes')
const uploadRoutes = require('./uploadRoutes')
const healthRoutes = require('./healthRoutes')

const router = express.Router()

router.use('/', healthRoutes)
router.use('/auth', authRoutes)
router.use('/page-content', pageContentRoutes)
router.use('/events', eventRoutes)
router.use('/blogs', blogRoutes)
router.use('/faqs', faqRoutes)
router.use('/gallery', galleryRoutes)
router.use('/', contactRoutes)
router.use('/donations', donationRoutes)
router.use('/', uploadRoutes)

module.exports = router


