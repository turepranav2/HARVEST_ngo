const { body } = require('express-validator')

const createOrderRules = [
  body('amount').isFloat({ gt: 0 }).withMessage('amount must be greater than 0'),
  body('currency').optional().isString(),
  body('customer_name').isString().trim().notEmpty(),
  body('customer_email').isEmail(),
  body('customer_phone').isString().trim().notEmpty(),
]

module.exports = { createOrderRules }


