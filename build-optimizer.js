// ===== BUILD OPTIMIZATION SCRIPT =====
// This script combines and minifies CSS/JS files for production

const fs = require('fs');
const path = require('path');

// Configuration
const config = {
    // CSS files to combine in order
    cssFiles: [
        'public/css/base/variables.css',
        'public/css/base/typography.css',
        'public/css/components/buttons.css',
        'public/css/components/preloader.css',
        'public/css/components/notifications.css',
        'public/css/layout/hero.css',
        'public/css/layout/services.css',
        'public/css/utilities/spacing.css',
        'public/css/utilities/responsive.css'
    ],
    
    // JS files to combine in order
    jsFiles: [
        'public/js/utils/utilities.js',
        'public/js/core/preloader.js',
        'public/js/navigation/mobile-menu.js',
        'public/js/effects/scroll-effects.js',
        'public/js/effects/animations.js',
        'public/js/components/ui-components.js',
        'public/js/components/sliders.js'
    ],
    
    outputDir: 'public/dist'
};

// Ensure output directory exists
if (!fs.existsSync(config.outputDir)) {
    fs.mkdirSync(config.outputDir, { recursive: true });
}

// Combine CSS files
function combineCSSFiles() {
    console.log('Combining CSS files...');
    let combinedCSS = '';
    
    config.cssFiles.forEach(file => {
        if (fs.existsSync(file)) {
            const content = fs.readFileSync(file, 'utf8');
            combinedCSS += `/* ==== ${file} ==== */\n${content}\n\n`;
        } else {
            console.warn(`CSS file not found: ${file}`);
        }
    });
    
    // Write combined CSS
    fs.writeFileSync(path.join(config.outputDir, 'combined.css'), combinedCSS);
    console.log('CSS files combined successfully!');
}

