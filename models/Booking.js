const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
  },
  clientName: {
    type: String,
    required: true,
    trim: true,
  },
  clientEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/.+@.+\..+/, 'Please fill a valid email address'],
  },
  clientPhone: {
    type: String,
    trim: true,
  },
  preferredDate: {
    type: Date,
    required: true,
  },
  preferredTime: {
    type: String, // e.g., "10:00 AM", "2:30 PM"
    required: true,
  },
  message: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Booking', bookingSchema)
