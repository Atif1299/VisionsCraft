const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
  try {
    const mongoURI =
      process.env.MONGODB_URI || 'mongodb://localhost:27017/visionscraft'

    const options = {
      serverSelectionTimeoutMS: 10000, // Increased timeout for serverless
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      bufferCommands: false,
    }

    await mongoose.connect(mongoURI, options)
    console.log('MongoDB connected successfully')
  } catch (err) {
    console.error('MongoDB connection error:', err.message)
    // Don't exit in production to avoid crashing
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1)
    }
  }
}

module.exports = connectDB
