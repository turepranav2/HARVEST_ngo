const asyncHandler = require('../utils/asyncHandler')
const { toSnakeCase } = require('../utils/transformers')
const { uploadImage } = require('../services/cloudinaryService')

const upload = asyncHandler(async (req, res) => {
  const folder = req.body.folder || 'harvest/misc'
  const result = await uploadImage(req.file, { folder })
  return res.json(
    toSnakeCase({
      url: result.url,
      publicId: result.publicId,
      width: result.width,
      height: result.height,
    })
  )
})

module.exports = {
  upload,
}


