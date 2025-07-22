require('dotenv').config() // Load environment variables at the very top
const express = require('express')
const path = require('path')
const connectDB = require('./config/db')
const mainRoutes = require('./routes/mainRoutes')
const apiRoutes = require('./routes/api')
const contactRoutes = require('./routes/contactRoutes')
const showcaseRoutes = require('./routes/showcaseRoutes')
const blogRoutes = require('./routes/blogRoutes')
const bookingRoutes = require('./routes/bookingRoutes') // Import booking routes
const helmet = require('helmet') // Import helmet

const app = express()

// Use Helmet to set security headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          'https://cdn.jsdelivr.net',
          'https://cdnjs.cloudflare.com',
          'https://kit.fontawesome.com',
          'https://maps.googleapis.com',
          'https://maps.gstatic.com',
          "'unsafe-inline'",
        ],
        styleSrc: [
          "'self'",
          'https://cdn.jsdelivr.net',
          'https://cdnjs.cloudflare.com',
          'https://fonts.googleapis.com',
          'https://kit.fontawesome.com',
          'https://maps.googleapis.com',
          "'unsafe-inline'",
        ],
        imgSrc: [
          "'self'",
          'data:',
          'https://res.cloudinary.com',
          'https://*.cloudinary.com',
          'https://maps.googleapis.com',
          'https://maps.gstatic.com',
          'https://*.googleapis.com',
          'https://*.gstatic.com',
        ],
        fontSrc: [
          "'self'",
          'https://cdnjs.cloudflare.com',
          'https://fonts.gstatic.com',
          'https://kit.fontawesome.com',
          'data:',
        ],
        connectSrc: [
          "'self'",
          'https://api.cloudinary.com',
          'https://maps.googleapis.com',
        ],
        frameSrc: ["'self'", 'https://www.google.com'],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
  })
)

// Connect to MongoDB
connectDB()

// Set EJS as the view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Middleware with file size limits
app.use(express.json({ limit: '10mb' })) // JSON payload limit
app.use(express.urlencoded({ extended: true, limit: '10mb' })) // Form data limit
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', mainRoutes)
app.use('/api', apiRoutes)
app.use('/contact', contactRoutes)
app.use('/showcase', showcaseRoutes)
app.use('/blog', blogRoutes)
app.use('/api', bookingRoutes) // Mount booking routes under /api

// Temporary route to get all services for debugging
app.get('/get-services', async (req, res) => {
  const Service = require('./models/Service')
  try {
    const services = await Service.find()
    res.json(services)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`)
})

// For Vercel deployment
if (process.env.NODE_ENV !== 'production') {
  // Increase server timeout for file uploads (2 minutes) - only in development
  server.timeout = 120000 // 120 seconds
  server.keepAliveTimeout = 120000 // 120 seconds
  server.headersTimeout = 120000 // 120 seconds
}

// Export the app for Vercel
module.exports = app