// Combine JS files (convert to non-module format for compatibility)
function combineJSFiles() {
    console.log('Combining JS files...');
    let combinedJS = `
// Combined JavaScript - Auto-generated
(function() {
    'use strict';
    
    // Global namespace for all functions
    window.VisionsCraft = window.VisionsCraft || {};
    
    // Tech Icon Mapping
    window.techIconMap = {
        CrewAI: '/public/images/icons/crewai-color.svg',
        LangChain: '/public/images/icons/langchain-color.svg',
        'Hugging Face': '/public/images/icons/huggingface-color.png',
        n8n: '/public/images/icons/n8n-color.svg',
        BERT: '/public/images/icons/huggingface-color.png',
        Rasa: '/public/images/icons/huggingface-color.png',
        GANs: '/public/images/icons/tensorflow.svg',
        PyTorch: '/public/images/icons/pytorch logo.png',
        Figma: '/public/images/icons/figma.webp',
        Python: '/public/images/icons/fastapi.svg',
        Automation: '/public/images/icons/n8n-color.svg',
        Optimization: '/public/images/icons/langchain-color.svg',
        'Creative AI': '/public/images/icons/figma.webp',
        Transformers: '/public/images/icons/huggingface-color.png',
        NLP: '/public/images/advance_svgs/nlp.svg',
    };
    
    // Utility functions
    window.showNotification = function(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = \`notification notification-\${type}\`;
        notification.innerHTML = \`
            <div class="notification-content">
                <span class="notification-message">\${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        \`;
        
        document.body.appendChild(notification);
        
        const autoRemove = setTimeout(() => {
            removeNotification(notification);
        }, duration);
        
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            clearTimeout(autoRemove);
            removeNotification(notification);
        });
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
    };
    
    function removeNotification(notification) {
        notification.classList.add('hide');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
    
    window.debounce = function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };
    
    window.throttle = function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    };
`;
    
    // Read and process each JS file
    const jsContent = {
        preloader: '',
        mobileMenu: '',
        scrollEffects: '',
        animations: '',
        uiComponents: '',
        sliders: ''
    };
    
    config.jsFiles.forEach(file => {
        if (fs.existsSync(file)) {
            let content = fs.readFileSync(file, 'utf8');
            
            // Remove ES6 module syntax and imports
            content = content
                .replace(/import.*from.*['"].*['"];?\s*\n/g, '')
                .replace(/import\s*{[^}]*}\s*from.*['"].*['"];?\s*\n/g, '')
                .replace(/export\s+/g, '')
                .replace(/export\s*{[^}]*};?\s*\n/g, '');
            
            // Extract function names and convert to window assignments
            const functionMatches = content.match(/function\s+(\w+)\s*\(/g);
            if (functionMatches) {
                functionMatches.forEach(match => {
                    const funcName = match.replace(/function\s+(\w+)\s*\(/, '$1');
                    content = content.replace(
                        new RegExp(`function\\s+${funcName}\\s*\\(`, 'g'), 
                        `window.${funcName} = function(`
                    );
                });
            }
            
            combinedJS += `\n    /* ==== ${file} ==== */\n${content}\n`;
        } else {
            console.warn(`JS file not found: ${file}`);
        }
    });
    
    combinedJS += `
    // Auto-initialization
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Initializing VisionsCraft modules...');
        
        // Initialize all functions that exist
        const initFunctions = [
            'initPreloader',
            'initMobileMenu', 
            'initScrollReveal',
            'initScrollProgress',
            'initScrollToTop',
            'initHeaderScroll',
            'initTypingEffect',
            'initCounters',
            'initAnimatedCards',
            'initAccordion',
            'initTabs',
            'initTooltips',
            'initFilterControls',
            'initTestimonialsSlider',
            'initSwiperSliders'
        ];
        
        initFunctions.forEach(funcName => {
            if (typeof window[funcName] === 'function') {
                try {
                    window[funcName]();
                    console.log(\`Initialized: \${funcName}\`);
                } catch (error) {
                    console.warn(\`Error initializing \${funcName}:\`, error);
                }
            } else {
                console.warn(\`Function not found: \${funcName}\`);
            }
        });
        
        // Initialize particles if available
        if (typeof window.initParticles === 'function') {
            window.initParticles();
        }
        
        console.log('VisionsCraft initialization complete.');
    });
    
    // Contact success modal
    window.initContactSuccessModal = function() {
        const urlParams = new URLSearchParams(window.location.search);
        const success = urlParams.get('success');
        
        if (success === 'true') {
            window.showNotification('Message sent successfully! We will get back to you soon.', 'success', 5000);
            
            // Clean up URL
            const newUrl = window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
        }
    };
    
    // Global error handling
    window.addEventListener('error', function(e) {
        console.error('Global error:', e.error);
        if (typeof window.showNotification === 'function') {
            window.showNotification('An error occurred. Please refresh the page.', 'error');
        }
    });
    
})();
`;
    
    // Write combined JS
    fs.writeFileSync(path.join(config.outputDir, 'combined.js'), combinedJS);
    console.log('JS files combined successfully!');
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
        .trim();
}

// Simple JS minification (improved)
function minifyJS(js) {
    return js
        // Remove comments but preserve important ones
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
        .replace(/\/\/.*$/gm, '') // Remove line comments
        // Normalize whitespace but preserve necessary spaces
        .replace(/\s*([{}();,:])\s*/g, '$1') // Remove spaces around operators but keep necessary ones
        .replace(/\s*=\s*/g, '=') // Remove spaces around equals
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .replace(/;\s*}/g, ';}') // Keep semicolon before closing brace
        .replace(/}\s*else\s*{/g, '}else{') // Fix else statements
        .replace(/}\s*catch\s*\(/g, '}catch(') // Fix catch statements
        .replace(/}\s*finally\s*{/g, '}finally{') // Fix finally statements
        .replace(/\n\s*/g, '') // Remove newlines and leading spaces
        .trim();
}

// Create minified versions (safer approach)
function createMinifiedVersions() {
    console.log('Creating minified versions...');
    
    // Minify CSS (CSS minification is safer)
    const css = fs.readFileSync(path.join(config.outputDir, 'combined.css'), 'utf8');
    const minifiedCSS = minifyCSS(css);
    fs.writeFileSync(path.join(config.outputDir, 'combined.min.css'), minifiedCSS);
    
    // For JS, create a safer minified version
    const js = fs.readFileSync(path.join(config.outputDir, 'combined.js'), 'utf8');
    const safeMinifiedJS = js
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
        .replace(/\/\/.*$/gm, '') // Remove line comments  
        .replace(/\s*\n\s*/g, ' ') // Replace newlines with space
        .replace(/\s{2,}/g, ' ') // Replace multiple spaces
        .replace(/\s*{\s*/g, '{') // Clean braces
        .replace(/\s*}\s*/g, '}')
        .replace(/\s*;\s*/g, ';') // Clean semicolons
        .replace(/\s*,\s*/g, ',') // Clean commas
        .trim();
    
    fs.writeFileSync(path.join(config.outputDir, 'combined.min.js'), safeMinifiedJS);
    
    console.log('Minified versions created with safe approach!');
}

// Generate file size report
function generateReport() {
    console.log('\n=== BUILD REPORT ===');
    
    const files = [
        'combined.css',
        'combined.min.css', 
        'combined.js',
        'combined.min.js'
    ];
    
    files.forEach(file => {
        const filePath = path.join(config.outputDir, file);
        if (fs.existsSync(filePath)) {
            const stats = fs.statSync(filePath);
            const sizeKB = (stats.size / 1024).toFixed(2);
            console.log(`${file}: ${sizeKB} KB`);
        }
    });
    
    console.log('\n=== OPTIMIZATION COMPLETE ===');
    console.log('Files generated in:', config.outputDir);
    console.log('Update your HTML to use combined.min.css and combined.min.js for production');
}

// Run the build process
console.log('Starting build process...\n');
combineCSSFiles();
combineJSFiles();
createMinifiedVersions();
generateReport();

module.exports = {
    combineCSSFiles,
    combineJSFiles,
    createMinifiedVersions,
    generateReport
};
