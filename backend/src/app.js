const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')

const config = require('./config/env')
const routes = require('./routes')
const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/errorHandler')

const app = express()

const corsOptions = {
  origin(origin, callback) {
    if (!origin || config.corsOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}

app.set('trust proxy', 1)
app.use(helmet())
app.use(cors(corsOptions))
app.use(morgan(config.nodeEnv === 'production' ? 'combined' : 'dev'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compression())
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 1000,
  })
)

app.use('/api', routes)
app.use(notFound)
app.use(errorHandler)

module.exports = app


