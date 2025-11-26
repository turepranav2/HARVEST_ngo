const { body } = require('express-validator')

const baseRules = [
  body('question').isString().trim().notEmpty(),
  body('answer').isString().trim().notEmpty(),
  body('order').optional().toInt(),
  body('is_active').optional().isBoolean(),
]

module.exports = { baseRules }


