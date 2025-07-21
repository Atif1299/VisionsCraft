require('dotenv').config()
const nodemailer = require('nodemailer')

async function testEmailAuth() {
  console.log('🔍 Testing Gmail authentication...')
  console.log('📧 Email User:', process.env.EMAIL_USER)
  console.log(
    '🔐 Email Pass:',
    process.env.EMAIL_PASS ? '***HIDDEN***' : '❌ NOT SET'
  )

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  try {
    console.log('🔐 Verifying Gmail connection...')
    await transporter.verify()
    console.log('✅ Gmail authentication successful!')

    console.log('📤 Sending test email...')
    const info = await transporter.sendMail({
      from: `"VisionsCraft Test" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: 'Test Email - VisionsCraft Booking System',
      html: `
        <h2>🎉 Email System Test</h2>
        <p>If you're reading this, your email system is working correctly!</p>
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
      `,
    })

    console.log('✅ Test email sent successfully!')
    console.log('📬 Message ID:', info.messageId)
  } catch (error) {
    console.error('❌ Email authentication failed!')
    console.error('Error:', error.message)

    if (error.message.includes('Invalid login')) {
      console.log('\n🛠️  SOLUTION:')
      console.log('1. Go to https://myaccount.google.com/security')
      console.log('2. Enable 2-Step Verification')
      console.log('3. Generate an App Password for "Mail"')
      console.log('4. Update your .env file with the 16-character app password')
    }
  }
}

testEmailAuth()
