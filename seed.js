require('dotenv').config()
const mongoose = require('mongoose')
const Project = require('./models/Project')

const projectsData = [
  {
    title: 'Autonomous Customer Support Agent',
    shortDescription:
      'An agentic AI system that handles customer queries, processes returns, and provides personalized recommendations.',
    fullDescription:
      'Reduced customer support tickets by 70% and increased customer satisfaction by 40%.',
    industry: 'E-commerce',
    category: 'agentic-ai',
    mainImage: '/images/Use Cases/inventory.jpeg',
    techStack: ['CrewAI', 'LangChain', 'Python'],
    implementation:
      "Our team implemented this solution using state-of-the-art AI techniques and methodologies tailored to the client's specific needs. The project involved data collection, preprocessing, model training, and deployment phases.",
    results: [
      'Improved operational efficiency by 42%',
      'Reduced costs by 27% within the first six months',
      'Enhanced customer satisfaction scores by 18%',
      'Enabled data-driven decision making across departments',
    ],
    carouselImages: [],
    carouselVideos: [],
    githubLink: '#',
  },
  {
    title: 'AI-Powered Content Creation',
    shortDescription:
      'A generative AI solution that automates the creation of blog posts, social media updates, and email campaigns.',
    fullDescription:
      'Increased content output by 500% and reduced content creation costs by 60%.',
    industry: 'Marketing',
    category: 'generative-ai',
    mainImage: '/images/Use Cases/patient.png',
    techStack: ['Hugging Face', 'Transformers', 'Python'],
    implementation:
      "Our team implemented this solution using state-of-the-art AI techniques and methodologies tailored to the client's specific needs. The project involved data collection, preprocessing, model training, and deployment phases.",
    results: [
      'Improved operational efficiency by 42%',
      'Reduced costs by 27% within the first six months',
      'Enhanced customer satisfaction scores by 18%',
      'Enabled data-driven decision making across departments',
    ],
    carouselImages: [],
    carouselVideos: [],
    githubLink: '#',
  },
  {
    title: 'Automated Financial Reporting',
    shortDescription:
      'An AI automation system that extracts data from multiple sources, generates financial reports, and identifies key insights.',
    fullDescription:
      'Reduced report generation time by 90% and improved data accuracy by 99%.',
    industry: 'Finance',
    category: 'ai-automation',
    mainImage: '/images/Use Cases/fraud-detection-02.jpg',
    techStack: ['n8n', 'Python', 'Automation'],
    implementation:
      "Our team implemented this solution using state-of-the-art AI techniques and methodologies tailored to the client's specific needs. The project involved data collection, preprocessing, model training, and deployment phases.",
    results: [
      'Improved operational efficiency by 42%',
      'Reduced costs by 27% within the first six months',
      'Enhanced customer satisfaction scores by 18%',
      'Enabled data-driven decision making across departments',
    ],
    carouselImages: [],
    carouselVideos: [],
    githubLink: '#',
  },
  {
    title: 'Intelligent Support Chatbot',
    shortDescription:
      'Our NLP-powered chatbot system resolved 78% of customer inquiries without human intervention, improving response time by 92%.',
    fullDescription:
      'Resolved 78% of customer inquiries without human intervention, improving response time by 92%.',
    industry: 'Customer Service',
    category: 'nlp',
    mainImage: '/images/Use Cases/patient.png',
    techStack: ['BERT', 'Rasa', 'NLP'],
    implementation:
      "Our team implemented this solution using state-of-the-art AI techniques and methodologies tailored to the client's specific needs. The project involved data collection, preprocessing, model training, and deployment phases.",
    results: [
      'Improved operational efficiency by 42%',
      'Reduced costs by 27% within the first six months',
      'Enhanced customer satisfaction scores by 18%',
      'Enabled data-driven decision making across departments',
    ],
    carouselImages: [],
    carouselVideos: [],
    githubLink: '#',
  },
  {
    title: 'AI-Powered Design Tool',
    shortDescription:
      'A generative AI tool that creates unique logos, branding assets, and marketing materials based on user prompts.',
    fullDescription:
      'Reduced design time by 80% and enabled the creation of thousands of unique design assets.',
    industry: 'Creative',
    category: 'generative-ai',
    mainImage: '/images/Use Cases/inventory.jpeg',
    techStack: ['GANs', 'PyTorch', 'Creative AI'],
    implementation:
      "Our team implemented this solution using state-of-the-art AI techniques and methodologies tailored to the client's specific needs. The project involved data collection, preprocessing, model training, and deployment phases.",
    results: [
      'Improved operational efficiency by 42%',
      'Reduced costs by 27% within the first six months',
      'Enhanced customer satisfaction scores by 18%',
      'Enabled data-driven decision making across departments',
    ],
    carouselImages: ['/images/blog_images/machinelearning.png'],
    carouselVideos: [],
    githubLink: '#',
  },
  {
    title: 'Autonomous Supply Chain Agent',
    shortDescription:
      'An agentic AI system that optimizes routes, manages inventory, and predicts demand in real-time.',
    fullDescription:
      'Reduced shipping costs by 25% and improved delivery times by 40%.',
    industry: 'Logistics',
    category: 'agentic-ai',
    mainImage: '/images/Use Cases/inventory.jpeg',
    techStack: ['LangChain', 'Python', 'Optimization'],
    implementation:
      "Our team implemented this solution using state-of-the-art AI techniques and methodologies tailored to the client's specific needs. The project involved data collection, preprocessing, model training, and deployment phases.",
    results: [
      'Improved operational efficiency by 42%',
      'Reduced costs by 27% within the first six months',
      'Enhanced customer satisfaction scores by 18%',
      'Enabled data-driven decision making across departments',
    ],
    carouselImages: [],
    carouselVideos: [],
    githubLink: '#',
  },
]

async function seedDB() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/visionscraft',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    console.log('MongoDB connected for seeding')

    await Project.deleteMany({})
    console.log('Existing projects removed')

    await Project.insertMany(projectsData)
    console.log('Projects seeded successfully!')
  } catch (err) {
    console.error('Error seeding database:', err)
  } finally {
    mongoose.connection.close()
  }
}

seedDB()
