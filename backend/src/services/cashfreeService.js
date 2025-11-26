const axios = require('axios')
const { v4: uuid } = require('uuid')
const config = require('../config/env')
const ApiError = require('../utils/apiError')
const HTTP_STATUS = require('../constants/httpStatus')

const getBaseUrl = () =>
  config.cashfree.env === 'production'
    ? 'https://api.cashfree.com/pg'
    : 'https://sandbox.cashfree.com/pg'

const createOrder = async ({ amount, currency = 'INR', customer }) => {
  if (!config.cashfree.appId || !config.cashfree.secretKey) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      'Cashfree credentials missing. Set CASHFREE_APP_ID and CASHFREE_SECRET_KEY.'
    )
  }

  const orderId = uuid()
  const response = await axios.post(
    `${getBaseUrl()}/orders`,
    {
      order_id: orderId,
      order_amount: amount,
      order_currency: currency,
      customer_details: customer,
      order_note: 'HĀRVÉST Donation',
      order_meta: {
        return_url: config.cashfree.returnUrl.replace('{order_id}', orderId),
        notify_url: config.cashfree.notifyUrl,
      },
    },
    {
      headers: {
        'x-client-id': config.cashfree.appId,
        'x-client-secret': config.cashfree.secretKey,
        'x-api-version': '2022-09-01',
        'content-type': 'application/json',
      },
    }
  )

  return {
    orderId,
    cashfreeOrderId: response.data.cf_order_id,
    paymentLink: response.data.payment_link,
    meta: response.data,
  }
}

module.exports = {
  createOrder,
}


