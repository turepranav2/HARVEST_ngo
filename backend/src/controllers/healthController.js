const prisma = require('../lib/prisma')

const getStatus = async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`
    return res.json({
      status: 'ok',
      database: 'connected',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return res.status(503).json({
      status: 'degraded',
      database: 'disconnected',
      detail: error.message,
    })
  }
}

module.exports = {
  getStatus,
}


