require('dotenv').config()
const mongoose = require('mongoose')
const Project = require('./models/Project')
const Service = require('./models/Service') // Import Service model
const connectDB = require('./config/db')

// Parse command-line arguments
const args = process.argv.slice(2)
const seedProjects = !args.includes('--services-only')
const seedServices = !args.includes('--projects-only')

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...\n')
    
    // Connect to the database first
    try {
      await connectDB()
    } catch (connectError) {
      console.error('\n❌ Failed to connect to database. Cannot proceed with seeding.')
      console.error('Please fix the connection issue and try again.\n')
      process.exit(1)
    }

    console.log('\n🗑️  Clearing existing data...')
    // Clear existing data based on what we're seeding
    if (seedProjects) {
      await Project.deleteMany({})
      console.log('✅ Existing projects removed')
    }
    if (seedServices) {
      await Service.deleteMany({})
      console.log('✅ Existing services removed')
    }

    // Seed Projects (if requested)
    if (seedProjects) {
      console.log('\n📦 Seeding projects...')
      const projects = [
      {
        title: 'RAG-Based-AI-Product-Recommender System',
        shortDescription:
          'The objective was to build a personalized recommendation system for an e-commerce platform, leveraging RAG (Retrieval-Augmented Generation) to track user behavior and enhance the shopping experience.',
        fullDescription:
          "We designed and implemented the AI model, integrated user activity tracking, and developed the recommendation logic to deliver tailored product suggestions.The system significantly improved customer engagement, increased sales conversion rates, and provided the client with actionable insights into user preferences.",
        industry: 'E-commerce',
        category: "AI Development",
        mainImage: 'images/projects images/thumbnail_rag_product_recommender.png',
        techStack: ['RAG', 'Ecommerce Order Fulfillment', 'XAI', 'Langchain', 'Langgraph'],
        implementation:
          'Developed a RAG-powered recommendation engine, integrated user behavior tracking, built personalized product ranking logic, and deployed the system into the e-commerce workflow.',
        results: [
          'Increased product discovery and relevance',
          'Higher customer engagement and improved conversion rates',
          'Actionable insights into user shopping patterns for the client',
        ],
        carouselVideos: [
          {
            url: 'your_video_url_here',
            type: 'youtube',
          },
        ],
        githubLink: 'https://github.com/AhmedHussain007/RAG-Based-Personalized-Product-Recommendation-System',
      },
      {
        title: 'WhatsApp Customer Support Sales Funnel',
        shortDescription:
          'An intelligent WhatsApp automation solution for lead conversion and 24/7 customer support, tailored for educational institutions.',
        fullDescription:
          'This project automates the entire customer lifecycle on WhatsApp for the NexusBerry Institute. Using `whatsapp-web.js`, n8n, and a LangGraph-based AI agent, the system manages incoming inquiries about courses, converts leads into clients, and provides instant support. Deployed on AWS, this robust solution enhances customer engagement, boosts enrollment rates, and ensures a seamless experience for all users.',
        industry: 'Education',
        category: 'AI Automation',
        mainImage: 'images/projects images/thumbnail_whatsapp_automation.png',
        techStack: ['whatsapp-web.js', 'n8n', 'Langgraph', 'AWS'],
        implementation:
          'Lead management, customer support, automated responses, and course inquiries.',
        results: [
          'Increased lead conversion',
          '24/7 customer support',
          'Streamlined course enrollment process',
        ],
        carouselVideos: [
          {
            url: 'your_video_url_here',
            type: 'youtube',
          },
        ],
        githubLink: 'https://www.upwork.com/freelancers/~018e0dc0445f5f1f8d?p=1956295553805524992',
      },
      {
        title: 'Complete E-commerce Web Development',
        shortDescription:
          'A high-performance, full-stack e-commerce platform featuring server-side rendering and a comprehensive admin dashboard.',
        fullDescription:
          'This complete e-commerce solution is built with Node.js and features server-side rendering for optimal performance and SEO. It includes a powerful admin dashboard for managing orders, a seamless booking and checkout system, and automated email notifications. The platform is designed to provide a smooth, intuitive, and secure shopping experience for both customers and administrators.',
        industry: 'E-commerce',
        category: 'Web Development',
        mainImage: 'images/projects images/ecommerce_landing_page.png',
        techStack: ['Node.js', 'Server-Side Rendering', 'Admin Dashboard'],
        implementation:
          'Order management, booking system, secure checkout, and email notifications.',
        results: [
          'Seamless user experience',
          'Efficient order processing',
          'Comprehensive admin control',
        ],
        carouselVideos: [{
          duration: '1 hour',
          availability: ['Monday', 'Wednesday', 'Friday'],
          isCustomizable: false,
        }
        ]
      },
      {
        name: 'Agentic AI Development',
        description:
          'Autonomous AI agents that can reason, plan, and execute complex tasks to achieve your business goals.',
        price: 2500,
        duration: 'Custom Project',
        availability: ['By Appointment'],
        isCustomizable: true,
      },
      {
        name: 'Conversational AI Solutions',
        description:
          'Intelligent chatbots and virtual assistants that enhance customer experience and streamline support.',
        price: 1500,
        duration: 'Custom Project',
        availability: ['By Appointment'],
        isCustomizable: true,
      },
      {
        name: 'Generative AI Implementation',
        description:
          'Harness the power of generative models to create, innovate, and automate content and design.',
        price: 3000,
        duration: 'Custom Project',
        availability: ['By Appointment'],
        isCustomizable: true,
      },
      {
        name: 'AI Automation & Optimization',
        description:
          'Intelligent automation of business processes to increase efficiency, reduce costs, and scale operations.',
        price: 2000,
        duration: 'Custom Project',
        availability: ['By Appointment'],
        isCustomizable: true,
      },
      {
        name: 'Custom AI Model Development',
        description:
          'Tailored AI model development to address unique business challenges and opportunities.',
        price: 4000,
        duration: 'Custom Project',
        availability: ['By Appointment'],
        isCustomizable: true,
      },
    ]
    await Service.insertMany(services)
    console.log('✅ Services seeded successfully!')
  }

  // Summary
  console.log('\n' + '='.repeat(50))
  console.log('✨ Database seeding completed!')
  if (seedProjects && seedServices) {
    console.log('📊 Seeded: Projects + Services')
  } else if (seedProjects) {
    console.log('📊 Seeded: Projects only')
  } else if (seedServices) {
    console.log('📊 Seeded: Services only')
  }
  console.log('='.repeat(50) + '\n')
  
  } catch (error) {
    console.error('Error seeding database:', error)
  } finally {
    mongoose.connection.close()
  }
}

// Show usage if help flag is present
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
📚 Seed Script Usage:

  node seed.js                    Seed both projects and services (default)
  node seed.js --projects-only    Seed only projects
  node seed.js --services-only    Seed only services
  node seed.js --help            Show this help message

Examples:
  node seed.js                    # Seed everything
  node seed.js --projects-only    # Seed only projects
  node seed.js --services-only    # Seed only services
`)
  process.exit(0)
}

seedDatabase()
