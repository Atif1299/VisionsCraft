require('dotenv').config()
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const Service = require('./models/Service')

async function testBookingSystem() {
  try {
    // Connect to database
    await connectDB()
    console.log('✅ Database connected')

    // Check if services exist
    const services = await Service.find()
    console.log(`📋 Found ${services.length} services in database`)

    if (services.length === 0) {
      console.log('⚠️  No services found. Creating a test service...')
      const testService = new Service({
        name: 'AI Consultation',
        description: 'Professional AI consultation service',
        price: 100,
        duration: '1 hour',
        availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        isCustomizable: true,
      })
      await testService.save()
      console.log('✅ Test service created')
    } else {
      console.log('Services available:')
      services.forEach((service) => {
        console.log(`  - ${service.name} (ID: ${service._id})`)
      })
    }

    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

testBookingSystem()
