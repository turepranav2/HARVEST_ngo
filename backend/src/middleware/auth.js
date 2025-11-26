const jwt = require('jsonwebtoken')

const HTTP_STATUS = require('../constants/httpStatus')
const config = require('../config/env')
const ApiError = require('../utils/apiError')

const auth = (req, res, next) => {
  const header = req.headers.authorization || ''
  const [, token] = header.split(' ')

  if (!token) {
    return next(new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Authentication required'))
  }

  try {
    const payload = jwt.verify(token, config.jwt.secret)
    req.user = payload
    return next()
  } catch (error) {
    return next(new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid or expired token'))
  }
}

module.exports = auth


