const express = require('express')
const router = express.Router()

// Import individual route modules
const contactRoutes = require('./contactRoutes')
const showcaseRoutes = require('./showcaseRoutes')
const blogRoutes = require('./blogRoutes')

// Mount the routers
router.get('/', (req, res) => {
  res.render('index', {
    title: 'VisionsCraft - AI Solutions Provider',
    currentPage: 'home',
    description:
      'Leading AI solutions provider transforming businesses through innovative artificial intelligence technologies.',
  })
})

router.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Us - VisionsCraft',
    currentPage: 'about',
    description:
      'Learn about VisionsCraft, a leading AI solutions agency founded by passionate experts dedicated to transforming businesses through innovative AI technologies.',
  })
})

router.get('/services', (req, res) => {
  res.render('services', {
    title: 'Our Services - VisionsCraft',
    currentPage: 'services',
    description:
      'Explore our comprehensive AI services including machine learning, predictive analytics, conversational AI, and computer vision solutions.',
  })
})

// Use the modularized routes
router.use('/contact', contactRoutes)
router.use('/showcase', showcaseRoutes)
router.use('/blog', blogRoutes)

router.get('/blog-post', (req, res) => {
  res.render('blog-post', {
    title: 'Blog Post - VisionsCraft',
    currentPage: 'blog',
    description: 'A blog post from VisionsCraft.',
  })
})

module.exports = router
