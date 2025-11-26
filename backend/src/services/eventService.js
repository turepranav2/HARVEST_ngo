const prisma = require('../lib/prisma')
const ApiError = require('../utils/apiError')
const HTTP_STATUS = require('../constants/httpStatus')

const list = async ({ activeOnly = true } = {}) =>
  prisma.event.findMany({
    where: activeOnly ? { isActive: true } : undefined,
    orderBy: [{ date: 'asc' }, { id: 'asc' }],
  })

const getById = async (id) => {
  const event = await prisma.event.findUnique({
    where: { id: Number(id) },
  })
  if (!event) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Event not found')
  }
  return event
}

const create = async (data) => prisma.event.create({ data })

const update = async (id, data) => {
  await getById(id)
  return prisma.event.update({
    where: { id: Number(id) },
    data,
  })
}

const remove = async (id) => {
  await getById(id)
  await prisma.event.delete({ where: { id: Number(id) } })
}

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
}


