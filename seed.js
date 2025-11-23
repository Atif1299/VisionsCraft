require('dotenv').config()
const mongoose = require('mongoose')
const Project = require('./models/Project')
const Service = require('./models/Service') // Import Service model
const connectDB = require('./config/db')

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
    // Clear existing data
    await Project.deleteMany({})
    await Service.deleteMany({}) // Clear existing services
    console.log('✅ Existing projects and services removed')

    // Seed Projects (existing data)
    const projects = [
      {
        title: 'Islamic Knowledge Explorer',
        shortDescription:
          'An advanced AI-powered tool for in-depth Quranic and Hadith analysis, providing verified references and contextual insights.',
        fullDescription:
          'The Islamic Knowledge Explorer is a sophisticated, agentic RAG-based system designed for scholars, students, and researchers of Islamic texts. Leveraging powerful AI frameworks like LangChain, LangGraph, and AutoGen, this tool cross-references Hadith with Quranic ayahs, verifies narrator chains, and provides comprehensive contextual analysis. It streamlines the research process, ensuring accuracy and depth in understanding religious scriptures.',
        industry: 'Religious Studies',
        category: 'AI Automation',
        mainImage: 'images/projects images/islamic_hadith_1st.png',
        techStack: ['Langchain', 'Langgraph', 'AutoGen', 'OpenAI SDK'],
        implementation:
          'Agentic RAG system, comprehensive analysis of Hadith, narrator chain verification.',
        results: [
          'Accurate Hadith verification',
          'In-depth analysis of religious texts',
          'User-friendly interface for religious scholars',
        ],
        carouselVideos: [
          {
            url: 'your_video_url_here',
            type: 'youtube',
          },
        ],
        githubLink: 'https://github.com/nxbsolution/islamAI',
      },
      {
        title: 'WhatsApp Automation System',
        shortDescription:
          'An intelligent WhatsApp automation solution for lead conversion and 24/7 customer support, tailored for educational institutions.',
        fullDescription:
          'This project automates the entire customer lifecycle on WhatsApp for the NexusBerry Institute. Using `whatsapp-web.js`, n8n, and a LangGraph-based AI agent, the system manages incoming inquiries about courses, converts leads into clients, and provides instant support. Deployed on AWS, this robust solution enhances customer engagement, boosts enrollment rates, and ensures a seamless experience for all users.',
        industry: 'Education',
        category: 'AI Automation',
        mainImage: 'images/projects images/whatsapp automation n8n .png',
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
        githubLink: 'https://github.com/nxbsolution/n8n-projects',
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
        carouselVideos: [
          {
            url: 'your_video_url_here',
            type: 'youtube',
          },
        ],
        githubLink: 'https://github.com/Atif1299/Full-stack-Ecommerce-Mern-App',
      },
    ]
    await Project.insertMany(projects)
    console.log('Projects seeded successfully!')

    // Seed Services (new data)
    const services = [
      {
        name: 'AI Strategic Consultations',
        description:
          'Strategic guidance to integrate AI into your business operations for maximum impact and ROI.',
        price: 500,
        duration: '1 hour',
        availability: ['Monday', 'Wednesday', 'Friday'],
        isCustomizable: false,
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
    console.log('Services seeded successfully!')
  } catch (error) {
    console.error('Error seeding database:', error)
  } finally {
    mongoose.connection.close()
  }
}

seedDatabase()
