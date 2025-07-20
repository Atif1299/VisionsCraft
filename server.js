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
        scriptSrc: ["'self'", 'https://cdn.jsdelivr.net', "'unsafe-inline'"],
        styleSrc: [
          "'self'",
          'https://cdn.jsdelivr.net',
          'https://cdnjs.cloudflare.com',
          'https://fonts.googleapis.com',
          "'unsafe-inline'",
        ],
        imgSrc: ["'self'", 'data:'],
        fontSrc: [
          "'self'",
          'https://cdnjs.cloudflare.com',
          'https://fonts.gstatic.com',
          'data:',
        ],
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

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', mainRoutes)
app.use('/api', apiRoutes)
app.use('/contact', contactRoutes)
app.use('/showcase', showcaseRoutes)
app.use('/blog', blogRoutes)
app.use('/api', bookingRoutes) // Mount booking routes under /api

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
