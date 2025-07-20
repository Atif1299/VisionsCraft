const express = require('express')
const router = express.Router()
const Service = require('../models/Service')
const Booking = require('../models/Booking')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads/documents')
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir)
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    )
  },
})

const upload = multer({ storage: storage })

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

// POST a new booking
router.post('/bookings', upload.single('document'), async (req, res) => {
  const {
    serviceId,
    clientName,
    clientEmail,
    clientPhone,
    preferredDate,
    preferredTime,
    message,
  } = req.body

  const documentPath = req.file
    ? `/uploads/documents/${req.file.filename}`
    : undefined

  try {
    const service = await Service.findById(serviceId)
    if (!service) {
      return res.status(404).json({ message: 'Service not found' })
    }

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
    res.status(201).json(savedBooking)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// GET all bookings (for admin/testing purposes, later secure this)
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('service')
    res.json(bookings)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
