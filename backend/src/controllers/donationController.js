const HTTP_STATUS = require('../constants/httpStatus')
const asyncHandler = require('../utils/asyncHandler')
const { toCamelCase, toSnakeCase } = require('../utils/transformers')
const cashfreeService = require('../services/cashfreeService')
const donationService = require('../services/donationService')
const { sendDonationReceipt } = require('../services/emailService')

const createOrder = asyncHandler(async (req, res) => {
  const payload = toCamelCase(req.body)
  const amount = Number(payload.amount)

  const customer = {
    customer_id: payload.customerId || payload.email,
    customer_name: payload.customerName,
    customer_email: payload.customerEmail,
    customer_phone: payload.customerPhone,
  }

  const order = await cashfreeService.createOrder({
    amount,
    currency: payload.currency || 'INR',
    customer,
  })

  await donationService.createTransaction({
    orderId: order.orderId,
    cashfreeOrderId: order.cashfreeOrderId,
    amount,
    currency: payload.currency || 'INR',
    status: 'pending',
    customerName: payload.customerName,
    customerEmail: payload.customerEmail,
    paymentLink: order.paymentLink,
    meta: order.meta,
  })

  return res.status(HTTP_STATUS.CREATED).json(
    toSnakeCase({
      order_id: order.orderId,
      payment_link: order.paymentLink,
    })
  )
})

const getOrder = asyncHandler(async (req, res) => {
  const transaction = await donationService.getByOrderId(req.params.orderId)
  if (!transaction) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({ detail: 'Order not found' })
  }
  return res.json(toSnakeCase(transaction))
})

const handleWebhook = asyncHandler(async (req, res) => {
  const event = req.body
  if (!event?.data?.order?.order_id) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ detail: 'Invalid payload' })
  }

  const orderId = event.data.order.order_id
  const status = event.data.order.order_status?.toLowerCase() || 'unknown'

  const existing = await donationService.getByOrderId(orderId)
  if (!existing) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({ detail: 'Order not found' })
  }

  const updated = await donationService.updateStatusByOrderId(orderId, {
    status,
    meta: event,
  })

  if (
    donationService.SUCCESS_STATUSES.includes(status) &&
    !existing.receiptSent
  ) {
    try {
      await sendDonationReceipt({
        to: updated.customerEmail,
        name: updated.customerName,
        amount: updated.amount,
        currency: updated.currency,
        orderId: updated.orderId,
        paidAt: updated.updatedAt,
      })
      await donationService.markReceiptSent(orderId)
    } catch (error) {
      console.error('Failed to send donation receipt email', error)
    }
  }

  return res.status(HTTP_STATUS.OK).json({ received: true })
})

const getInsights = asyncHandler(async (req, res) => {
  const requestedDays = Number(req.query.days) || 30
  const days = Math.min(Math.max(requestedDays, 7), 90)
  const insights = await donationService.getInsights({ days })
  return res.json(toSnakeCase(insights))
})

module.exports = {
  createOrder,
  getOrder,
  handleWebhook,
  getInsights,
}


