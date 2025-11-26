const HTTP_STATUS = require('../constants/httpStatus')
const asyncHandler = require('../utils/asyncHandler')
const { toCamelCase, toSnakeCase } = require('../utils/transformers')
const authService = require('../services/authService')

const login = asyncHandler(async (req, res) => {
  const payload = toCamelCase(req.body)
  const { username, password } = payload

  const result = await authService.login(username, password)
  return res.status(HTTP_STATUS.OK).json({
    token: result.token,
    ...toSnakeCase(result.user),
  })
})

module.exports = {
  login,
}


