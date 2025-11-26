const express = require('express')

const controller = require('../controllers/contactController')
const auth = require('../middleware/auth')
const validateRequest = require('../middleware/validateRequest')
const { infoRules, messageRules } = require('../validators/contactValidator')

const router = express.Router()

router.get('/contact-info', controller.getInfo)
router.post('/contact-info', auth, infoRules, validateRequest, controller.upsertInfo)
router.put('/contact-info/:id', auth, infoRules, validateRequest, controller.upsertInfo)

router.post('/contact-messages', messageRules, validateRequest, controller.createMessage)
router.get('/contact-messages', auth, controller.listMessages)
router.put('/contact-messages/:id/mark-read', auth, controller.markRead)

module.exports = router


