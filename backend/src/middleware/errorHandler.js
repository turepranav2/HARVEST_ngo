const HTTP_STATUS = require('../constants/httpStatus')

const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR
  const response = {
    detail: err.message || 'Something went wrong',
  }

  if (err.details) {
    response.details = err.details
  }

  if (process.env.NODE_ENV !== 'production' && err.stack) {
    response.stack = err.stack
  }

  return res.status(status).json(response)
}

module.exports = errorHandler


