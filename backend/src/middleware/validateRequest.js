const { validationResult } = require('express-validator')
const HTTP_STATUS = require('../constants/httpStatus')

const validateRequest = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({
      detail: 'Validation failed',
      errors: errors.array().map((error) => ({
        field: error.param,
        message: error.msg,
      })),
    })
  }
  return next()
}

module.exports = validateRequest


