const app = require('./app')
const config = require('./config/env')
const prisma = require('./lib/prisma')

const server = app.listen(config.port, () => {
  console.log(`API server running on port ${config.port}`)
})

const shutdown = async () => {
  console.log('Shutting down server...')
  await prisma.$disconnect()
  server.close(() => {
    process.exit(0)
  })
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)


