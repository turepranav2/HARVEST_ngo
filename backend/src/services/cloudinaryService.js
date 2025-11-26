const streamifier = require('streamifier')
const cloudinary = require('../lib/cloudinary')
const ApiError = require('../utils/apiError')
const HTTP_STATUS = require('../constants/httpStatus')

const ensureConfigured = () => {
  if (!cloudinary.config()?.cloud_name) {
    throw new ApiError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      'Cloudinary is not configured. Please set CLOUDINARY credentials.'
    )
  }
}

const uploadBuffer = (buffer, options = {}) =>
  new Promise((resolve, reject) => {
    ensureConfigured()
    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) {
        return reject(error)
      }
      return resolve(result)
    })
    streamifier.createReadStream(buffer).pipe(stream)
  })

const uploadImage = async (file, options = {}) => {
  if (!file) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'File is required')
  }
  const result = await uploadBuffer(file.buffer, {
    resource_type: 'image',
    folder: options.folder || 'harvest',
    public_id: options.publicId,
    overwrite: true,
  })

  return {
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
  }
}

module.exports = {
  uploadImage,
}


