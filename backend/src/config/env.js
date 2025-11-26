const path = require('path')
const dotenv = require('dotenv')

const envPath = path.join(__dirname, '../../.env')
dotenv.config({ path: envPath })

const valueOrUndefined = (value) => (value ? value.trim() : undefined)

const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,
  databaseUrl: process.env.DATABASE_URL,
  jwt: {
    secret: valueOrUndefined(process.env.JWT_SECRET),
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  corsOrigins: (process.env.ALLOWED_ORIGINS ||
    'http://localhost:3000,http://localhost:3001').split(',').map((origin) => origin.trim()).filter(Boolean),
  cloudinary: {
    cloudName: valueOrUndefined(process.env.CLOUDINARY_CLOUD_NAME),
    apiKey: valueOrUndefined(process.env.CLOUDINARY_API_KEY),
    apiSecret: valueOrUndefined(process.env.CLOUDINARY_API_SECRET),
  },
  email: {
    enabled: process.env.EMAIL_ENABLED ? process.env.EMAIL_ENABLED === 'true' : true,
    host: valueOrUndefined(process.env.EMAIL_HOST),
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === 'true',
    user: valueOrUndefined(process.env.EMAIL_USER),
    pass: valueOrUndefined(process.env.EMAIL_PASS),
    from: valueOrUndefined(process.env.EMAIL_FROM),
  },
  cashfree: {
    appId: valueOrUndefined(process.env.CASHFREE_APP_ID),
    secretKey: valueOrUndefined(process.env.CASHFREE_SECRET_KEY),
    env: process.env.CASHFREE_ENV || 'sandbox',
    returnUrl: process.env.CASHFREE_RETURN_URL || 'http://localhost:3000/donate/success',
    notifyUrl: process.env.CASHFREE_NOTIFY_URL || '',
  },
}

const requiredKeys = [
  { key: 'databaseUrl', label: 'DATABASE_URL' },
  { key: 'jwt.secret', label: 'JWT_SECRET' },
]

const getNested = (obj, pathStr) =>
  pathStr.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), obj)

requiredKeys.forEach(({ key, label }) => {
  if (!getNested(config, key)) {
    throw new Error(`Missing required environment variable: ${label}`)
  }
})

module.exports = config

