const multer = require('multer')
const GridFSBucket = require('mongodb').GridFSBucket
const mongoose = require('mongoose')
const path = require('path')

// GridFS storage configuration
const storage = multer.memoryStorage() // Store in memory temporarily

// Create GridFS bucket
let bucket
mongoose.connection.on('connected', () => {
  bucket = new GridFSBucket(mongoose.connection.db, {
    bucketName: 'bookingDocuments',
  })
  console.log('📁 GridFS bucket initialized for document storage')
})

// File upload helper function
const uploadToGridFS = (file) => {
  return new Promise((resolve, reject) => {
    if (!bucket) {
      return reject(new Error('GridFS bucket not initialized'))
    }

    const filename = `${Date.now()}_${file.originalname}`
    const uploadStream = bucket.openUploadStream(filename, {
      metadata: {
        originalName: file.originalname,
        uploadDate: new Date(),
        contentType: file.mimetype,
      },
    })

    uploadStream.on('error', reject)
    uploadStream.on('finish', () => {
      resolve({
        fileId: uploadStream.id,
        filename: filename,
        originalName: file.originalname,
      })
    })

    uploadStream.end(file.buffer)
  })
}

// File download helper function
const downloadFromGridFS = (fileId, res) => {
  return new Promise((resolve, reject) => {
    if (!bucket) {
      return reject(new Error('GridFS bucket not initialized'))
    }

    const downloadStream = bucket.openDownloadStream(
      new mongoose.Types.ObjectId(fileId)
    )

    downloadStream.on('error', reject)
    downloadStream.on('file', (file) => {
      res.set({
        'Content-Type': file.metadata.contentType,
        'Content-Disposition': `attachment; filename="${file.metadata.originalName}"`,
      })
    })

    downloadStream.pipe(res)
    downloadStream.on('end', resolve)
  })
}

module.exports = {
  storage,
  uploadToGridFS,
  downloadFromGridFS,
}
