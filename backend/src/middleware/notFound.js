const HTTP_STATUS = require('../constants/httpStatus')

const notFound = (req, res, next) => {
  res.status(HTTP_STATUS.NOT_FOUND).json({
    detail: `Route ${req.originalUrl} not found`,
  })
}

module.exports = notFound


