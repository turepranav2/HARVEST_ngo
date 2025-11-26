const HTTP_STATUS = require('../constants/httpStatus')
const asyncHandler = require('../utils/asyncHandler')
const { toCamelCase, toSnakeCase } = require('../utils/transformers')
const contactService = require('../services/contactService')

const getInfo = asyncHandler(async (req, res) => {
  const info = await contactService.getContactInfo()
  if (!info) {
    return res.json(null)
  }
  return res.json(toSnakeCase(info))
})

const upsertInfo = asyncHandler(async (req, res) => {
  const payload = toCamelCase(req.body)
  const info = await contactService.upsertContactInfo(payload, req.params.id)
  const status = req.method === 'POST' ? HTTP_STATUS.CREATED : HTTP_STATUS.OK
  return res.status(status).json(toSnakeCase(info))
})

const createMessage = asyncHandler(async (req, res) => {
  const payload = toCamelCase(req.body)
  const message = await contactService.createMessage(payload)
  return res.status(HTTP_STATUS.CREATED).json(toSnakeCase(message))
})

const listMessages = asyncHandler(async (req, res) => {
  const messages = await contactService.listMessages()
  return res.json(toSnakeCase(messages))
})

const markRead = asyncHandler(async (req, res) => {
  const message = await contactService.markMessageRead(req.params.id)
  return res.json(toSnakeCase(message))
})

module.exports = {
  getInfo,
  upsertInfo,
  createMessage,
  listMessages,
  markRead,
}


