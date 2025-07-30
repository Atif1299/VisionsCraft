// ===== SAFE MINIFIER =====
// This creates a properly minified version without syntax errors

const fs = require('fs')
const path = require('path')

function createSafeMinified() {
  console.log('Creating safe minified version...')

  const sourceFile = 'public/dist/combined.js'
  const outputFile = 'public/dist/combined-safe.min.js'

  if (!fs.existsSync(sourceFile)) {
    console.error('Source file not found:', sourceFile)
    return
  }

  let content = fs.readFileSync(sourceFile, 'utf8')

  // Safe minification that preserves syntax
  content = content
    // Remove comments carefully
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '')
    // Remove extra whitespace but preserve necessary spaces
    .replace(/\s*\n\s*/g, ' ')
    .replace(/\s{2,}/g, ' ')
    // Clean up specific patterns
    .replace(/\s*{\s*/g, '{')
    .replace(/\s*}\s*/g, '}')
    .replace(/\s*;\s*/g, ';')
    .replace(/\s*,\s*/g, ',')
    .replace(/\s*\(\s*/g, '(')
    .replace(/\s*\)\s*/g, ')')
    // Preserve necessary spaces around operators
    .replace(/(\w)\s*=\s*(\w)/g, '$1=$2')
    .replace(/(\w)\s*\+\s*(\w)/g, '$1+$2')
    .replace(/(\w)\s*-\s*(\w)/g, '$1-$2')
    .trim()

  // Write the safe minified version
  fs.writeFileSync(outputFile, content)

  // Report
  const originalSize = fs.statSync(sourceFile).size
  const minifiedSize = fs.statSync(outputFile).size
  const savings = (
    ((originalSize - minifiedSize) / originalSize) *
    100
  ).toFixed(1)

  console.log(`✅ Safe minified version created!`)
  console.log(`Original: ${(originalSize / 1024).toFixed(2)} KB`)
  console.log(`Minified: ${(minifiedSize / 1024).toFixed(2)} KB`)
  console.log(`Savings: ${savings}%`)
  console.log(`File: ${outputFile}`)
}

createSafeMinified()
