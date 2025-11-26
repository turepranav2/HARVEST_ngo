const express = require('express')

const authController = require('../controllers/authController')
const validateRequest = require('../middleware/validateRequest')
const { loginRules } = require('../validators/authValidator')

const router = express.Router()

router.post('/login', loginRules, validateRequest, authController.login)

module.exports = router


