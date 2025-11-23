const express = require('express')
const router = express.Router()
const Project = require('../models/Project')

router.get('/projects', async (req, res) => {
  try {
    console.log('📊 API: Fetching all projects...')
    
    // Add timeout to prevent hanging
    const projects = await Promise.race([
      Project.find().lean().exec(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Database timeout')), 10000)
      )
    ])
    
    console.log(`✅ API: Found ${projects.length} projects`)
    res.json(projects || [])
  } catch (err) {
    console.error('❌ API: Error fetching projects:', err.message)
    res.status(500).json({ 
      message: err.message,
      error: 'Failed to fetch projects. Please try again later.'
    })
  }
})

router.get('/projects/:id', async (req, res) => {
  try {
    console.log(`📊 API: Fetching project ${req.params.id}...`)
    
    // Add timeout to prevent hanging
    const project = await Promise.race([
      Project.findById(req.params.id).lean().exec(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Database timeout')), 10000)
      )
    ])
    
    if (!project) {
      console.log('❌ API: Project not found')
      return res.status(404).json({ message: 'Project not found' })
    }
    
    console.log(`✅ API: Found project: ${project.title}`)
    res.json(project)
  } catch (err) {
    console.error('❌ API: Error fetching project:', err.message)
    res.status(500).json({ 
      message: err.message,
      error: 'Failed to fetch project details. Please try again later.'
    })
  }
})

router.post('/projects', async (req, res) => {
  const project = new Project({
    title: req.body.title,
    shortDescription: req.body.shortDescription,
    fullDescription: req.body.fullDescription,
    industry: req.body.industry,
    category: req.body.category,
    mainImage: req.body.mainImage,
    techStack: req.body.techStack,
    implementation: req.body.implementation,
    results: req.body.results,
    carouselImages: req.body.carouselImages,
    carouselVideos: req.body.carouselVideos,
    githubLink: req.body.githubLink,
  })
  try {
    const newProject = await project.save()
    res.status(201).json(newProject)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

module.exports = router
