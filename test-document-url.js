// Test the document URLs to see which one works

const originalUrl =
  'https://res.cloudinary.com/dm43i3xmb/image/upload/v1753134574/visionscraft-bookings/Custom%20Administrative%20Dashboard%20Proposal.pdf.pdf'
const fixedUrl = originalUrl.replace(/\.pdf\.pdf$/, '.pdf')

console.log('🔍 URL Testing:')
console.log('📄 Original URL:', originalUrl)
console.log('✅ Fixed URL:', fixedUrl)
console.log('')
console.log('📋 Copy and test these URLs in your browser:')
console.log('1. Original (with double .pdf):', originalUrl)
console.log('2. Fixed (single .pdf):', fixedUrl)
console.log('')
console.log('The working URL should be used in emails ✅')
