require('dotenv').config()
const mongoose = require('mongoose')
const Service = require('./models/Service')
const connectDB = require('./config/db')

async function seedServices() {
  try {
    await connectDB()
    console.log('Connected to database')

    // Clear existing services
    await Service.deleteMany({})
    console.log('Cleared existing services')

    // Create new services
    const services = [
      {
        name: 'AI Consultation',
        description: 'Professional AI consultation and strategy development',
        price: 150,
        duration: '1 hour',
        availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        isCustomizable: true,
      },
      {
        name: 'Generative AI Implementation',
        description: 'Custom generative AI solutions for your business',
        price: 500,
        duration: 'Custom',
        availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        isCustomizable: true,
      },
      {
        name: 'AI Automation & Optimization',
        description: 'Automate business processes with AI technology',
        price: 750,
        duration: 'Custom',
        availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        isCustomizable: true,
      },
      {
        name: 'Machine Learning Development',
        description: 'Custom machine learning models and solutions',
        price: 1000,
        duration: 'Custom',
        availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        isCustomizable: true,
      },
    ]

    await Service.insertMany(services)
    console.log(`✅ Created ${services.length} services`)

    // List created services
    const createdServices = await Service.find()
    console.log('\nServices created:')
    createdServices.forEach((service) => {
      console.log(`  - ${service.name} (${service._id})`)
    })

    console.log('\n✅ Services seeded successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding services:', error)
    process.exit(1)
  }
}

seedServices()
