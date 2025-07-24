const express = require('express')
const router = express.Router()

// GET /blog
router.get('/', (req, res) => {
  res.render('blog', {
    title: 'Blog - VisionsCraft',
    currentPage: 'blog',
    description:
      'Read our latest insights, trends, and knowledge from AI experts at VisionsCraft. Stay updated with the latest AI developments.',
  })
})

// GET /blog/agentic-ai
router.get('/agentic-ai', (req, res) => {
  res.render('blog/agentic-ai', {
    title: 'The Rise of Agentic AI - VisionsCraft',
    currentPage: 'blog',
    description:
      'Exploring the capabilities of autonomous AI agents and how they are set to revolutionize business operations and decision-making.',
  })
})

// GET /blog/generative-ai
router.get('/generative-ai', (req, res) => {
  res.render('blog/generative-ai', {
    title: 'Unlocking Creativity with Generative AI - VisionsCraft',
    currentPage: 'blog',
    description:
      'How generative models are transforming content creation, design, and innovation across industries.',
  })
})

// GET /blog/ai-automation
router.get('/ai-automation', (req, res) => {
  res.render('blog/ai-automation', {
    title: 'The Ultimate Guide to AI Automation - VisionsCraft',
    currentPage: 'blog',
    description:
      'A practical guide to implementing AI automation in your business to increase efficiency, reduce costs, and scale operations.',
  })
})

// GET /blog/featured-post
router.get('/featured-post', (req, res) => {
  res.render('blog/featured-post', {
    title: 'Featured Post - VisionsCraft',
    currentPage: 'blog',
    description:
      'Our featured article on the latest advancements and trends in AI technology.',
  })
})

// GET /blog/ai-ethics
router.get('/ai-ethics', (req, res) => {
  res.render('blog/ai-ethics', {
    title: 'Ethical Considerations in AI Development - VisionsCraft',
    currentPage: 'blog',
    description:
      'Exploring the moral implications of artificial intelligence and how to build responsible AI systems.',
  })
})

// GET /blog/machine-learning-future
router.get('/machine-learning-future', (req, res) => {
  res.render('blog/machine-learning-future', {
    title: 'The Future of Machine Learning in Business - VisionsCraft',
    currentPage: 'blog',
    description:
      'How emerging ML technologies are reshaping industries and creating new opportunities for growth.',
  })
})

// GET /blog/ai-implementation
router.get('/ai-implementation', (req, res) => {
  res.render('blog/ai-implementation', {
    title: '5 Steps to Successful AI Implementation - VisionsCraft',
    currentPage: 'blog',
    description:
      'A practical guide to integrating AI solutions into your existing business processes.',
  })
})

module.exports = router
