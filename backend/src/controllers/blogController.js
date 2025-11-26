const HTTP_STATUS = require('../constants/httpStatus')
const asyncHandler = require('../utils/asyncHandler')
const { toCamelCase, toSnakeCase } = require('../utils/transformers')
const blogService = require('../services/blogService')
const { uploadImage } = require('../services/cloudinaryService')

const list = asyncHandler(async (req, res) => {
  const publishedOnly = req.query.published_only !== 'false'
  const blogs = await blogService.list({ publishedOnly })
  return res.json(toSnakeCase(blogs))
})

const getById = asyncHandler(async (req, res) => {
  const blog = await blogService.getById(req.params.id)
  return res.json(toSnakeCase(blog))
})

const create = asyncHandler(async (req, res) => {
  const payload = toCamelCase(req.body)
  const blog = await blogService.create({
    ...payload,
    publishedAt: payload.published ? new Date() : null,
  })
  return res.status(HTTP_STATUS.CREATED).json(toSnakeCase(blog))
})

const update = asyncHandler(async (req, res) => {
  const payload = toCamelCase(req.body)
  const blog = await blogService.update(req.params.id, {
    ...payload,
    publishedAt: payload.published ? payload.publishedAt || new Date() : null,
  })
  return res.json(toSnakeCase(blog))
})

const remove = asyncHandler(async (req, res) => {
  await blogService.remove(req.params.id)
  return res.status(HTTP_STATUS.NO_CONTENT).send()
})

const uploadMainImage = asyncHandler(async (req, res) => {
  const result = await uploadImage(req.file, {
    folder: 'harvest/blogs',
  })
  const blog = await blogService.update(req.params.id, {
    image: result.url,
  })
  return res.json(
    toSnakeCase({
      ...blog,
      image_metadata: {
        public_id: result.publicId,
        width: result.width,
        height: result.height,
      },
    })
  )
})

const addBlogImage = asyncHandler(async (req, res) => {
  const { alt_text: altText, blog_post_id: blogPostId } = req.body
  const result = await uploadImage(req.file, {
    folder: 'harvest/blogs/gallery',
  })

  const image = await blogService.addImage(blogPostId, {
    imageUrl: result.url,
    altText,
  })

  return res.status(HTTP_STATUS.CREATED).json(
    toSnakeCase({
      ...image,
      image_metadata: {
        public_id: result.publicId,
      },
    })
  )
})

const deleteBlogImage = asyncHandler(async (req, res) => {
  await blogService.deleteImage(req.params.imageId)
  return res.status(HTTP_STATUS.NO_CONTENT).send()
})

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
  uploadMainImage,
  addBlogImage,
  deleteBlogImage,
}


