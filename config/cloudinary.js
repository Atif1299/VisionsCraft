const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
require('dotenv').config()

// Check for required Cloudinary environment variables
const requiredCloudinaryVars = [
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET',
]
const missingCloudinaryVars = requiredCloudinaryVars.filter(
  (envVar) => !process.env[envVar]
)

if (missingCloudinaryVars.length > 0) {
  console.error(
    `Missing Cloudinary environment variables: ${missingCloudinaryVars.join(
      ', '
    )}`
  )
  console.error('File upload functionality will not work properly')
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  // Optimize for faster uploads
  timeout: 60000, // 60 seconds timeout
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'visionscraft-bookings',
    resource_type: 'auto', // Auto-detect file type (image, video, raw)
    raw_convert: 'aspose', // For document conversion
    public_id: (req, file) => {
      // Remove file extension from original name to prevent double extensions
      const nameWithoutExtension = file.originalname.replace(/\.[^/.]+$/, '')
      // Replace spaces and special characters with underscores but keep it readable
      const cleanName = nameWithoutExtension
        .replace(/[^a-zA-Z0-9\s]/g, '_')
        .replace(/\s+/g, '_')
      // Add timestamp to make it unique
      return `${cleanName}_${Date.now()}`
    },
    // Don't force format conversion - let Cloudinary handle it naturally
  },
})

module.exports = {
  cloudinary,
  storage,
}
