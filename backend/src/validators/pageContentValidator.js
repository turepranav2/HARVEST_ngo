const { body } = require('express-validator')

const baseRules = [
  body('page').isString().trim().notEmpty(),
  body('section').isString().trim().notEmpty(),
  body('field_name').isString().trim().notEmpty(),
  body('order').optional().toInt(),
  body('is_active').optional().isBoolean(),
]

module.exports = {
  baseRules,
}


