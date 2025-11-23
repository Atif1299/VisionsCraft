require('dotenv').config()
const mongoose = require('mongoose')

console.log('🔍 MongoDB Connection Tester\n')
console.log('=' .repeat(50))

// Show connection details (hide password)
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/visionscraft'
const safeURI = mongoURI.replace(/:[^:@]+@/, ':****@')
console.log('📍 Connection String:', safeURI)
console.log('=' .repeat(50))

async function testConnection() {
  try {
    console.log('\n🔌 Attempting to connect...')
    
    const options = {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    }

    await mongoose.connect(mongoURI, options)
    
    console.log('\n✅ SUCCESS! MongoDB connected successfully')
    console.log(`📊 Database Name: ${mongoose.connection.db.databaseName}`)
    console.log(`🌐 Host: ${mongoose.connection.host}`)
    console.log(`📡 Port: ${mongoose.connection.port}`)
    
    // Test if we can list collections
    const collections = await mongoose.connection.db.listCollections().toArray()
    console.log(`📁 Collections found: ${collections.length}`)
    if (collections.length > 0) {
      console.log('   -', collections.map(c => c.name).join(', '))
    }
    
    console.log('\n✨ Your MongoDB connection is working perfectly!')
    console.log('You can now run: node seed.js\n')
    
    await mongoose.connection.close()
    process.exit(0)
    
  } catch (err) {
    console.log('\n❌ CONNECTION FAILED!')
    console.log('Error:', err.message)
    console.log('\n' + '='.repeat(50))
    
    if (err.message.includes('bad auth') || err.message.includes('authentication failed')) {
      console.log('\n🔐 AUTHENTICATION ERROR')
      console.log('Your username or password is incorrect.\n')
      console.log('Solutions:')
      console.log('1. Check your MongoDB Atlas username')
      console.log('2. Reset your password in MongoDB Atlas')
      console.log('3. Make sure password is URL-encoded if it has special characters')
      console.log('4. Verify the user has correct permissions\n')
      console.log('📖 See MONGODB_AUTH_FIX.md for detailed instructions')
      
    } else if (err.message.includes('ENOTFOUND') || err.message.includes('getaddrinfo')) {
      console.log('\n🌐 NETWORK ERROR')
      console.log('Cannot reach MongoDB server.\n')
      console.log('Solutions:')
      console.log('1. Check your internet connection')
      console.log('2. Verify the cluster URL is correct')
      console.log('3. Make sure MongoDB Atlas cluster is running')
      
    } else if (err.message.includes('IP') || err.message.includes('not authorized')) {
      console.log('\n🔒 IP WHITELIST ERROR')
      console.log('Your IP address is not whitelisted.\n')
      console.log('Solutions:')
      console.log('1. Go to MongoDB Atlas > Network Access')
      console.log('2. Add your current IP address')
      console.log('3. Or add 0.0.0.0/0 to allow all IPs (development only)')
      
    } else {
      console.log('\n❓ UNKNOWN ERROR')
      console.log('Full error details:')
      console.error(err)
    }
    
    console.log('\n' + '='.repeat(50))
    process.exit(1)
  }
}

testConnection()
