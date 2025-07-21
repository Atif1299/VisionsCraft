require('dotenv').config()
const express = require('express')
const connectDB = require('./config/db')
const bookingRoutes = require('./routes/bookingRoutes')

const app = express()

// Basic middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Connect to database
connectDB()

// Test routes
app.use('/api', bookingRoutes)

// Simple test endpoint
app.get('/test', (req, res) => {
  res.json({ message: 'Server is working!' })
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Test server running on http://localhost:${PORT}`)
  console.log('Test endpoints:')
  console.log('  GET /test - Basic server test')
  console.log('  GET /api/services - Get all services')
  console.log('  POST /api/bookings - Create booking')
})
