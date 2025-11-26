const { body } = require('express-validator')

const baseRules = [
  body('title').isString().trim().notEmpty(),
  body('description').isString().trim().notEmpty(),
  body('date').isISO8601().withMessage('date must be ISO8601 date'),
  body('location').isString().trim().notEmpty(),
  body('is_featured').optional().isBoolean(),
  body('is_active').optional().isBoolean(),
]

module.exports = {
  baseRules,
}


