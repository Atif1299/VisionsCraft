const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
const { body, validationResult } = require('express-validator')

// GET /contact - Render the contact form
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
    body('name').trim().escape().notEmpty().withMessage('Name is required.'),
    body('email').trim().isEmail().withMessage('Invalid email format.'),
    body('subject')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Subject is required.'),
    body('message')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Message is required.'),
    body('phone').optional().trim().escape(),
    body('company').optional().trim().escape(),
  ],
  async (req, res) => {
    console.log('📝 Contact form submission received')
    console.log('📋 Form data:', req.body)

    // Check for validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log('❌ Validation errors:', errors.array())
      return res.render('contact', {
        title: 'Contact Us - VisionsCraft',
        currentPage: 'contact',
        description:
          'Get in touch with VisionsCraft, your partner for innovative AI solutions.',
        message: 'Please fill all required fields correctly.',
        errors: errors.array(),
      })
    }

    const { name, email, phone, company, subject, message } = req.body

    // Check if required environment variables are set
    if (
      !process.env.EMAIL_USER ||
      !process.env.EMAIL_PASS ||
      !process.env.ADMIN_EMAIL
    ) {
      console.error(
        '❌ Missing email configuration. Please check environment variables.'
      )
      return res.render('contact', {
        title: 'Contact Us - VisionsCraft',
        currentPage: 'contact',
        description:
          'Get in touch with VisionsCraft, your partner for innovative AI solutions.',
        message:
          'Email service is currently unavailable. Please try again later or contact us directly.',
      })
    }

    console.log('✅ Email configuration found')
    console.log('📧 Sending email from:', process.env.EMAIL_USER)
    console.log('📬 Sending email to:', process.env.ADMIN_EMAIL)

    // Nodemailer transporter setup - Use Gmail service for simplicity
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })

    const mailOptions = {
      from: `"VisionsCraft Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Message: ${subject}`,
      text: `You have a new contact message from:

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Company: ${company || 'Not provided'}
Subject: ${subject}

Message:
${message}

---
This message was sent from the VisionsCraft contact form.`,
      html: `
        <h3>New Contact Message from VisionsCraft Website</h3>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr style="background-color: #f8f9fa;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Name:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email:</td>
            <td style="padding: 10px; border: 1px solid #ddd;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr style="background-color: #f8f9fa;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Phone:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${
              phone || 'Not provided'
            }</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Company:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${
              company || 'Not provided'
            }</td>
          </tr>
          <tr style="background-color: #f8f9fa;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Subject:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${subject}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; vertical-align: top;">Message:</td>
            <td style="padding: 10px; border: 1px solid #ddd; white-space: pre-wrap;">${message}</td>
          </tr>
        </table>
        <p style="margin-top: 20px; color: #666; font-size: 12px;">
          This message was sent from the VisionsCraft contact form.
        </p>
      `,
      replyTo: email,
    }

    try {
      const info = await transporter.sendMail(mailOptions)
      console.log('Contact email sent successfully:', info.messageId)

      // Render success page
      res.render('contact', {
        title: 'Contact Us - VisionsCraft',
        currentPage: 'contact',
        description:
          'Get in touch with VisionsCraft, your partner for innovative AI solutions.',
        message:
          'Thank you for your message! We will get back to you within 24 hours.',
      })
    } catch (error) {
      console.error('Error sending contact email:', error)

      // Render error page
      res.render('contact', {
        title: 'Contact Us - VisionsCraft',
        currentPage: 'contact',
        description:
          'Get in touch with VisionsCraft, your partner for innovative AI solutions.',
        message:
          'Failed to send message. Please try again later or contact us directly at ranaatif1299@gmail.com',
      })
    }
  }
)

module.exports = router
