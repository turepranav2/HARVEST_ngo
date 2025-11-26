const { body } = require('express-validator')

const baseRules = [
  body('title').isString().trim().notEmpty(),
  body('description').optional().isString(),
  body('category').optional().isString(),
  body('is_featured').optional().isBoolean(),
  body('is_active').optional().isBoolean(),
]

module.exports = { baseRules }


