// ===== MAIN APPLICATION ENTRY POINT =====

// Import core modules
import { initPreloader } from './core/preloader.js'
import { initMobileMenu } from './navigation/mobile-menu.js'
import {
  initScrollReveal,
  initScrollProgress,
  initScrollToTop,
  initHeaderScroll,
} from './effects/scroll-effects.js'
import {
  initTypingEffect,
  initCounters,
  initAnimatedCards,
} from './effects/animations.js'
import {
  initAccordion,
  initTabs,
  initTooltips,
  initFilterControls,
} from './components/ui-components.js'
import {
  initTestimonialsSlider,
  initSwiperSliders,
} from './components/sliders.js'
import { showNotification } from './utils/utilities.js'

// Import particles configuration
import {
  heroParticlesConfig,
  showcaseParticlesConfig,
  blogParticlesConfig,
  particleConfigurations,
} from './particles.js'

// ===== MAIN INITIALIZATION =====

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOMContentLoaded fired. Initializing application modules.')

  // Initialize core functionality first
  initPreloader()

  // Initialize navigation
  initMobileMenu()

  // Initialize scroll effects
  initScrollReveal()
  initScrollProgress()
  initScrollToTop()
  initHeaderScroll()

  // Initialize animations
  initTypingEffect()
  initCounters()
  initAnimatedCards()

  // Initialize UI components
  initAccordion()
  initTabs()
  initTooltips()
  initFilterControls()

  // Initialize sliders
  initTestimonialsSlider()
  initSwiperSliders()

  // Initialize particles
  initParticles()

  // Initialize contact success modal
  initContactSuccessModal()

  console.log('All modules initialized successfully.')
})

// ===== PARTICLES INITIALIZATION =====
function initParticles() {
  if (typeof particlesJS === 'undefined') {
    console.warn('Particles.js library not loaded')
    return
  }

  // Hero section particles
  const heroParticles = document.getElementById('hero-particles')
  if (heroParticles) {
    particlesJS('hero-particles', heroParticlesConfig)
  }

  // Showcase section particles
  const showcaseParticles = document.getElementById('showcase-particles')
  if (showcaseParticles) {
    particlesJS('showcase-particles', showcaseParticlesConfig)
  }

  // Blog section particles
  const blogParticles = document.getElementById('blog-particles')
  if (blogParticles) {
    particlesJS('blog-particles', blogParticlesConfig)
  }

  // Initialize other particle configurations
  Object.keys(particleConfigurations).forEach((id) => {
    const element = document.getElementById(id)
    if (element) {
      particlesJS(id, particleConfigurations[id])
    }
  })
}

// ===== CONTACT SUCCESS MODAL =====
function initContactSuccessModal() {
  const urlParams = new URLSearchParams(window.location.search)
  const success = urlParams.get('success')

  if (success === 'true') {
    showNotification(
      'Message sent successfully! We will get back to you soon.',
      'success',
      5000
    )

    // Clean up URL
    const newUrl = window.location.pathname
    window.history.replaceState({}, document.title, newUrl)
  }
}

// ===== GLOBAL ERROR HANDLING =====
window.addEventListener('error', function (e) {
  console.error('Global error:', e.error)
  showNotification('An error occurred. Please refresh the page.', 'error')
})

// ===== EXPORT FOR EXTERNAL USE =====
window.VisionsCraft = {
  showNotification,
  initParticles,
}
