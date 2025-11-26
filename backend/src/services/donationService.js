const prisma = require('../lib/prisma')

const SUCCESS_STATUSES = ['paid', 'success', 'captured', 'completed']

const createTransaction = async (data) =>
  prisma.donationTransaction.create({
    data,
  })

const updateStatusByOrderId = async (orderId, data) =>
  prisma.donationTransaction.update({
    where: { orderId },
    data,
  })

const getByOrderId = async (orderId) =>
  prisma.donationTransaction.findUnique({
    where: { orderId },
  })

const markReceiptSent = async (orderId) =>
  prisma.donationTransaction.update({
    where: { orderId },
    data: { receiptSent: true },
  })

const listRecent = async (limit = 15) =>
  prisma.donationTransaction.findMany({
    orderBy: { createdAt: 'desc' },
    take: limit,
  })

const normalizeAmount = (value) => {
  if (!value) return 0
  if (typeof value === 'number') return value
  if (typeof value === 'string') return Number(value)
  if (value?.toNumber) return value.toNumber()
  return Number(value)
}

const buildTrend = (records, days) => {
  const start = new Date()
  start.setHours(0, 0, 0, 0)
  start.setDate(start.getDate() - (days - 1))

  const summaries = records.reduce((acc, record) => {
    const key = record.createdAt.toISOString().slice(0, 10)
    if (!acc[key]) {
      acc[key] = { totalAmount: 0, successAmount: 0, count: 0, successCount: 0 }
    }
    const bucket = acc[key]
    const amount = normalizeAmount(record.amount)
    bucket.totalAmount += amount
    bucket.count += 1
    if (SUCCESS_STATUSES.includes(record.status?.toLowerCase())) {
      bucket.successAmount += amount
      bucket.successCount += 1
    }
    return acc
  }, {})

  const trend = []
  for (let i = 0; i < days; i += 1) {
    const current = new Date(start)
    current.setDate(start.getDate() + i)
    const key = current.toISOString().slice(0, 10)
    const stats = summaries[key] || {
      totalAmount: 0,
      successAmount: 0,
      count: 0,
      successCount: 0,
    }
    trend.push({
      date: key,
      ...stats,
    })
  }
  return trend
}

const getInsights = async ({ days = 30 } = {}) => {
  const windowStart = new Date()
  windowStart.setHours(0, 0, 0, 0)
  windowStart.setDate(windowStart.getDate() - (days - 1))

  const [overviewAgg, statusBreakdown, recent, windowRecords] = await Promise.all([
    prisma.donationTransaction.aggregate({
      _sum: { amount: true },
      _count: true,
    }),
    prisma.donationTransaction.groupBy({
      by: ['status'],
      _sum: { amount: true },
      _count: { _all: true },
    }),
    listRecent(15),
    prisma.donationTransaction.findMany({
      where: {
        createdAt: {
          gte: windowStart,
        },
      },
      orderBy: { createdAt: 'asc' },
    }),
  ])

  const statusSummary = statusBreakdown.map((item) => ({
    status: item.status,
    totalAmount: normalizeAmount(item._sum.amount),
    totalCount: item._count._all,
  }))

  const totalAmount = normalizeAmount(overviewAgg._sum.amount)
  const successSummary = statusSummary.filter((item) =>
    SUCCESS_STATUSES.includes(item.status?.toLowerCase())
  )
  const successAmount = successSummary.reduce((sum, item) => sum + item.totalAmount, 0)
  const successCount = successSummary.reduce((sum, item) => sum + item.totalCount, 0)

  const overview = {
    totalAmount,
    totalTransactions: overviewAgg._count,
    successAmount,
    successTransactions: successCount,
    successRate: overviewAgg._count ? (successCount / overviewAgg._count) * 100 : 0,
  }

  return {
    overview,
    statusSummary,
    trend: buildTrend(windowRecords, days),
    recent,
  }
}

module.exports = {
  createTransaction,
  updateStatusByOrderId,
  getByOrderId,
  markReceiptSent,
  listRecent,
  getInsights,
  SUCCESS_STATUSES,
}


