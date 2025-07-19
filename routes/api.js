const express = require('express')
const router = express.Router()
const Project = require('../models/Project')

router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find()
    res.json(projects)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
    if (!project) return res.status(404).json({ message: 'Project not found' })
    res.json(project)
  } catch (err) {
    res.status(500).json({ message: err.message })
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
