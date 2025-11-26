const { body } = require('express-validator')

const baseRules = [
  body('title').isString().trim().notEmpty(),
  body('excerpt').isString().trim().notEmpty(),
  body('content').optional().isString(),
  body('category').optional().isString(),
  body('published').optional().isBoolean(),
]

const addImageRules = [
  body('blog_post_id').isInt().withMessage('blog_post_id is required'),
  body('alt_text').optional().isString(),
]

module.exports = {
  baseRules,
  addImageRules,
}


