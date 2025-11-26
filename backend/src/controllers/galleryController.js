const HTTP_STATUS = require('../constants/httpStatus')
const asyncHandler = require('../utils/asyncHandler')
const { toCamelCase, toSnakeCase } = require('../utils/transformers')
const galleryService = require('../services/galleryService')
const { uploadImage } = require('../services/cloudinaryService')

const list = asyncHandler(async (req, res) => {
  const activeOnly = req.query.active_only !== 'false'
  const items = await galleryService.list({ activeOnly })
  return res.json(toSnakeCase(items))
})

const getById = asyncHandler(async (req, res) => {
  const item = await galleryService.getById(req.params.id)
  return res.json(toSnakeCase(item))
})

const create = asyncHandler(async (req, res) => {
  const payload = toCamelCase(req.body)
  const item = await galleryService.create(payload)
  return res.status(HTTP_STATUS.CREATED).json(toSnakeCase(item))
})

const update = asyncHandler(async (req, res) => {
  const payload = toCamelCase(req.body)
  const item = await galleryService.update(req.params.id, payload)
  return res.json(toSnakeCase(item))
})

const remove = asyncHandler(async (req, res) => {
  await galleryService.remove(req.params.id)
  return res.status(HTTP_STATUS.NO_CONTENT).send()
})

const upload = asyncHandler(async (req, res) => {
  const result = await uploadImage(req.file, {
    folder: 'harvest/gallery',
  })
  const item = await galleryService.update(req.params.id, {
    image: result.url,
  })
  return res.json(
    toSnakeCase({
      ...item,
      image_metadata: {
        public_id: result.publicId,
        width: result.width,
        height: result.height,
      },
    })
  )
})

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
  upload,
}


