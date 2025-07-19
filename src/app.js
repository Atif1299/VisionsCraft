const express = require('express')
const path = require('path')
const nodemailer = require('nodemailer')
require('dotenv').config()

const app = express()

// Set EJS as the view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../views'))

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../public')))

// Routes
app.get('/', (req, res) => {
  res.render('index', {
    title: 'VisionsCraft - AI Solutions Provider',
    currentPage: 'home',
    description:
      'Leading AI solutions provider transforming businesses through innovative artificial intelligence technologies.',
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Us - VisionsCraft',
    currentPage: 'about',
    description:
      'Learn about VisionsCraft, a leading AI solutions agency founded by passionate experts dedicated to transforming businesses through innovative AI technologies.',
  })
})

app.get('/services', (req, res) => {
  res.render('services', {
    title: 'Our Services - VisionsCraft',
    currentPage: 'services',
    description:
      'Explore our comprehensive AI services including machine learning, predictive analytics, conversational AI, and computer vision solutions.',
  })
})

app.get('/showcase', (req, res) => {
  res.render('showcase', {
    title: 'Showcase - VisionsCraft',
    currentPage: 'showcase',
    description:
      'Discover our portfolio of successful AI projects and case studies that demonstrate our expertise in delivering transformative solutions.',
  })
})

app.get('/blog', (req, res) => {
  res.render('blog', {
    title: 'Blog - VisionsCraft',
    currentPage: 'blog',
    description:
      'Read our latest insights, trends, and knowledge from AI experts at VisionsCraft. Stay updated with the latest AI developments.',
  })
})

app.get('/blog/agentic-ai', (req, res) => {
  res.render('blog/agentic-ai', {
    title: 'The Rise of Agentic AI - VisionsCraft',
    currentPage: 'blog',
    description:
      'Exploring the capabilities of autonomous AI agents and how they are set to revolutionize business operations and decision-making.',
  })
})

app.get('/blog/generative-ai', (req, res) => {
  res.render('blog/generative-ai', {
    title: 'Unlocking Creativity with Generative AI - VisionsCraft',
    currentPage: 'blog',
    description:
      'How generative models are transforming content creation, design, and innovation across industries.',
  })
})

app.get('/blog/ai-automation', (req, res) => {
  res.render('blog/ai-automation', {
    title: 'The Ultimate Guide to AI Automation - VisionsCraft',
    currentPage: 'blog',
    description:
      'A practical guide to implementing AI automation in your business to increase efficiency, reduce costs, and scale operations.',
  })
})

app.get('/blog-post', (req, res) => {
  res.render('blog-post', {
    title: 'Blog Post - VisionsCraft',
    currentPage: 'blog',
    description: 'A blog post from VisionsCraft.',
  })
})

app.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact Us - VisionsCraft',
    currentPage: 'contact',
    description:
      'Get in touch with VisionsCraft, your partner for innovative AI solutions. Contact our team of experts to discuss your project needs.',
    message: '',
  })
})

// Create a reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  // Verify the connection configuration
  transporter.verify(function (error, success) {
    if (error) {
      console.log('Error with SMTP configuration:', error)
    } else {
      console.log('Server is ready to take our messages')
    }
  })
})

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body

  const mailOptions = {
    from: `"VisionsCraft Contact Form" <${process.env.EMAIL_USER}>`, // sender address
    to: process.env.RECIPIENT_EMAIL, // list of receivers
    subject: `New message from ${name}`, // Subject line
    text: `You have a new message from:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`, // plain text body
    replyTo: email, // reply-to field
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error)
      res.render('contact', {
        title: 'Contact Us - VisionsCraft',
        currentPage: 'contact',
        description:
          'Get in touch with VisionsCraft, your partner for innovative AI solutions. Contact our team of experts to discuss your project needs.',
        message: `Error sending message: ${error.message}. Please try again later.`,
      })
    } else {
      console.log('Message sent: %s', info.messageId)
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
      res.render('contact', {
        title: 'Contact Us - VisionsCraft',
        currentPage: 'contact',
        description:
          'Get in touch with VisionsCraft, your partner for innovative AI solutions. Contact our team of experts to discuss your project needs.',
        message: 'Message sent successfully!',
      })
    }
  })
})
