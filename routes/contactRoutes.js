const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
const { body, validationResult } = require('express-validator')
// Assuming .env is loaded and variables are available via process.env

// Helper: Validate email (can be replaced by express-validator's isEmail)
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// GET /contact - Render the contact form
// When this router is mounted at '/contact' in server.js,
// this route handles both '/contact' and '/contact/'
router.get('/', (req, res) => {
  res.render('contact', {
    title: 'Contact Us - VisionsCraft',
    currentPage: 'contact',
    description:
      'Get in touch with VisionsCraft, your partner for innovative AI solutions. Contact our team of experts to discuss your project needs.',
    message: '', // For displaying success/error messages after form submission
  })
})

// POST /contact - Handle form submission and send email
router.post(
  '/',
  [
    body('firstName')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('First name is required.'),
    body('lastName').trim().escape(), // Optional, but sanitize if present
    body('email').trim().isEmail().withMessage('Invalid email format.'),
    body('message')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Message is required.'),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() })
    }

    const { firstName, lastName, email, message } = req.body

    // Nodemailer transporter setup
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10),
      secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const mailOptions = {
      from: `"Contact Form Submission" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL, // Use the ADMIN_EMAIL from .env
      subject: `New Contact Message from ${firstName} ${lastName || ''}`,
      text: `You have a new message from:\n\nName: ${firstName} ${
        lastName || ''
      }\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `<p>You have a new message from:</p>
           <p><strong>Name:</strong> ${firstName} ${lastName || ''}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Message:</strong> ${message}</p>`,
      replyTo: email, // Reply-to header set to the sender's email
    }

    try {
      const info = await transporter.sendMail(mailOptions)
      console.log('Email sent: %s', info.messageId)
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info)) // Add preview URL for debugging
      // Respond with success
      res.json({ success: true, message: 'Message sent successfully!' })
    } catch (error) {
      console.error('Error sending email:', error)
      console.error('Nodemailer error details:', error.response) // Log more details if available
      console.error('Nodemailer error responseCode:', error.responseCode) // Log response code
      // Respond with error
      res.status(500).json({
        success: false,
        message:
          'Failed to send message. Please check server logs for details.',
      })
    }
  }
)

module.exports = router
