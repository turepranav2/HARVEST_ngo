const express = require('express')

const controller = require('../controllers/faqController')
const auth = require('../middleware/auth')
const validateRequest = require('../middleware/validateRequest')
const { baseRules } = require('../validators/faqValidator')

const router = express.Router()

router.get('/', controller.list)
router.get('/:id', controller.getById)
router.post('/', auth, baseRules, validateRequest, controller.create)
router.put('/:id', auth, baseRules, validateRequest, controller.update)
router.delete('/:id', auth, controller.remove)

module.exports = router


