// Test email functionality
require('dotenv').config()
const { sendBookingConfirmation } = require('./config/mailer')

// Mock booking data for testing
const testBooking = {
  _id: 'test123',
  clientName: 'Test User',
  clientEmail: 'ranaatif1299@gmail.com', // Send test email to yourself
  clientPhone: '+1234567890',
  preferredDate: new Date(),
  preferredTime: '10:00 AM',
  message: 'This is a test booking',
  documentPath: null,
  service: {
    name: 'Test Service',
    description: 'This is a test service',
  },
}

async function testEmail() {
  try {
    console.log('Testing email functionality...')
    await sendBookingConfirmation(testBooking)
    console.log('✅ Test email sent successfully!')
  } catch (error) {
    console.error('❌ Test email failed:', error)
  }
}

testEmail()
