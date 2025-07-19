const express = require('express')
const router = express.Router()
const Project = require('../models/Project')

// GET /showcase
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find()
    res.render('showcase', {
      title: 'Showcase - VisionsCraft',
      currentPage: 'showcase',
      description:
        'Discover our portfolio of successful AI projects and case studies that demonstrate our expertise in delivering transformative solutions.',
      projects: projects,
    })
  } catch (err) {
    console.error('Error fetching projects for showcase:', err)
    res.status(500).render('error', { message: 'Failed to load projects.' })
  }
})

module.exports = router
