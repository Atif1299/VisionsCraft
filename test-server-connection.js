// Quick test to check if server is responding properly
require('dotenv').config()

async function testServerConnection() {
  try {
    console.log('🔍 Testing server connection...')

    const response = await fetch('http://localhost:3000/api/services')
    const data = await response.json()

    console.log('✅ Server is responding!')
    console.log(`📋 Found ${data.length} services`)

    // Test a simple booking request (without file)
    console.log('\n🧪 Testing booking endpoint...')
    const testBooking = {
      serviceId: data[0]?._id,
      clientName: 'Test User',
      clientEmail: 'test@example.com',
      clientPhone: '1234567890',
      preferredDate: '2025-07-25',
      preferredTime: '10:00',
      message: 'Test booking',
    }

    const bookingResponse = await fetch('http://localhost:3000/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testBooking),
    })

    if (bookingResponse.ok) {
      console.log('✅ Booking endpoint is working!')
    } else {
      console.log('❌ Booking endpoint issue:', bookingResponse.status)
    }
  } catch (error) {
    console.error('❌ Server connection failed:', error.message)
    console.log('\n💡 Solutions:')
    console.log('1. Make sure server is running: npm start')
    console.log('2. Check if port 3000 is available')
    console.log('3. Restart the server if needed')
  }
}

testServerConnection()
