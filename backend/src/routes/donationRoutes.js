const express = require('express')

const controller = require('../controllers/donationController')
const validateRequest = require('../middleware/validateRequest')
const auth = require('../middleware/auth')
const { createOrderRules } = require('../validators/donationValidator')

const router = express.Router()

router.post('/create-order', createOrderRules, validateRequest, controller.createOrder)
router.get('/orders/:orderId', controller.getOrder)
router.post('/webhook', controller.handleWebhook)
router.get('/insights', auth, controller.getInsights)

module.exports = router


