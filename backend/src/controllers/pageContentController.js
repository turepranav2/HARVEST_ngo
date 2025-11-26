const HTTP_STATUS = require('../constants/httpStatus')
const asyncHandler = require('../utils/asyncHandler')
const { toCamelCase, toSnakeCase } = require('../utils/transformers')
const pageContentService = require('../services/pageContentService')
const { uploadImage } = require('../services/cloudinaryService')

const list = asyncHandler(async (req, res) => {
  const { page, section, active_only: activeOnlyParam } = req.query
  const activeOnly =
    typeof activeOnlyParam === 'undefined' ? true : activeOnlyParam !== 'false'

  const items = await pageContentService.list({
    page,
    section,
    activeOnly,
  })

  return res.json(toSnakeCase(items))
})

const getById = asyncHandler(async (req, res) => {
  const item = await pageContentService.getById(req.params.id)
  return res.json(toSnakeCase(item))
})

const create = asyncHandler(async (req, res) => {
  const payload = toCamelCase(req.body)
  const item = await pageContentService.create(payload)
  return res.status(HTTP_STATUS.CREATED).json(toSnakeCase(item))
})

const update = asyncHandler(async (req, res) => {
  const payload = toCamelCase(req.body)
  const item = await pageContentService.update(req.params.id, payload)
  return res.json(toSnakeCase(item))
})

const remove = asyncHandler(async (req, res) => {
  await pageContentService.remove(req.params.id)
  return res.status(HTTP_STATUS.NO_CONTENT).send()
})

const upload = asyncHandler(async (req, res) => {
  const { alt_text: altText } = req.body
  const result = await uploadImage(req.file, {
    folder: 'harvest/page-content',
  })

  const updated = await pageContentService.update(req.params.id, {
    imageUrl: result.url,
    imageAlt: altText,
  })

  return res.json(
    toSnakeCase({
      ...updated,
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


