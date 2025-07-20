require('dotenv').config()
const mongoose = require('mongoose')
const Project = require('./models/Project')
const Service = require('./models/Service') // Import Service model
const connectDB = require('./config/db')

connectDB()

const seedDatabase = async () => {
  try {
    // Clear existing data
    await Project.deleteMany({})
    await Service.deleteMany({}) // Clear existing services
    console.log('Existing projects and services removed')

    // Seed Projects (existing data)
    const projects = [
      {
        title: 'AI-Powered Predictive Analytics Platform',
        shortDescription:
          'Developed a robust platform utilizing machine learning to predict market trends with 90% accuracy.',
        fullDescription:
          'Developed a robust platform utilizing machine learning to predict market trends with 90% accuracy, enabling data-driven decisions for financial institutions. This project involved extensive data preprocessing, model training, and deployment on cloud infrastructure.',
        industry: 'Finance',
        category: 'Machine Learning',
        mainImage: 'images/Use Cases/fraud-detection-02.jpg',
        techStack: ['Python', 'TensorFlow', 'AWS Sagemaker'],
        implementation:
          'Custom machine learning models, cloud deployment, real-time data processing.',
        results: [
          '90% prediction accuracy',
          'Improved decision-making',
          'Increased ROI',
        ],
        githubLink: '#',
      },
      {
        title: 'Automated Customer Support Chatbot',
        shortDescription:
          'Implemented a conversational AI solution that handles 70% of customer inquiries automatically.',
        fullDescription:
          'Implemented a conversational AI solution that handles 70% of customer inquiries automatically, significantly reducing response times and operational costs. The chatbot was integrated with existing CRM systems and provided 24/7 support.',
        industry: 'Customer Service',
        category: 'Conversational AI',
        mainImage: 'images/Use Cases/patient.png',
        techStack: ['Node.js', 'Dialogflow', 'Google Cloud'],
        implementation:
          'Natural Language Processing (NLP), intent recognition, integration with CRM.',
        results: [
          '70% reduction in inquiries',
          'Improved customer satisfaction',
          'Reduced operational costs',
        ],
        githubLink: '#',
      },
      {
        title: 'Intelligent Inventory Management System',
        shortDescription:
          'Designed an AI system that optimizes inventory levels, predicts demand fluctuations, and reduces waste by 25%.',
        fullDescription:
          'Designed an AI system that optimizes inventory levels, predicts demand fluctuations, and reduces waste by 25% for a leading retail chain. The system uses predictive analytics to forecast demand and optimize stock levels.',
        industry: 'Retail',
        category: 'AI Automation',
        mainImage: 'images/Use Cases/inventory.jpeg',
        techStack: ['Python', 'PyTorch', 'Azure ML'],
        implementation:
          'Predictive analytics, supply chain optimization, automated reordering.',
        results: [
          '25% reduction in waste',
          'Optimized inventory levels',
          'Improved efficiency',
        ],
        githubLink: '#',
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
