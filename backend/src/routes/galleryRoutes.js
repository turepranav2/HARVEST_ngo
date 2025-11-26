const express = require('express')

const controller = require('../controllers/galleryController')
const auth = require('../middleware/auth')
const upload = require('../middleware/upload')
const validateRequest = require('../middleware/validateRequest')
const { baseRules } = require('../validators/galleryValidator')

const router = express.Router()

router.get('/', controller.list)
router.get('/:id', controller.getById)
router.post('/', auth, baseRules, validateRequest, controller.create)
router.put('/:id', auth, baseRules, validateRequest, controller.update)
router.delete('/:id', auth, controller.remove)
router.post('/:id/upload-image', auth, upload.single('file'), controller.upload)

module.exports = router


