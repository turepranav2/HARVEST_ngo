const express = require('express')
const controller = require('../controllers/healthController')

const router = express.Router()

router.get('/health', controller.getStatus)

module.exports = router


