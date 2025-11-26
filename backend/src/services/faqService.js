const prisma = require('../lib/prisma')
const ApiError = require('../utils/apiError')
const HTTP_STATUS = require('../constants/httpStatus')

const list = async ({ activeOnly = true } = {}) =>
  prisma.fAQ.findMany({
    where: activeOnly ? { isActive: true } : {},
    orderBy: [{ order: 'asc' }, { id: 'asc' }],
  })

const getById = async (id) => {
  const faq = await prisma.fAQ.findUnique({
    where: { id: Number(id) },
  })
  if (!faq) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'FAQ not found')
  }
  return faq
}

const create = async (data) => prisma.fAQ.create({ data })

const update = async (id, data) => {
  await getById(id)
  return prisma.fAQ.update({
    where: { id: Number(id) },
    data,
  })
}

const remove = async (id) => {
  await getById(id)
  await prisma.fAQ.delete({ where: { id: Number(id) } })
}

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
}


