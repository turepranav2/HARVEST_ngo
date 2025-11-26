const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const prisma = require('../lib/prisma')
const config = require('../config/env')
const ApiError = require('../utils/apiError')
const HTTP_STATUS = require('../constants/httpStatus')

const login = async (usernameOrEmail, password) => {
  const admin = await prisma.adminUser.findFirst({
    where: {
      OR: [{ email: usernameOrEmail }, { name: usernameOrEmail }],
      isActive: true,
    },
  })

  if (!admin) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid credentials')
  }

  const passwordMatches = await bcrypt.compare(password, admin.passwordHash)

  if (!passwordMatches) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid credentials')
  }

  const token = jwt.sign(
    {
      userId: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn }
  )

  return {
    token,
    user: {
      user_id: admin.id,
      username: admin.email,
      name: admin.name,
      role: admin.role,
      is_staff: true,
    },
  }
}

module.exports = {
  login,
}


