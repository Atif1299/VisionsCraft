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
const helmet = require('helmet')
const compression = require('compression')

const app = express()

// Use compression to gzip responses
app.use(compression())

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
          "'unsafe-eval'",
        ],
        styleSrc: [
          "'self'",
          'https://cdn.jsdelivr.net',
          'https://cdnjs.cloudflare.com',
          'https://fonts.googleapis.com',
          'https://kit.fontawesome.com',
          'https://ka-f.fontawesome.com',
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
        mediaSrc: ["'self'"],
        fontSrc: [
          "'self'",
          'https://cdnjs.cloudflare.com',
          'https://fonts.gstatic.com',
          'https://kit.fontawesome.com',
          'data:',
          'https://ka-f.fontawesome.com',
        ],
        connectSrc: [
          "'self'",
          'https://api.cloudinary.com',
          'https://maps.googleapis.com',
          'https://cdn.jsdelivr.net', // Allow source maps
          'https://ka-f.fontawesome.com',
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

// Serve static files with optimized caching per asset type
// CSS - Disable cache temporarily
app.use(
  '/css',
  express.static(path.join(__dirname, 'public/css'), {
    maxAge: '0',
    immutable: false,
  })
)

// JS - Disable cache temporarily
app.use(
  '/js',
  express.static(path.join(__dirname, 'public/js'), {
    maxAge: '0',
    immutable: false,
  })
)

// Dist - Disable cache temporarily
app.use(
  '/dist',
  express.static(path.join(__dirname, 'public/dist'), {
    maxAge: '0',
    immutable: false,
  })
)

// Images - 30 days with immutable flag
app.use(
  '/images',
  express.static(path.join(__dirname, 'public/images'), {
    maxAge: '30d',
    immutable: true,
    setHeaders: (res, path) => {
      res.setHeader('Cache-Control', 'public, max-age=2592000, immutable')
    },
  })
)

// Fonts - 365 days (rarely change)
app.use(
  '/fonts',
  express.static(path.join(__dirname, 'public/fonts'), {
    maxAge: '365d',
    immutable: true,
    setHeaders: (res, path) => {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
    },
  })
)

// Everything else - 1 day (fallback)
app.use(
  express.static(path.join(__dirname, 'public'), {
    maxAge: '1d',
  })
)

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

const server = app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is running on port ${process.env.PORT || 8080}`)
})

// For Vercel deployment
if (process.env.NODE_ENV !== 'production') {
  // Increase server timeout for file uploads (2 minutes) - only in development
  server.timeout = 120000 // 120 seconds
  server.keepAliveTimeout = 120000 // 120 seconds
  server.headersTimeout = 120000 // 120 seconds
}
