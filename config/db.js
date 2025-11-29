const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
  try {
    const mongoURI =
      process.env.MONGODB_URI || 'mongodb://localhost:27017/visionscraft'

    console.log('🔌 Attempting to connect to MongoDB...')
    
    const options = {
      serverSelectionTimeoutMS: 10000, // Increased timeout for serverless
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      bufferCommands: false,
    }

    await mongoose.connect(mongoURI, options)
    console.log('✅ MongoDB connected successfully')
    console.log(`📊 Database: ${mongoose.connection.db.databaseName}`)
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message)
    
    // Provide helpful error messages
    if (err.message.includes('bad auth') || err.message.includes('authentication failed')) {
      console.error('\n🔐 Authentication Error:')
      console.error('   - Check your MONGODB_URI username and password')
      console.error('   - Verify the database user exists in MongoDB Atlas')
      console.error('   - Ensure the password is URL-encoded (no special characters)')
      console.error('   - Check if the user has correct permissions\n')
    } else if (err.message.includes('ENOTFOUND') || err.message.includes('getaddrinfo')) {
      console.error('\n🌐 Network Error:')
      console.error('   - Check your internet connection')
      console.error('   - Verify the MongoDB cluster URL is correct')
      console.error('   - Ensure MongoDB Atlas cluster is running\n')
    } else if (err.message.includes('IP') || err.message.includes('whitelist')) {
      console.error('\n🔒 IP Whitelist Error:')
      console.error('   - Add your IP address to MongoDB Atlas IP whitelist')
      console.error('   - Or add 0.0.0.0/0 to allow all IPs (for development)\n')
    }
    
    // Don't exit in production to avoid crashing
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1)
    }
    
    throw err // Re-throw to let caller handle it
  }
}

module.exports = connectDB
