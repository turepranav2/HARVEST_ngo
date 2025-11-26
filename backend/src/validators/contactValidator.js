const { body } = require('express-validator')

const infoRules = [
  body('email').isEmail(),
  body('phone').isString().trim().notEmpty(),
  body('address').isString().trim().notEmpty(),
  body('facebook_url').optional().isString(),
  body('instagram_url').optional().isString(),
  body('twitter_url').optional().isString(),
  body('is_active').optional().isBoolean(),
]

const messageRules = [
  body('name').isString().trim().notEmpty(),
  body('email').isEmail(),
  body('subject').optional().isString(),
  body('message').isString().trim().notEmpty(),
]

module.exports = {
  infoRules,
  messageRules,
}


