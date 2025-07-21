const nodemailer = require('nodemailer')
const path = require('path')

// Create transporter with environment variables and timeout
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 10000, // 10 seconds
  greetingTimeout: 5000, // 5 seconds
  socketTimeout: 10000, // 10 seconds
})

// Test transporter connectivity
transporter.verify((error, success) => {
  if (error) {
    console.error('Email transporter verification failed:', error)
  } else {
    console.log('Email server is ready to send messages')
  }
})

const sendBookingConfirmation = async (booking) => {
  try {
    console.log(
      '📧 Attempting to send booking confirmation email to:',
      booking.clientEmail
    )
    console.log(
      '🎯 Service:',
      booking.service.name,
      `($${booking.service.price})`
    )

    // Client confirmation email
    const clientMailOptions = {
      from: `"VisionsCraft" <${process.env.EMAIL_USER}>`,
      to: booking.clientEmail,
      subject: 'Booking Confirmation - VisionsCraft',
      html: `
        <h1>Booking Confirmation</h1>
        <p>Dear ${booking.clientName},</p>
        <p>Thank you for booking with VisionsCraft. Here are your booking details:</p>
        <ul>
          <li><strong>Service:</strong> ${booking.service.name}</li>
          <li><strong>Name:</strong> ${booking.clientName}</li>
          <li><strong>Email:</strong> ${booking.clientEmail}</li>
          <li><strong>Phone:</strong> ${booking.clientPhone}</li>
          <li><strong>Preferred Date:</strong> ${booking.preferredDate}</li>
          <li><strong>Preferred Time:</strong> ${booking.preferredTime}</li>
          <li><strong>Message:</strong> ${booking.message}</li>
        </ul>
        <p>We will get back to you shortly.</p>
        <p>Best regards,</p>
        <p>The VisionsCraft Team</p>
      `,
      attachments: [],
    }

    // Admin notification email
    const adminMailOptions = {
      from: `"VisionsCraft" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `🔔 New Booking Alert - ${booking.service.name}`,
      html: `
        <h1>🔔 New Booking Received</h1>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 15px 0;">
          <h2>Client Details:</h2>
          <ul>
            <li><strong>Name:</strong> ${booking.clientName}</li>
            <li><strong>Email:</strong> ${booking.clientEmail}</li>
            <li><strong>Phone:</strong> ${booking.clientPhone}</li>
          </ul>
          
          <h2>Service Details:</h2>
          <ul>
            <li><strong>Service:</strong> ${booking.service.name}</li>
            <li><strong>Price:</strong> $${booking.service.price}</li>
            <li><strong>Preferred Date:</strong> ${booking.preferredDate}</li>
            <li><strong>Preferred Time:</strong> ${booking.preferredTime}</li>
          </ul>
          
          <h2>Message:</h2>
          <p style="background-color: #ffffff; padding: 10px; border-radius: 4px;">
            ${booking.message || 'No message provided'}
          </p>
          
          <h2>Booking ID:</h2>
          <p><code>${booking._id}</code></p>
        </div>
        <p><strong>Action Required:</strong> Please contact the client to confirm the booking details.</p>
      `,
      attachments: [],
    }

    // Handle document attachment for both emails
    if (booking.documentPath) {
      try {
        if (booking.documentPath.startsWith('http')) {
          // For Cloudinary URLs, include link in email body instead of attaching
          console.log('📎 Document uploaded to:', booking.documentPath)

          // Create document link for client email
          const documentLink = `
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0;">
              <p style="margin: 0; font-weight: bold; color: #1a73e8;">
                📎 Uploaded Document: 
                <a href="${booking.documentPath}" target="_blank" style="color: #1a73e8; text-decoration: none;">
                  View Document
                </a>
              </p>
              <p style="margin: 5px 0 0 0; font-size: 12px; color: #666;">
                Click the link above to view your uploaded document
              </p>
            </div>
          `

          // Add document link to client email
          clientMailOptions.html = clientMailOptions.html.replace(
            '<p>We will get back to you shortly.</p>',
            `${documentLink}<p>We will get back to you shortly.</p>`
          )

          // Add document link to admin email
          const adminDocumentLink = `
            <h2>📎 Uploaded Document:</h2>
            <p><a href="${booking.documentPath}" target="_blank" style="color: #1a73e8; text-decoration: none;">
              🔗 View Client Document
            </a></p>
          `

          adminMailOptions.html = adminMailOptions.html.replace(
            '<p><strong>Action Required:</strong>',
            `${adminDocumentLink}<p><strong>Action Required:</strong>`
          )
        } else if (booking.documentPath.includes('gridfs')) {
          // GridFS document - create download link
          const downloadLink = `http://localhost:3000/api/documents/${booking.documentPath
            .split('/')
            .pop()}`

          const documentSection = `
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0;">
              <p style="margin: 0; font-weight: bold; color: #1a73e8;">
                📎 Uploaded Document: 
                <a href="${downloadLink}" target="_blank" style="color: #1a73e8; text-decoration: none;">
                  Download Document
                </a>
              </p>
            </div>
          `

          clientMailOptions.html = clientMailOptions.html.replace(
            '<p>We will get back to you shortly.</p>',
            `${documentSection}<p>We will get back to you shortly.</p>`
          )

          adminMailOptions.html = adminMailOptions.html.replace(
            '<p><strong>Action Required:</strong>',
            `<h2>📎 Document:</h2><p><a href="${downloadLink}">Download Client Document</a></p><p><strong>Action Required:</strong>`
          )
        }
      } catch (attachmentError) {
        console.error(
          '⚠️  Error handling document attachment:',
          attachmentError.message
        )
        // Continue sending email without attachment
      }
    }

    // Send both emails
    const clientResult = await transporter.sendMail(clientMailOptions)
    console.log(
      '✅ Client confirmation email sent. Message ID:',
      clientResult.messageId
    )

    const adminResult = await transporter.sendMail(adminMailOptions)
    console.log(
      '✅ Admin notification email sent. Message ID:',
      adminResult.messageId
    )

    return { clientResult, adminResult }
  } catch (error) {
    console.error('Error sending confirmation email:', error)
    throw error // Re-throw the error to be caught by the calling function
  }
}

module.exports = {
  sendBookingConfirmation,
}
