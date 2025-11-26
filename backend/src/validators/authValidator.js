const { body } = require('express-validator')

const loginRules = [
  body('username').isString().trim().notEmpty().withMessage('username is required'),
  body('password').isString().trim().isLength({ min: 6 }).withMessage('password is required'),
]

module.exports = {
  loginRules,
}


