const HTTP_STATUS = require('../constants/httpStatus')
const asyncHandler = require('../utils/asyncHandler')
const { toCamelCase, toSnakeCase } = require('../utils/transformers')
const eventService = require('../services/eventService')
const { uploadImage } = require('../services/cloudinaryService')

const list = asyncHandler(async (req, res) => {
  const activeOnly = req.query.active_only !== 'false'
  const events = await eventService.list({ activeOnly })
  return res.json(toSnakeCase(events))
})

const getById = asyncHandler(async (req, res) => {
  const event = await eventService.getById(req.params.id)
  return res.json(toSnakeCase(event))
})

const create = asyncHandler(async (req, res) => {
  const payload = toCamelCase(req.body)
  const event = await eventService.create(payload)
  return res.status(HTTP_STATUS.CREATED).json(toSnakeCase(event))
})

const update = asyncHandler(async (req, res) => {
  const payload = toCamelCase(req.body)
  const event = await eventService.update(req.params.id, payload)
  return res.json(toSnakeCase(event))
})

const remove = asyncHandler(async (req, res) => {
  await eventService.remove(req.params.id)
  return res.status(HTTP_STATUS.NO_CONTENT).send()
})

const upload = asyncHandler(async (req, res) => {
  const result = await uploadImage(req.file, {
    folder: 'harvest/events',
  })
  const event = await eventService.update(req.params.id, {
    image: result.url,
  })
  return res.json(
    toSnakeCase({
      ...event,
      image_metadata: {
        width: result.width,
        height: result.height,
        public_id: result.publicId,
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


