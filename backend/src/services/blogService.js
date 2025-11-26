const prisma = require('../lib/prisma')
const ApiError = require('../utils/apiError')
const HTTP_STATUS = require('../constants/httpStatus')

const list = async ({ publishedOnly = true } = {}) =>
  prisma.blogPost.findMany({
    where: publishedOnly ? { isPublished: true } : {},
    include: { images: true, author: true },
    orderBy: [{ createdAt: 'desc' }],
  })

const getById = async (id) => {
  const blog = await prisma.blogPost.findUnique({
    where: { id: Number(id) },
    include: { images: true, author: true },
  })
  if (!blog) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Blog post not found')
  }
  return blog
}

const create = async (data) =>
  prisma.blogPost.create({
    data,
    include: { images: true },
  })

const update = async (id, data) =>
  prisma.blogPost.update({
    where: { id: Number(id) },
    data,
    include: { images: true },
  })

const remove = async (id) => {
  await getById(id)
  await prisma.blogPost.delete({ where: { id: Number(id) } })
}

const addImage = async (blogId, data) =>
  prisma.blogImage.create({
    data: {
      blogId: Number(blogId),
      ...data,
    },
  })

const deleteImage = async (imageId) => {
  await prisma.blogImage.delete({
    where: { id: Number(imageId) },
  })
}

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
  addImage,
  deleteImage,
}


