const HTTP_STATUS = require('../constants/httpStatus')
const asyncHandler = require('../utils/asyncHandler')
const { toCamelCase, toSnakeCase } = require('../utils/transformers')
const faqService = require('../services/faqService')

const list = asyncHandler(async (req, res) => {
  const activeOnly = req.query.active_only !== 'false'
  const faqs = await faqService.list({ activeOnly })
  return res.json(toSnakeCase(faqs))
})

const getById = asyncHandler(async (req, res) => {
  const faq = await faqService.getById(req.params.id)
  return res.json(toSnakeCase(faq))
})

const create = asyncHandler(async (req, res) => {
  const payload = toCamelCase(req.body)
  const faq = await faqService.create(payload)
  return res.status(HTTP_STATUS.CREATED).json(toSnakeCase(faq))
})

const update = asyncHandler(async (req, res) => {
  const payload = toCamelCase(req.body)
  const faq = await faqService.update(req.params.id, payload)
  return res.json(toSnakeCase(faq))
})

const remove = asyncHandler(async (req, res) => {
  await faqService.remove(req.params.id)
  return res.status(HTTP_STATUS.NO_CONTENT).send()
})

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
}


