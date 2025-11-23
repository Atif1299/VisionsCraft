const express = require('express')
const router = express.Router()
const Project = require('../models/Project')

// GET /showcase
router.get('/', async (req, res) => {
  try {
    console.log('📊 Fetching projects for showcase page...')
    
    // Add timeout to prevent hanging
    const projects = await Promise.race([
      Project.find().lean().exec(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Database timeout')), 10000)
      )
    ])
    
    console.log(`✅ Found ${projects.length} projects`)
    
    res.render('showcase', {
      title: 'Showcase - VisionsCraft',
      currentPage: 'showcase',
      description:
        'Discover our portfolio of successful AI projects and case studies that demonstrate our expertise in delivering transformative solutions.',
      projects: projects || [],
    })
  } catch (err) {
    console.error('❌ Error fetching projects for showcase:', err.message)
    
    // Fallback: Render with empty projects array instead of error page
    res.render('showcase', {
      title: 'Showcase - VisionsCraft',
      currentPage: 'showcase',
      description:
        'Discover our portfolio of successful AI projects and case studies that demonstrate our expertise in delivering transformative solutions.',
      projects: [],
      error: 'Unable to load projects at this time. Please try again later.'
    })
  }
})

module.exports = router
