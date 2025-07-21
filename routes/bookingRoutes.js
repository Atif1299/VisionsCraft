const express = require('express')
const router = express.Router()
const Service = require('../models/Service')
const Booking = require('../models/Booking')
const { sendBookingConfirmation } = require('../config/mailer')
const multer = require('multer')
const {
  storage,
  uploadToGridFS,
  downloadFromGridFS,
} = require('../config/gridfs')

// Configure multer with file size limit (10MB)
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB in bytes
  },
  fileFilter: (req, file, cb) => {
    // Optional: Add file type restrictions
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'text/csv',
      'application/zip',
      'application/x-zip-compressed',
    ]

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(
        new Error(
          `File type ${file.mimetype} is not supported. Please upload: images, PDF, Word docs, text files, or ZIP files.`
        ),
        false
      )
    }
  },
})

// GET all services
router.get('/services', async (req, res) => {
  try {
    const services = await Service.find()
    res.json(services)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET a single service by ID
router.get('/services/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
    if (!service) {
      return res.status(404).json({ message: 'Service not found' })
    }
    res.json(service)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// POST a new booking with file upload error handling
router.post('/bookings', (req, res, next) => {
  upload.single('document')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          message: 'File too large! Maximum size allowed is 10MB.',
          error: 'FILE_TOO_LARGE',
        })
      }
      return res.status(400).json({
        message: `File upload error: ${err.message}`,
        error: err.code,
      })
    } else if (err) {
      return res.status(400).json({
        message: err.message,
        error: 'FILE_TYPE_ERROR',
      })
    }

    // Continue with booking creation if no file errors
    handleBookingCreation(req, res)
  })
})

// Separate function to handle booking creation
async function handleBookingCreation(req, res) {
  console.log('📝 Booking request received:', req.body)

  const {
    serviceId,
    clientName,
    clientEmail,
    clientPhone,
    preferredDate,
    preferredTime,
    message,
  } = req.body

  let documentPath = undefined

  // Handle file upload to GridFS if file exists
  if (req.file) {
    try {
      console.log('📁 Uploading file to GridFS:', req.file.originalname)
      const uploadResult = await uploadToGridFS(req.file)
      documentPath = `gridfs/${uploadResult.fileId}`
      console.log('✅ File uploaded to GridFS:', uploadResult.filename)
    } catch (uploadError) {
      console.error('❌ File upload failed:', uploadError.message)
      return res.status(400).json({
        message: 'File upload failed. Please try again.',
        error: uploadError.message,
      })
    }
  }

  console.log('📎 Document path:', documentPath)

  try {
    // Check if service exists
    const service = await Service.findById(serviceId)
    if (!service) {
      console.error('❌ Service not found:', serviceId)
      return res.status(404).json({ message: 'Service not found' })
    }
    console.log('✅ Service found:', service.name)

    const newBooking = new Booking({
      service: serviceId,
      clientName,
      clientEmail,
      clientPhone,
      preferredDate,
      preferredTime,
      message,
      documentPath,
    })

    const savedBooking = await newBooking.save()
    console.log('✅ Booking saved:', savedBooking._id)

    // Populate the service details for the email
    const populatedBooking = await Booking.findById(savedBooking._id).populate(
      'service'
    )

    console.log('Booking saved successfully:', populatedBooking._id)
    console.log('Attempting to send confirmation email...')

    try {
      await sendBookingConfirmation(populatedBooking)
      console.log('✅ Email sent successfully')
      res.status(201).json({
        ...savedBooking.toObject(),
        emailStatus: 'sent',
      })
    } catch (emailError) {
      console.error('❌ Failed to send email:', emailError.message)
      // The booking was saved, but the email failed.
      // Inform the client, but still treat the booking as successful.
      res.status(201).json({
        ...savedBooking.toObject(),
        emailStatus: 'failed',
        emailError: emailError.message,
      })
    }
  } catch (err) {
    console.error('❌ Booking creation error:', err)
    res.status(400).json({
      message: err.message,
      details: err.stack,
    })
  }
}

// GET all bookings (for admin/testing purposes, later secure this)
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('service')
    res.json(bookings)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET document download route
router.get('/documents/:fileId', async (req, res) => {
  try {
    const { fileId } = req.params
    console.log('📥 Document download requested:', fileId)

    await downloadFromGridFS(fileId, res)
    console.log('✅ Document downloaded successfully')
  } catch (err) {
    console.error('❌ Document download failed:', err.message)
    res.status(404).json({ message: 'Document not found' })
  }
})

module.exports = router
