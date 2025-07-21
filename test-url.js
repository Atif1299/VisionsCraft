// Test script to check Cloudinary URL and fix issues
const testUrl =
  'https://res.cloudinary.com/dm43i3xmb/image/upload/v1753134574/visionscraft-bookings/Custom%20Administrative%20Dashboard%20Proposal.pdf.pdf'

console.log('🔍 Original URL:')
console.log(testUrl)

// Fix double extension issue
function fixCloudinaryUrl(url) {
  // Remove double extensions
  const fixedUrl = url
    .replace(/\.pdf\.pdf$/, '.pdf')
    .replace(/\.doc\.pdf$/, '.doc')
    .replace(/\.docx\.pdf$/, '.docx')
    .replace(/\.txt\.pdf$/, '.txt')

  return fixedUrl
}

const fixedUrl = fixCloudinaryUrl(testUrl)
console.log('\n✅ Fixed URL:')
console.log(fixedUrl)

console.log('\n🔗 Test these URLs in your browser:')
console.log('1. Original:', testUrl)
console.log('2. Fixed:', fixedUrl)

// Also test URL decoding
const decodedUrl = decodeURIComponent(fixedUrl)
console.log('3. Decoded:', decodedUrl)
