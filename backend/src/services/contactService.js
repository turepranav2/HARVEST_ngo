const prisma = require('../lib/prisma')
const ApiError = require('../utils/apiError')
const HTTP_STATUS = require('../constants/httpStatus')

const getContactInfo = async () =>
  prisma.contactInfo.findFirst({
    where: { isActive: true },
    orderBy: { updatedAt: 'desc' },
  })

const upsertContactInfo = async (data, id) => {
  if (id) {
    await prisma.contactInfo.findUnique({
      where: { id: Number(id) },
    })
    return prisma.contactInfo.update({
      where: { id: Number(id) },
      data,
    })
  }
  return prisma.contactInfo.create({ data })
}

const createMessage = async (data) =>
  prisma.contactMessage.create({
    data,
  })

const listMessages = async () =>
  prisma.contactMessage.findMany({
    orderBy: [{ createdAt: 'desc' }],
  })

const markMessageRead = async (id) => {
  const message = await prisma.contactMessage.findUnique({
    where: { id: Number(id) },
  })
  if (!message) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Message not found')
  }
  return prisma.contactMessage.update({
    where: { id: Number(id) },
    data: { isRead: true },
  })
}

module.exports = {
  getContactInfo,
  upsertContactInfo,
  createMessage,
  listMessages,
  markMessageRead,
}


