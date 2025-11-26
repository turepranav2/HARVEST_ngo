const prisma = require('../lib/prisma')
const ApiError = require('../utils/apiError')
const HTTP_STATUS = require('../constants/httpStatus')

const list = async ({ activeOnly = true } = {}) =>
  prisma.galleryItem.findMany({
    where: activeOnly ? { isActive: true } : {},
    orderBy: [{ createdAt: 'desc' }],
  })

const getById = async (id) => {
  const item = await prisma.galleryItem.findUnique({
    where: { id: Number(id) },
  })
  if (!item) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Gallery item not found')
  }
  return item
}

const create = async (data) => prisma.galleryItem.create({ data })

const update = async (id, data) => {
  await getById(id)
  return prisma.galleryItem.update({
    where: { id: Number(id) },
    data,
  })
}

const remove = async (id) => {
  await getById(id)
  await prisma.galleryItem.delete({ where: { id: Number(id) } })
}

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
}


