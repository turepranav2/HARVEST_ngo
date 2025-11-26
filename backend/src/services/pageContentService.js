const prisma = require('../lib/prisma')
const ApiError = require('../utils/apiError')
const HTTP_STATUS = require('../constants/httpStatus')

const list = async (filters = {}) => {
  const { page, section, activeOnly = true } = filters

  return prisma.pageContent.findMany({
    where: {
      ...(page && { page }),
      ...(section && { section }),
      ...(activeOnly ? { isActive: true } : {}),
    },
    orderBy: [
      { page: 'asc' },
      { section: 'asc' },
      { order: 'asc' },
      { id: 'asc' },
    ],
  })
}

const getById = async (id) => {
  const content = await prisma.pageContent.findUnique({
    where: { id: Number(id) },
  })

  if (!content) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Page content not found')
  }
  return content
}

const create = async (data) => prisma.pageContent.create({ data })

const update = async (id, data) => {
  await getById(id)
  return prisma.pageContent.update({
    where: { id: Number(id) },
    data,
  })
}

const remove = async (id) => {
  await getById(id)
  await prisma.pageContent.delete({
    where: { id: Number(id) },
  })
}

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
}


