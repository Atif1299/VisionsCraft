const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  duration: {
    type: String, // e.g., "1 hour", "30 minutes", "Custom"
    required: true,
  },
  availability: {
    type: [String], // e.g., ["Monday", "Wednesday", "Friday"] or ["9 AM - 5 PM"]
    default: [],
  },
  isCustomizable: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Service', serviceSchema)
