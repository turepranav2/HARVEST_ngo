const express = require('express')

const controller = require('../controllers/uploadController')
const auth = require('../middleware/auth')
const upload = require('../middleware/upload')

const router = express.Router()

router.post('/upload-image', auth, upload.single('file'), controller.upload)

module.exports = router


