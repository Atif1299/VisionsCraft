// ===== SIMPLE BUILD SCRIPT (NO MODULE CONVERSION) =====
// This script simply concatenates files without ES6 module conversion

const fs = require('fs')
const path = require('path')

// Read the original main.js and extract functions
function createSimpleBuild() {
  console.log('Creating simple combined build...')

  // Read the original main.js file
  const originalMainJs = 'public/js/main.js'
  const originalStyleCss = 'public/css/style.css'

  if (!fs.existsSync(originalMainJs)) {
    console.error('Original main.js not found!')
    return
  }

  if (!fs.existsSync(originalStyleCss)) {
    console.error('Original style.css not found!')
    return
  }

  // Create output directory
  const outputDir = 'public/dist-simple'
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  // Copy and optimize the original files
  let jsContent = fs.readFileSync(originalMainJs, 'utf8')
  let cssContent = fs.readFileSync(originalStyleCss, 'utf8')

  // Add some optimizations to the original JS
  jsContent = `
// Optimized Main JavaScript
(function() {
    'use strict';
    
    ${jsContent}
    
    // Ensure initialization happens after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            console.log('VisionsCraft: All modules loaded and ready');
        });
    } else {
        console.log('VisionsCraft: DOM already ready');
    }
    
})();
`

  // Write the optimized files
  fs.writeFileSync(path.join(outputDir, 'main-optimized.js'), jsContent)
  fs.writeFileSync(path.join(outputDir, 'style-optimized.css'), cssContent)

  // Create minified versions
  const minifiedJs = minifyJS(jsContent)
  const minifiedCss = minifyCSS(cssContent)

  fs.writeFileSync(path.join(outputDir, 'main-optimized.min.js'), minifiedJs)
  fs.writeFileSync(path.join(outputDir, 'style-optimized.min.css'), minifiedCss)

  // Generate report
  console.log('\n=== SIMPLE BUILD REPORT ===')
  console.log(
    `Original JS: ${(fs.statSync(originalMainJs).size / 1024).toFixed(2)} KB`
  )
  console.log(
    `Optimized JS: ${(
      fs.statSync(path.join(outputDir, 'main-optimized.js')).size / 1024
    ).toFixed(2)} KB`
  )
  console.log(
    `Minified JS: ${(
      fs.statSync(path.join(outputDir, 'main-optimized.min.js')).size / 1024
    ).toFixed(2)} KB`
  )

  console.log(
    `Original CSS: ${(fs.statSync(originalStyleCss).size / 1024).toFixed(2)} KB`
  )
  console.log(
    `Optimized CSS: ${(
      fs.statSync(path.join(outputDir, 'style-optimized.css')).size / 1024
    ).toFixed(2)} KB`
  )
  console.log(
    `Minified CSS: ${(
      fs.statSync(path.join(outputDir, 'style-optimized.min.css')).size / 1024
    ).toFixed(2)} KB`
  )

  console.log(`\nFiles created in: ${outputDir}`)
  console.log(
    '✅ No module conversion errors - uses your original code structure!'
  )
}

// Simple CSS minification
function minifyCSS(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
    .replace(/\n/g, '') // Remove newlines
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/;\s*}/g, '}') // Remove semicolon before closing brace
    .replace(/\s*{\s*/g, '{') // Remove spaces around opening brace
    .replace(/;\s*/g, ';') // Remove spaces after semicolon
    .trim()
}

// Simple JS minification
function minifyJS(js) {
  return js
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
    .replace(/\/\/.*$/gm, '') // Remove line comments
    .replace(/\n/g, ' ') // Replace newlines with space
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/\s*([{}();,:])\s*/g, '$1') // Remove spaces around operators
    .trim()
}

// Run the simple build
createSimpleBuild()
