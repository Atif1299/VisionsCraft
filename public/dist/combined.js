
// Optimized Main JavaScript
(function() {
    'use strict';
    
    import {
  heroParticlesConfig,
  showcaseParticlesConfig,
  blogParticlesConfig,
  particleConfigurations,
} from './particles.js'

// Tech Icon Mapping
const techIconMap = {
  CrewAI: '/public/images/icons/crewai-color.svg',
  LangChain: '/public/images/icons/langchain-color.svg',
  'Hugging Face': '/public/images/icons/huggingface-color.png',
  n8n: '/public/images/icons/n8n-color.svg',
  BERT: '/public/images/icons/huggingface-color.png', // Assuming BERT uses Hugging Face icon
  Rasa: '/public/images/icons/huggingface-color.png', // Assuming Rasa uses Hugging Face icon
  GANs: '/public/images/icons/tensorflow.svg', // Placeholder, adjust as needed
  PyTorch: '/public/images/icons/pytorch logo.png',
  Figma: '/public/images/icons/figma.webp',
  Python: '/public/images/icons/fastapi.svg', // Placeholder, adjust as needed
  Automation: '/public/images/icons/n8n-color.svg', // Placeholder, adjust as needed
  Optimization: '/public/images/icons/langchain-color.svg', // Placeholder, adjust as needed
  'Creative AI': '/public/images/icons/figma.webp', // Placeholder, adjust as needed
  Transformers: '/public/images/icons/huggingface-color.png', // Placeholder, adjust as needed
  NLP: '/public/images/advance_svgs/nlp.svg', // Placeholder, adjust as needed
}

// ===== MAIN JAVASCRIPT =====

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
  console.log(
    'DOMContentLoaded fired. Initializing preloader and other functions.'
  )
  // Initialize preloader first
  initPreloader()

  // Initialize other functions
  initMobileMenu()
  initScrollReveal()
  initHeaderScroll() // Add this line to initialize header scroll behavior
  initTypingEffect()
  initCounters()
  initFilterControls()
  initScrollProgress()
  initScrollToTop()
  initAccordion()
  initTabs()
  initTooltips()
  initAnimatedCards()
  initTestimonialsSlider()
})

// Preloader
function initPreloader() {
  const preloader = document.querySelector('.preloader')
  if (!preloader) {
    console.log(
      'Preloader element not found. Skipping preloader initialization.'
    )
    // Still initialize particles if no preloader is found
    initParticles()
    return
  }

  // Function to hide the preloader and initialize particles
  function hidePreloader() {
    if (preloader.style.display === 'none') {
      return // Already hidden
    }

    preloader.classList.add('fade-out')
    preloader.addEventListener('transitionend', () => {
      preloader.style.display = 'none'
      document.body.style.overflow = 'visible'
      // Initialize particles after preloader is gone
      initParticles()
      console.log(
        'Preloader hidden, body overflow visible, particles initialized.'
      )
    })
  }

  // Hide preloader as soon as the DOM is interactive
  hidePreloader()
}

// Mobile Menu Toggle
function initMobileMenu() {
  const menuToggle = document.querySelector('.hamburger')
  const mobileMenu = document.querySelector('.navbar')
  const overlay = document.querySelector('.overlay')

  if (!menuToggle) return

  menuToggle.addEventListener('click', function () {
    this.classList.toggle('open')
    if (mobileMenu) mobileMenu.classList.toggle('active')
    if (overlay) overlay.classList.toggle('active')
    document.body.classList.toggle('no-scroll')
  })

  // Close menu when clicking on a link
  const mobileLinks = document.querySelectorAll('.mobile-menu a')
  mobileLinks.forEach((link) => {
    link.addEventListener('click', function () {
      menuToggle.classList.remove('open')
      mobileMenu.classList.remove('active')
      if (overlay) overlay.classList.remove('active')
      document.body.classList.remove('no-scroll')
    })
  })

  // Close menu when clicking on overlay
  if (overlay) {
    overlay.addEventListener('click', function () {
      menuToggle.classList.remove('open')
      mobileMenu.classList.remove('active')
      this.classList.remove('active')
      document.body.classList.remove('no-scroll')
    })
  }
}

// Scroll Reveal Animation
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal')

  if (revealElements.length === 0) return

  function checkReveal() {
    const windowHeight = window.innerHeight
    const revealPoint = 150

    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top

      if (elementTop < windowHeight - revealPoint) {
        element.classList.add('active')
      }
    })
  }

  // Check on load
  checkReveal()

  // Check on scroll
  window.addEventListener('scroll', checkReveal)
}

// Particles Animation
function initParticles() {
  console.log('Initializing particles...')

  if (typeof particlesJS === 'undefined') {
    console.error(
      'particlesJS is not defined. Make sure the particles.js library is loaded.'
    )
    return
  }

  // Initialize particles for the hero section (index.html)
  const heroParticlesElement = document.getElementById('particles-js')
  if (heroParticlesElement) {
    particlesJS('particles-js', heroParticlesConfig)
    console.log('Hero particles initialized.')
  }

  // Initialize particles for the general background (index.html or contact.html)
  const backgroundParticlesElement = document.getElementById(
    'particles-background'
  )
  if (backgroundParticlesElement) {
    particlesJS('particles-background', particleConfigurations.default)
    console.log('Background particles initialized.')
  }

  // Initialize particles for the showcase page (showcase.html)
  const showcaseParticlesElement = document.getElementById('particles-showcase')
  if (showcaseParticlesElement) {
    particlesJS('particles-showcase', showcaseParticlesConfig)
    console.log('Showcase particles initialized.')
  }

  // Initialize particles for the blog page (blog.html)
  const blogParticlesElement = document.getElementById('particles-blog')
  if (blogParticlesElement) {
    particlesJS('particles-blog', blogParticlesConfig)
    console.log('Blog particles initialized.')
  }
}

// Typing Effect
function initTypingEffect() {
  const typingElements = document.querySelectorAll('.typing-effect')

  if (typingElements.length === 0 || typeof Typed === 'undefined') return

  typingElements.forEach((element) => {
    const strings = element.getAttribute('data-strings')
    if (!strings) return

    const stringsArray = strings.split(',')

    new Typed(element, {
      strings: stringsArray,
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
    })
  })
}

// Animated Counters
function initCounters() {
  const counters = document.querySelectorAll('.counter')

  if (counters.length === 0) return

  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target
          const target = parseInt(counter.getAttribute('data-target'))
          let count = 0
          const updateCounter = () => {
            const increment = target / 100
            if (count < target) {
              count += increment
              counter.innerText = Math.ceil(count)
              setTimeout(updateCounter, 10)
            } else {
              counter.innerText = target
            }
          }
          updateCounter()
          observer.unobserve(counter)
        }
      })
    },
    { threshold: 0.5 }
  )

  counters.forEach((counter) => {
    counterObserver.observe(counter)
  })
}

// Filter Controls for Portfolio/Blog
function initFilterControls() {
  const filterControls = document.querySelector('.filter-controls')
  const filterItems = document.querySelectorAll('.filter-item')

  if (!filterControls || filterItems.length === 0) return

  const filterButtons = filterControls.querySelectorAll('button')

  filterButtons.forEach((button) => {
    button.addEventListener('click', function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove('active'))

      // Add active class to clicked button
      this.classList.add('active')

      const filter = this.getAttribute('data-filter')

      // Show/hide items based on filter
      filterItems.forEach((item) => {
        if (filter === 'all') {
          item.style.display = 'block'
          setTimeout(() => {
            item.classList.remove('hidden')
          }, 10)
        } else if (item.classList.contains(filter)) {
          item.style.display = 'block'
          setTimeout(() => {
            item.classList.remove('hidden')
          }, 10)
        } else {
          item.classList.add('hidden')
          setTimeout(() => {
            item.style.display = 'none'
          }, 300)
        }
      })
    })
  })
}

// Scroll Progress Indicator
function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress')

  if (!progressBar) return

  window.addEventListener('scroll', function () {
    const windowScroll =
      document.body.scrollTop || document.documentElement.scrollTop
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight
    const scrolled = (windowScroll / height) * 100

    progressBar.style.width = scrolled + '%'
  })
}

// Scroll to Top Button
function initScrollToTop() {
  const scrollTopBtn = document.querySelector('.scroll-to-top')

  if (!scrollTopBtn) return

  window.addEventListener('scroll', function () {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add('visible')
    } else {
      scrollTopBtn.classList.remove('visible')
    }
  })

  scrollTopBtn.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  })
}

// Accordion Functionality
function initAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item')

  if (accordionItems.length === 0) return

  accordionItems.forEach((item) => {
    const toggle = item.querySelector('.accordion-toggle')

    if (!toggle) return

    toggle.addEventListener('click', function () {
      // Close all other accordion items
      accordionItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove('active')
        }
      })

      // Toggle current item
      item.classList.toggle('active')
    })
  })
}

// Tabs Functionality
function initTabs() {
  const tabsContainer = document.querySelector('.tabs')

  if (!tabsContainer) return

  const tabButtons = tabsContainer.querySelectorAll('.tab-button')
  const tabContents = document.querySelectorAll('.tab-content')
  const tabIndicator = document.querySelector('.tab-indicator')

  if (tabButtons.length === 0 || tabContents.length === 0) return

  // Set initial indicator position
  if (tabIndicator && tabButtons.length > 0) {
    const activeTab = tabsContainer.querySelector('.tab-button.active')
    if (activeTab) {
      tabIndicator.style.width = activeTab.offsetWidth + 'px'
      tabIndicator.style.left = activeTab.offsetLeft + 'px'
    }
  }

  tabButtons.forEach((button, index) => {
    button.addEventListener('click', function () {
      // Remove active class from all buttons and contents
      tabButtons.forEach((btn) => btn.classList.remove('active'))
      tabContents.forEach((content) => content.classList.remove('active'))

      // Add active class to clicked button and corresponding content
      this.classList.add('active')
      tabContents[index].classList.add('active')

      // Move indicator
      if (tabIndicator) {
        tabIndicator.style.width = this.offsetWidth + 'px'
        tabIndicator.style.left = this.offsetLeft + 'px'
      }
    })
  })
}

// Tooltips
function initTooltips() {
  const tooltips = document.querySelectorAll('.tooltip')

  if (tooltips.length === 0) return

  // No additional initialization needed as tooltips are CSS-based
}

// Animated Cards
function initAnimatedCards() {
  const cards = document.querySelectorAll('.animated-card')

  if (cards.length === 0) return

  cards.forEach((card) => {
    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 10
      const rotateY = (centerX - x) / 10

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    })

    card.addEventListener('mouseleave', function () {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)'
    })
  })
}

// Testimonials Slider (Swiper)
function initTestimonialsSlider() {
  if (
    typeof Swiper !== 'undefined' &&
    document.querySelector('.testimonials-slider')
  ) {
    new Swiper('.testimonials-slider', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.testimonial-dots',
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + ' dot"></span>'
        },
      },
      navigation: {
        nextEl: '.testimonial-next',
        prevEl: '.testimonial-prev',
      },
      breakpoints: {
        768: {
          slidesPerView: 1,
        },
        1024: {
          slidesPerView: 1,
        },
      },
    })
  }
}

// Header Scroll Behavior
function initHeaderScroll() {
  const header = document.querySelector('.header')
  if (!header) return

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      header.classList.add('scrolled')
    } else {
      header.classList.remove('scrolled')
    }
  })
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()

    const targetId = this.getAttribute('href')
    const targetElement = document.querySelector(targetId)

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 100,
        behavior: 'smooth',
      })
    }
  })
})

// Handle Form Submissions
const allForms = document.querySelectorAll('form')
allForms.forEach((form) => {
  form.addEventListener('submit', function (e) {
    e.preventDefault()

    // Get form data
    const formData = new FormData(this)
    const formObject = {}
    formData.forEach((value, key) => {
      formObject[key] = value
    })

    // Simulate form submission
    const submitButton = this.querySelector('button[type="submit"]')
    if (submitButton) {
      const originalText = submitButton.textContent
      submitButton.textContent = 'Sending...'
      submitButton.disabled = true

      // Simulate API call
      setTimeout(() => {
        // Show success message
        const successMessage = document.createElement('div')
        successMessage.className = 'form-success'
        successMessage.textContent =
          'Thank you! Your message has been sent successfully.'

        // Insert success message after form
        form.parentNode.insertBefore(successMessage, form.nextSibling)

        // Reset form
        form.reset()

        // Reset button
        submitButton.textContent = originalText
        submitButton.disabled = false

        // Remove success message after 5 seconds
        setTimeout(() => {
          successMessage.remove()
        }, 5000)
      }, 1500)
    }
  })
})

// Theme Toggle (Light/Dark Mode)
const themeToggle = document.querySelector('.theme-toggle')
if (themeToggle) {
  themeToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode')

    // Save preference to localStorage
    const isDarkMode = document.body.classList.contains('dark-mode')
    localStorage.setItem('darkMode', isDarkMode)

    // Update toggle icon
    const toggleIcon = this.querySelector('i')
    if (toggleIcon) {
      if (isDarkMode) {
        toggleIcon.className = 'fas fa-sun'
      } else {
        toggleIcon.className = 'fas fa-moon'
      }
    }
  })

  // Check for saved theme preference
  const savedDarkMode = localStorage.getItem('darkMode')
  if (savedDarkMode === 'true') {
    document.body.classList.add('dark-mode')
    const toggleIcon = themeToggle.querySelector('i')
    if (toggleIcon) {
      toggleIcon.className = 'fas fa-sun'
    }
  }
}

// Lazy Loading for Images
if ('IntersectionObserver' in window) {
  const lazyImages = document.querySelectorAll('img[data-src]')

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.removeAttribute('data-src')
        observer.unobserve(img)
      }
    })
  })

  lazyImages.forEach((img) => {
    imageObserver.observe(img)
  })
}

// Animated Progress Bars
const progressBars = document.querySelectorAll('.progress-bar')
if (progressBars.length > 0) {
  const progressObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 }
  )

  progressBars.forEach((bar) => {
    progressObserver.observe(bar)
  })
}

// Animated Image Reveal
const imageRevealElements = document.querySelectorAll('.image-reveal')
if (imageRevealElements.length > 0) {
  const imageRevealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.3 }
  )

  imageRevealElements.forEach((element) => {
    imageRevealObserver.observe(element)
  })
}

// Animated Text Reveal
const textRevealElements = document.querySelectorAll('.text-reveal')
if (textRevealElements.length > 0) {
  const textRevealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target
          const text = element.textContent
          element.innerHTML = ''

          for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span')
            span.textContent = text[i]
            span.style.animationDelay = `${i * 0.05}s`
            element.appendChild(span)
          }

          observer.unobserve(element)
        }
      })
    },
    { threshold: 0.5 }
  )

  textRevealElements.forEach((element) => {
    textRevealObserver.observe(element)
  })
}

// Parallax Effect
const parallaxElements = document.querySelectorAll('.parallax')
if (parallaxElements.length > 0) {
  window.addEventListener('scroll', function () {
    parallaxElements.forEach((element) => {
      const speed = element.getAttribute('data-speed') || 0.5
      const yPos = -(window.pageYOffset * speed)
      element.style.transform = `translateY(${yPos}px)`
    })
  })
}

// Masonry Layout for Portfolio/Blog Grid
const masonryGrids = document.querySelectorAll('.masonry-grid')
if (masonryGrids.length > 0 && typeof Masonry !== 'undefined') {
  masonryGrids.forEach((grid) => {
    new Masonry(grid, {
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer',
      percentPosition: true,
    })
  })
}

// Lightbox for Portfolio Images
const lightboxImages = document.querySelectorAll('.lightbox-image')
if (lightboxImages.length > 0 && typeof GLightbox !== 'undefined') {
  GLightbox({
    selector: '.lightbox-image',
    touchNavigation: true,
    loop: true,
    autoplayVideos: true,
  })
}

// Animated Hamburger Menu
const hamburgerMenu = document.querySelector('.hamburger-menu')
if (hamburgerMenu) {
  hamburgerMenu.addEventListener('click', function () {
    this.classList.toggle('open')
  })
}

// Initialize AOS (Animate On Scroll) if available
if (typeof AOS !== 'undefined') {
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false,
  })
}

// Initialize GSAP animations if available
if (typeof gsap !== 'undefined') {
  // Hero section animations
  gsap.from('.hero-content h1', {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.2,
  })

  gsap.from('.hero-content p', {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.4,
  })

  gsap.from('.hero-content .btn', {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.6,
  })

  gsap.from('.hero-image', {
    opacity: 0,
    x: 50,
    duration: 1,
    delay: 0.8,
  })

  // ScrollTrigger for sections
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)

    gsap.utils.toArray('.animate-on-scroll').forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none none',
        },
      })
    })
  }
}

// Initialize Three.js background if available
if (typeof THREE !== 'undefined') {
  const threeContainer = document.getElementById('three-background')

  if (threeContainer) {
    // Set up scene
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    threeContainer.appendChild(renderer.domElement)

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 1500

    const posArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5
    }

    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(posArray, 3)
    )

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: 0x4361ee,
    })

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    camera.position.z = 2

    // Mouse movement effect
    let mouseX = 0
    let mouseY = 0

    function onDocumentMouseMove(event) {
      mouseX = (event.clientX - window.innerWidth / 2) / 100
      mouseY = (event.clientY - window.innerHeight / 2) / 100
    }

    document.addEventListener('mousemove', onDocumentMouseMove)

    // Animation loop
    function animate() {
      requestAnimationFrame(animate)

      particlesMesh.rotation.x += 0.001
      particlesMesh.rotation.y += 0.001

      // Follow mouse
      particlesMesh.rotation.x += mouseY * 0.01
      particlesMesh.rotation.y += mouseX * 0.01

      renderer.render(scene, camera)
    }

    animate()

    // Handle window resize
    window.addEventListener('resize', function () {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    })
  }
}

// Initialize Swiper slider if available
if (typeof Swiper !== 'undefined') {
  // Hero slider
  const heroSlider = new Swiper('.hero-slider', {
    slidesPerView: 1,
    effect: 'fade',
    speed: 1000,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  })
}

// Initialize Chart.js if available
if (typeof Chart !== 'undefined') {
  const chartElements = document.querySelectorAll('.chart-canvas')

  chartElements.forEach((canvas) => {
    const ctx = canvas.getContext('2d')
    const chartType = canvas.getAttribute('data-chart-type') || 'bar'
    const chartData = JSON.parse(canvas.getAttribute('data-chart-data') || '{}')

    new Chart(ctx, {
      type: chartType,
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    })
  })
}

// Initialize Lottie animations if available
if (typeof lottie !== 'undefined') {
  const lottieElements = document.querySelectorAll('.lottie-animation')

  lottieElements.forEach((element) => {
    const path = element.getAttribute('data-animation-path')
    if (!path) return

    lottie.loadAnimation({
      container: element,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: path,
    })
  })
}

// Initialize custom cursor if enabled
const customCursor = document.querySelector('.custom-cursor')
if (customCursor) {
  document.addEventListener('mousemove', function (e) {
    customCursor.style.left = e.clientX + 'px'
    customCursor.style.top = e.clientY + 'px'
  })

  // Add hover effect for links and buttons
  const interactiveElements = document.querySelectorAll(
    'a, button, .interactive'
  )
  interactiveElements.forEach((element) => {
    element.addEventListener('mouseenter', function () {
      customCursor.classList.add('expanded')
    })

    element.addEventListener('mouseleave', function () {
      customCursor.classList.remove('expanded')
    })
  })
}

// Initialize scroll-based animations
window.addEventListener('scroll', function () {
  // Parallax sections
  document.querySelectorAll('.parallax-section').forEach((section) => {
    const scrollPosition = window.pageYOffset
    const sectionSpeed = section.getAttribute('data-speed') || 0.5
    section.style.transform = `translateY(${scrollPosition * sectionSpeed}px)`
  })

  // Rotate elements on scroll
  document.querySelectorAll('.rotate-on-scroll').forEach((element) => {
    const scrollPosition = window.pageYOffset
    const rotationSpeed = element.getAttribute('data-rotation-speed') || 0.1
    element.style.transform = `rotate(${scrollPosition * rotationSpeed}deg)`
  })

  // Scale elements on scroll
  document.querySelectorAll('.scale-on-scroll').forEach((element) => {
    const scrollPosition = window.pageYOffset
    const scaleSpeed = element.getAttribute('data-scale-speed') || 0.001
    const baseScale = parseFloat(element.getAttribute('data-base-scale') || 1)
    const scale = baseScale + scrollPosition * scaleSpeed
    element.style.transform = `scale(${scale})`
  })
})

// Initialize custom video player controls
const videoPlayers = document.querySelectorAll('.custom-video-player')
videoPlayers.forEach((player) => {
  const video = player.querySelector('video')
  const playBtn = player.querySelector('.play-btn')
  const pauseBtn = player.querySelector('.pause-btn')
  const progressBar = player.querySelector('.video-progress')

  if (!video || !playBtn || !pauseBtn || !progressBar) return

  playBtn.addEventListener('click', function () {
    video.play()
    playBtn.style.display = 'none'
    pauseBtn.style.display = 'block'
  })

  pauseBtn.addEventListener('click', function () {
    video.pause()
    pauseBtn.style.display = 'none'
    playBtn.style.display = 'block'
  })

  video.addEventListener('timeupdate', function () {
    const progress = (video.currentTime / video.duration) * 100
    progressBar.style.width = progress + '%'
  })

  video.addEventListener('ended', function () {
    pauseBtn.style.display = 'none'
    playBtn.style.display = 'block'
    progressBar.style.width = '0%'
  })
})

// Initialize scroll snap sections if enabled
const scrollSnapContainer = document.querySelector('.scroll-snap-container')
if (scrollSnapContainer) {
  const sections = scrollSnapContainer.querySelectorAll('section')
  let currentSection = 0
  let isScrolling = false

  // Handle mouse wheel events
  window.addEventListener('wheel', function (e) {
    if (isScrolling) return

    isScrolling = true

    if (e.deltaY > 0 && currentSection < sections.length - 1) {
      // Scroll down
      currentSection++
    } else if (e.deltaY < 0 && currentSection > 0) {
      // Scroll up
      currentSection--
    }

    sections[currentSection].scrollIntoView({ behavior: 'smooth' })

    setTimeout(function () {
      isScrolling = false
    }, 1000)
  })
}

// Initialize scroll-based navigation highlighting
const navLinks = document.querySelectorAll('nav a[href^="#"]')
if (navLinks.length > 0) {
  window.addEventListener('scroll', function () {
    let currentSection = ''
    const scrollPosition = window.scrollY

    // Find the current section
    document.querySelectorAll('section[id]').forEach((section) => {
      const sectionTop = section.offsetTop - 100
      const sectionHeight = section.offsetHeight

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        currentSection = '#' + section.getAttribute('id')
      }
    })

    // Highlight the current nav link
    navLinks.forEach((link) => {
      link.classList.remove('active')
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active')
      }
    })
  })
}

// Initialize custom cursor
const cursor = document.querySelector('.custom-cursor')
if (cursor) {
  document.addEventListener('mousemove', function (e) {
    cursor.style.left = e.clientX + 'px'
    cursor.style.top = e.clientY + 'px'
  })

  // Add hover effect for links and buttons
  const interactiveElements = document.querySelectorAll(
    'a, button, .interactive'
  )
  interactiveElements.forEach((element) => {
    element.addEventListener('mouseenter', function () {
      cursor.classList.add('expanded')
    })

    element.addEventListener('mouseleave', function () {
      cursor.classList.remove('expanded')
    })
  })
}

// Initialize custom scrollbar
const scrollbar = document.querySelector('.custom-scrollbar')
if (scrollbar) {
  const content = document.querySelector('.scrollable-content')
  const thumb = scrollbar.querySelector('.scrollbar-thumb')

  if (content && thumb) {
    // Calculate thumb height
    const contentHeight = content.scrollHeight
    const viewportHeight = content.clientHeight
    const thumbHeight = (viewportHeight / contentHeight) * viewportHeight

    thumb.style.height = thumbHeight + 'px'

    // Update thumb position on scroll
    content.addEventListener('scroll', function () {
      const scrollPosition = content.scrollTop
      const maxScroll = contentHeight - viewportHeight
      const thumbPosition =
        (scrollPosition / maxScroll) * (viewportHeight - thumbHeight)

      thumb.style.top = thumbPosition + 'px'
    })
  }
}

// Initialize custom context menu
document.addEventListener('contextmenu', function (e) {
  const customContextMenu = document.querySelector('.custom-context-menu')

  if (customContextMenu) {
    e.preventDefault()

    // Position menu at cursor
    customContextMenu.style.left = e.clientX + 'px'
    customContextMenu.style.top = e.clientY + 'px'

    // Show menu
    customContextMenu.classList.add('active')

    // Hide menu when clicking elsewhere
    document.addEventListener('click', function hideMenu() {
      customContextMenu.classList.remove('active')
      document.removeEventListener('click', hideMenu)
    })
  }
})

// Initialize custom drag and drop
const draggableElements = document.querySelectorAll('.draggable')
draggableElements.forEach((element) => {
  element.addEventListener('mousedown', function (e) {
    if (e.target.classList.contains('handle') || e.target === this) {
      const rect = this.getBoundingClientRect()
      const offsetX = e.clientX - rect.left
      const offsetY = e.clientY - rect.top

      const moveElement = function (e) {
        element.style.left = e.clientX - offsetX + 'px'
        element.style.top = e.clientY - offsetY + 'px'
      }

      document.addEventListener('mousemove', moveElement)

      document.addEventListener('mouseup', function stopMoving() {
        document.removeEventListener('mousemove', moveElement)
        document.removeEventListener('mouseup', stopMoving)
      })
    }
  })
})

// Initialize custom resizable elements
const resizableElements = document.querySelectorAll('.resizable')
resizableElements.forEach((element) => {
  const resizeHandle = document.createElement('div')
  resizeHandle.className = 'resize-handle'
  element.appendChild(resizeHandle)

  resizeHandle.addEventListener('mousedown', function (e) {
    e.preventDefault()

    const startX = e.clientX
    const startY = e.clientY
    const startWidth = element.offsetWidth
    const startHeight = element.offsetHeight

    const resize = function (e) {
      element.style.width = startWidth + e.clientX - startX + 'px'
      element.style.height = startHeight + e.clientY - startY + 'px'
    }

    document.addEventListener('mousemove', resize)

    document.addEventListener('mouseup', function stopResize() {
      document.removeEventListener('mousemove', resize)
      document.removeEventListener('mouseup', stopResize)
    })
  })
})

// Initialize lazy loading for iframes
const lazyIframes = document.querySelectorAll('iframe[data-src]')
if (lazyIframes.length > 0) {
  const iframeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const iframe = entry.target
        iframe.src = iframe.dataset.src
        iframe.removeAttribute('data-src')
        observer.unobserve(iframe)
      }
    })
  })

  lazyIframes.forEach((iframe) => {
    iframeObserver.observe(iframe)
  })
}

// Initialize custom form validation
const validatedForms = document.querySelectorAll('form[data-validate]')
validatedForms.forEach((form) => {
  form.addEventListener('submit', function (e) {
    let isValid = true

    // Validate required fields
    const requiredFields = form.querySelectorAll('[required]')
    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        isValid = false
        field.classList.add('invalid')

        // Add error message if not exists
        let errorMessage = field.nextElementSibling
        if (
          !errorMessage ||
          !errorMessage.classList.contains('error-message')
        ) {
          errorMessage = document.createElement('div')
          errorMessage.className = 'error-message'
          errorMessage.textContent = 'This field is required'
          field.parentNode.insertBefore(errorMessage, field.nextSibling)
        }
      } else {
        field.classList.remove('invalid')

        // Remove error message if exists
        const errorMessage = field.nextElementSibling
        if (errorMessage && errorMessage.classList.contains('error-message')) {
          errorMessage.remove()
        }
      }
    })

    // Validate email fields
    const emailFields = form.querySelectorAll('input[type="email"]')
    emailFields.forEach((field) => {
      if (
        field.value.trim() &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)
      ) {
        isValid = false
        field.classList.add('invalid')

        // Add error message if not exists
        let errorMessage = field.nextElementSibling
        if (
          !errorMessage ||
          !errorMessage.classList.contains('error-message')
        ) {
          errorMessage = document.createElement('div')
          errorMessage.className = 'error-message'
          errorMessage.textContent = 'Please enter a valid email address'
          field.parentNode.insertBefore(errorMessage, field.nextSibling)
        }
      }
    })

    if (!isValid) {
      e.preventDefault()
    }
  })
})

// Initialize custom tooltips
const tooltipElements = document.querySelectorAll('[data-tooltip]')
tooltipElements.forEach((element) => {
  const tooltipText = element.getAttribute('data-tooltip')

  if (!tooltipText) return

  // Create tooltip element
  const tooltip = document.createElement('div')
  tooltip.className = 'tooltip'
  tooltip.textContent = tooltipText

  // Add tooltip to element
  element.appendChild(tooltip)

  // Show/hide tooltip on hover
  element.addEventListener('mouseenter', function () {
    tooltip.classList.add('active')
  })

  element.addEventListener('mouseleave', function () {
    tooltip.classList.remove('active')
  })
})

// Initialize custom popover
const popoverTriggers = document.querySelectorAll('[data-popover]')
popoverTriggers.forEach((trigger) => {
  const popoverId = trigger.getAttribute('data-popover')
  const popover = document.getElementById(popoverId)

  if (!popover) return

  trigger.addEventListener('click', function (e) {
    e.preventDefault()

    // Position popover
    const triggerRect = trigger.getBoundingClientRect()
    popover.style.top = triggerRect.bottom + window.scrollY + 'px'
    popover.style.left = triggerRect.left + window.scrollX + 'px'

    // Toggle popover
    popover.classList.toggle('active')

    // Close popover when clicking outside
    document.addEventListener('click', function closePopover(e) {
      if (!popover.contains(e.target) && e.target !== trigger) {
        popover.classList.remove('active')
        document.removeEventListener('click', closePopover)
      }
    })
  })
})

// Initialize custom tabs
const tabContainers = document.querySelectorAll('.tabs-container')
tabContainers.forEach((container) => {
  const tabButtons = container.querySelectorAll('.tab-button')
  const tabPanels = container.querySelectorAll('.tab-panel')

  tabButtons.forEach((button, index) => {
    button.addEventListener('click', function () {
      // Deactivate all tabs
      tabButtons.forEach((btn) => btn.classList.remove('active'))
      tabPanels.forEach((panel) => panel.classList.remove('active'))

      // Activate clicked tab
      button.classList.add('active')
      tabPanels[index].classList.add('active')
    })
  })
})

// Initialize custom accordion
const accordionContainers = document.querySelectorAll('.accordion-container')
accordionContainers.forEach((container) => {
  const accordionItems = container.querySelectorAll('.accordion-item')

  accordionItems.forEach((item) => {
    const header = item.querySelector('.accordion-header')
    const content = item.querySelector('.accordion-content')

    if (!header || !content) return

    header.addEventListener('click', function () {
      // Check if accordion is set to allow multiple open items
      const allowMultiple =
        container.getAttribute('data-allow-multiple') === 'true'

      if (!allowMultiple) {
        // Close all other items
        accordionItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove('active')
          }
        })
      }

      // Toggle current item
      item.classList.toggle('active')
    })
  })
})

// Initialize custom carousel
const carousels = document.querySelectorAll('.carousel')
carousels.forEach((carousel) => {
  const slides = carousel.querySelectorAll('.carousel-slide')
  const prevBtn = carousel.querySelector('.carousel-prev')
  const nextBtn = carousel.querySelector('.carousel-next')
  const indicators = carousel.querySelector('.carousel-indicators')

  if (slides.length === 0) return

  let currentSlide = 0

  // Create indicators if container exists
  if (indicators) {
    slides.forEach((_, index) => {
      const indicator = document.createElement('button')
      indicator.className = 'carousel-indicator'
      if (index === 0) indicator.classList.add('active')

      indicator.addEventListener('click', function () {
        goToSlide(index)
      })

      indicators.appendChild(indicator)
    })
  }

  // Function to update slide position
  const updateSlides = function () {
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`
    })

    // Update indicators
    if (indicators) {
      const indicatorButtons = indicators.querySelectorAll(
        '.carousel-indicator'
      )
      indicatorButtons.forEach((indicator, index) => {
        if (index === currentSlide) {
          indicator.classList.add('active')
        } else {
          indicator.classList.remove('active')
        }
      })
    }
  }

  // Function to go to specific slide
  const goToSlide = function (index) {
    currentSlide = index

    if (currentSlide < 0) {
      currentSlide = slides.length - 1
    } else if (currentSlide >= slides.length) {
      currentSlide = 0
    }

    updateSlides()
  }

  // Initialize slide positions
  updateSlides()

  // Add event listeners for controls
  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      goToSlide(currentSlide - 1)
    })
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      goToSlide(currentSlide + 1)
    })
  }

  // Auto-advance slides if enabled
  const autoplay = carousel.getAttribute('data-autoplay') === 'true'
  const interval = parseInt(carousel.getAttribute('data-interval') || 5000)

  if (autoplay) {
    setInterval(function () {
      goToSlide(currentSlide + 1)
    }, interval)
  }

  // Enable touch swiping for mobile
  let touchStartX = 0
  let touchEndX = 0

  carousel.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].screenX
  })

  carousel.addEventListener('touchend', function (e) {
    touchEndX = e.changedTouches[0].screenX

    if (touchStartX - touchEndX > 50) {
      // Swipe left
      goToSlide(currentSlide + 1)
    } else if (touchEndX - touchStartX > 50) {
      // Swipe right
      goToSlide(currentSlide - 1)
    }
  })
})
// This block appears to be misplaced and causing syntax errors.
// It looks like a partial snippet from another function.
// Removing it to resolve the "Declaration or statement expected" errors.

// Initialize custom dropdown menus
const dropdowns = document.querySelectorAll('.custom-dropdown')
dropdowns.forEach((dropdown) => {
  const toggle = dropdown.querySelector('.dropdown-toggle')
  const menu = dropdown.querySelector('.dropdown-menu')

  if (!toggle || !menu) return

  toggle.addEventListener('click', function (e) {
    e.preventDefault()
    e.stopPropagation()
    menu.classList.toggle('active')
  })

  // Close dropdown when clicking outside
  document.addEventListener('click', function (e) {
    if (!dropdown.contains(e.target)) {
      menu.classList.remove('active')
    }
  })
})

// Initialize custom audio player
const audioPlayers = document.querySelectorAll('.custom-audio-player')
audioPlayers.forEach((player) => {
  const audio = player.querySelector('audio')
  const playBtn = player.querySelector('.play-btn')
  const pauseBtn = player.querySelector('.pause-btn')
  const progressBar = player.querySelector('.audio-progress')

  if (!audio || !playBtn || !pauseBtn || !progressBar) return

  playBtn.addEventListener('click', function () {
    audio.play()
    playBtn.style.display = 'none'
    pauseBtn.style.display = 'block'
  })

  pauseBtn.addEventListener('click', function () {
    audio.pause()
    pauseBtn.style.display = 'none'
    playBtn.style.display = 'block'
  })

  audio.addEventListener('timeupdate', function () {
    const progress = (audio.currentTime / audio.duration) * 100
    progressBar.style.width = progress + '%'
  })

  audio.addEventListener('ended', function () {
    pauseBtn.style.display = 'none'
    playBtn.style.display = 'block'
    progressBar.style.width = '0%'
  })
})

// Initialize custom file upload
const fileUploads = document.querySelectorAll('.custom-file-upload')
fileUploads.forEach((upload) => {
  const input = upload.querySelector('input[type="file"]')
  const label = upload.querySelector('label')
  const preview = upload.querySelector('.file-preview')

  if (!input || !label) return

  input.addEventListener('change', function () {
    if (this.files && this.files[0]) {
      const fileName = this.files[0].name
      label.querySelector('span').textContent = fileName

      // Show preview for images
      if (preview && this.files[0].type.match('image.*')) {
        const reader = new FileReader()

        reader.onload = function (e) {
          preview.style.backgroundImage = `url(${e.target.result})`
          preview.classList.add('has-preview')
        }

        reader.readAsDataURL(this.files[0])
      }
    }
  })
})

// Initialize custom range sliders
const rangeSliders = document.querySelectorAll('.custom-range-slider')
rangeSliders.forEach((slider) => {
  const input = slider.querySelector('input[type="range"]')
  const value = slider.querySelector('.range-value')

  if (!input || !value) return

  // Set initial value
  value.textContent = input.value

  // Update value on input change
  input.addEventListener('input', function () {
    value.textContent = this.value
  })
})

// Initialize custom select dropdowns
const customSelects = document.querySelectorAll('.custom-select')
customSelects.forEach((select) => {
  const selectBtn = select.querySelector('.select-btn')
  const selectOptions = select.querySelector('.select-options')
  const options = select.querySelectorAll('.select-option')
  const hiddenInput = select.querySelector('input[type="hidden"]')

  if (!selectBtn || !selectOptions || options.length === 0) return

  selectBtn.addEventListener('click', function () {
    selectOptions.classList.toggle('active')
  })

  options.forEach((option) => {
    option.addEventListener('click', function () {
      const value = this.getAttribute('data-value')
      const text = this.textContent

      selectBtn.textContent = text
      if (hiddenInput) hiddenInput.value = value

      options.forEach((opt) => opt.classList.remove('selected'))
      this.classList.add('selected')

      selectOptions.classList.remove('active')

      // Trigger change event
      if (hiddenInput) {
        const event = new Event('change')
        hiddenInput.dispatchEvent(event)
      }
    })
  })

  // Close dropdown when clicking outside
  document.addEventListener('click', function (e) {
    if (!select.contains(e.target)) {
      selectOptions.classList.remove('active')
    }
  })
})

// Initialize custom modal dialogs
const modalTriggers = document.querySelectorAll('[data-modal]')
modalTriggers.forEach((trigger) => {
  const modalId = trigger.getAttribute('data-modal')
  const modal = document.getElementById(modalId)

  if (!modal) return

  const closeBtn = modal.querySelector('.modal-close')

  trigger.addEventListener('click', function (e) {
    e.preventDefault()
    modal.classList.add('active')
    document.body.classList.add('modal-open')
  })

  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      modal.classList.remove('active')
      document.body.classList.remove('modal-open')
    })
  }

  // Close modal when clicking on overlay
  modal.addEventListener('click', function (e) {
    if (e.target === modal) {
      modal.classList.remove('active')
      document.body.classList.remove('modal-open')
    }
  })

  // Close modal with Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active')
      document.body.classList.remove('modal-open')
    }
  })
})

// Initialize custom notifications
function showNotification(message, type = 'info', duration = 3000) {
  const notification = document.createElement('div')
  notification.className = `notification notification-${type}`
  notification.textContent = message

  document.body.appendChild(notification)

  // Show notification
  setTimeout(() => {
    notification.classList.add('active')
  }, 10)

  // Hide and remove notification after duration
  setTimeout(() => {
    notification.classList.remove('active')

    // Remove from DOM after animation
    setTimeout(() => {
      notification.remove()
    }, 300)
  }, duration)
}

// Example usage of notification system
const notificationTriggers = document.querySelectorAll('[data-notification]')
notificationTriggers.forEach((trigger) => {
  trigger.addEventListener('click', function () {
    const message =
      this.getAttribute('data-notification-message') || 'Notification message'
    const type = this.getAttribute('data-notification-type') || 'info'
    const duration = parseInt(
      this.getAttribute('data-notification-duration') || 3000
    )

    showNotification(message, type, duration)
  })
})

// Initialize copy to clipboard functionality
const copyButtons = document.querySelectorAll('.copy-btn')
copyButtons.forEach((button) => {
  button.addEventListener('click', function () {
    const textToCopy =
      this.getAttribute('data-copy-text') ||
      this.previousElementSibling.textContent

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        // Show success message
        const originalText = this.textContent
        this.textContent = 'Copied!'

        setTimeout(() => {
          this.textContent = originalText
        }, 2000)
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err)
      })
  })
})

// Initialize back to top button
const backToTopBtn = document.querySelector('.back-to-top')
if (backToTopBtn) {
  window.addEventListener('scroll', function () {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('visible')
    } else {
      backToTopBtn.classList.remove('visible')
    }
  })

  backToTopBtn.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  })
}

// Initialize custom countdown timer
const countdownTimers = document.querySelectorAll('.countdown-timer')
countdownTimers.forEach((timer) => {
  const targetDate = new Date(timer.getAttribute('data-target-date')).getTime()
  const daysElement = timer.querySelector('.days')
  const hoursElement = timer.querySelector('.hours')
  const minutesElement = timer.querySelector('.minutes')
  const secondsElement = timer.querySelector('.seconds')

  if (
    !targetDate ||
    !daysElement ||
    !hoursElement ||
    !minutesElement ||
    !secondsElement
  )
    return

  const updateCountdown = function () {
    const now = new Date().getTime()
    const distance = targetDate - now

    if (distance < 0) {
      clearInterval(interval)
      timer.innerHTML = '<div class="expired">Expired</div>'
      return
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)

    daysElement.textContent = days.toString().padStart(2, '0')
    hoursElement.textContent = hours.toString().padStart(2, '0')
    minutesElement.textContent = minutes.toString().padStart(2, '0')
    secondsElement.textContent = seconds.toString().padStart(2, '0')
  }

  // Initial update
  updateCountdown()

  // Update every second
  const interval = setInterval(updateCountdown, 1000)
})

// Initialize custom star rating
const starRatings = document.querySelectorAll('.star-rating')
starRatings.forEach((rating) => {
  const stars = rating.querySelectorAll('.star')
  const hiddenInput = rating.querySelector('input[type="hidden"]')

  stars.forEach((star, index) => {
    // Hover effect
    star.addEventListener('mouseover', function () {
      for (let i = 0; i <= index; i++) {
        stars[i].classList.add('hover')
      }
    })

    star.addEventListener('mouseout', function () {
      stars.forEach((s) => s.classList.remove('hover'))
    })

    // Click event
    star.addEventListener('click', function () {
      const value = index + 1

      stars.forEach((s, i) => {
        if (i < value) {
          s.classList.add('active')
        } else {
          s.classList.remove('active')
        }
      })

      if (hiddenInput) {
        hiddenInput.value = value

        // Trigger change event
        const event = new Event('change')
        hiddenInput.dispatchEvent(event)
      }
    })
  })
})

// Initialize custom image comparison slider
const imageComparisons = document.querySelectorAll('.image-comparison')
imageComparisons.forEach((comparison) => {
  const slider = comparison.querySelector('.comparison-slider')
  const beforeImage = comparison.querySelector('.before-image')

  if (!slider || !beforeImage) return

  let isActive = false

  // Set initial position
  const setPosition = function (x) {
    const rect = comparison.getBoundingClientRect()
    const position = Math.max(0, Math.min(x - rect.left, rect.width))
    const percentage = (position / rect.width) * 100

    slider.style.left = `${percentage}%`
    beforeImage.style.width = `${percentage}%`
  }

  // Initial position at 50%
  setPosition(
    comparison.getBoundingClientRect().width / 2 +
      comparison.getBoundingClientRect().left
  )

  // Mouse events
  slider.addEventListener('mousedown', function () {
    isActive = true
  })

  window.addEventListener('mouseup', function () {
    isActive = false
  })

  window.addEventListener('mousemove', function (e) {
    if (!isActive) return
    setPosition(e.clientX)
  })

  // Touch events
  slider.addEventListener('touchstart', function () {
    isActive = true
  })

  window.addEventListener('touchend', function () {
    isActive = false
  })

  window.addEventListener('touchmove', function (e) {
    if (!isActive) return
    setPosition(e.touches[0].clientX)
  })
})

// Initialize custom color picker
const colorPickers = document.querySelectorAll('.color-picker')
colorPickers.forEach((picker) => {
  const input = picker.querySelector('input[type="color"]')
  const preview = picker.querySelector('.color-preview')
  const value = picker.querySelector('.color-value')

  if (!input || !preview) return

  // Set initial color
  if (preview) preview.style.backgroundColor = input.value
  if (value) value.textContent = input.value

  input.addEventListener('input', function () {
    if (preview) preview.style.backgroundColor = this.value
    if (value) value.textContent = this.value
  })
})

// Initialize custom password strength meter
const passwordInputs = document.querySelectorAll(
  'input[type="password"][data-strength-meter]'
)
passwordInputs.forEach((input) => {
  const meter = document.createElement('div')
  meter.className = 'password-strength-meter'
  meter.innerHTML = `
        <div class="strength-bar"></div>
        <div class="strength-text">Password strength: <span>None</span></div>
    `

  input.parentNode.insertBefore(meter, input.nextSibling)

  const strengthBar = meter.querySelector('.strength-bar')
  const strengthText = meter.querySelector('.strength-text span')

  input.addEventListener('input', function () {
    const password = this.value
    let strength = 0

    if (password.length >= 8) strength += 1
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 1
    if (password.match(/\d/)) strength += 1
    if (password.match(/[^a-zA-Z\d]/)) strength += 1

    switch (strength) {
      case 0:
        strengthBar.style.width = '0%'
        strengthBar.className = 'strength-bar'
        strengthText.textContent = 'None'
        break
      case 1:
        strengthBar.style.width = '25%'
        strengthBar.className = 'strength-bar weak'
        strengthText.textContent = 'Weak'
        break
      case 2:
        strengthBar.style.width = '50%'
        strengthBar.className = 'strength-bar medium'
        strengthText.textContent = 'Medium'
        break
      case 3:
        strengthBar.style.width = '75%'
        strengthBar.className = 'strength-bar strong'
        strengthText.textContent = 'Strong'
        break
      case 4:
        strengthBar.style.width = '100%'
        strengthBar.className = 'strength-bar very-strong'
        strengthText.textContent = 'Very Strong'
        break
    }
  })
})

// Initialize custom tags input
const tagsInputs = document.querySelectorAll('.tags-input')
tagsInputs.forEach((container) => {
  const input = container.querySelector('input[type="text"]')
  const hiddenInput = container.querySelector('input[type="hidden"]')
  const tagsList = container.querySelector('.tags-list')

  if (!input || !tagsList) return

  const tags = []

  const updateTags = function () {
    // Clear tags list
    tagsList.innerHTML = ''

    // Add tags to list
    tags.forEach((tag) => {
      const tagElement = document.createElement('div')
      tagElement.className = 'tag'
      tagElement.innerHTML = `
                <span>${tag}</span>
                <button type="button" class="remove-tag">&times;</button>
            `

      tagsList.appendChild(tagElement)

      // Remove tag on click
      tagElement
        .querySelector('.remove-tag')
        .addEventListener('click', function () {
          const index = tags.indexOf(tag)
          if (index !== -1) {
            tags.splice(index, 1)
            updateTags()
          }
        })
    })

    // Update hidden input
    if (hiddenInput) {
      hiddenInput.value = JSON.stringify(tags)
    }
  }

  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()

      const tag = this.value.trim()

      if (tag && !tags.includes(tag)) {
        tags.push(tag)
        updateTags()
        this.value = ''
      }
    }
  })
})

// Initialize custom date picker
const datePickers = document.querySelectorAll('.date-picker')
datePickers.forEach((picker) => {
  const input = picker.querySelector('input[type="text"]')
  const hiddenInput = picker.querySelector('input[type="hidden"]')

  if (!input) return

  // Use native date picker for mobile
  if (window.innerWidth <= 768) {
    input.type = 'date'
    return
  }

  // Initialize flatpickr if available
  if (typeof flatpickr !== 'undefined') {
    flatpickr(input, {
      dateFormat: 'Y-m-d',
      onChange: function (selectedDates, dateStr) {
        if (hiddenInput) {
          hiddenInput.value = dateStr
        }
      },
    })
  }
})

// Initialize custom time picker
const timePickers = document.querySelectorAll('.time-picker')
timePickers.forEach((picker) => {
  const input = picker.querySelector('input[type="text"]')
  const hiddenInput = picker.querySelector('input[type="hidden"]')

  if (!input) return

  // Use native time picker for mobile
  if (window.innerWidth <= 768) {
    input.type = 'time'
    return
  }

  // Initialize flatpickr if available
  if (typeof flatpickr !== 'undefined') {
    flatpickr(input, {
      enableTime: true,
      noCalendar: true,
      dateFormat: 'H:i',
      onChange: function (selectedDates, timeStr) {
        if (hiddenInput) {
          hiddenInput.value = timeStr
        }
      },
    })
  }
})

// Initialize custom number input with increment/decrement buttons
const numberInputs = document.querySelectorAll('.number-input')
numberInputs.forEach((container) => {
  const input = container.querySelector('input[type="number"]')
  const decrementBtn = container.querySelector('.decrement')
  const incrementBtn = container.querySelector('.increment')

  if (!input || !decrementBtn || !incrementBtn) return

  const min = parseFloat(input.getAttribute('min') || 0)
  const max = parseFloat(input.getAttribute('max') || Infinity)
  const step = parseFloat(input.getAttribute('step') || 1)

  decrementBtn.addEventListener('click', function () {
    const currentValue = parseFloat(input.value) || 0
    const newValue = Math.max(min, currentValue - step)
    input.value = newValue

    // Trigger change event
    const event = new Event('change')
    input.dispatchEvent(event)
  })

  incrementBtn.addEventListener('click', function () {
    const currentValue = parseFloat(input.value) || 0
    const newValue = Math.min(max, currentValue + step)
    input.value = newValue

    // Trigger change event
    const event = new Event('change')
    input.dispatchEvent(event)
  })
})

// Initialize custom toggle switch
const toggleSwitches = document.querySelectorAll('.toggle-switch')
toggleSwitches.forEach((toggle) => {
  const input = toggle.querySelector('input[type="checkbox"]')
  const slider = toggle.querySelector('.slider')

  if (!input || !slider) return

  slider.addEventListener('click', function () {
    input.checked = !input.checked

    // Trigger change event
    const event = new Event('change')
    input.dispatchEvent(event)
  })
})

// Initialize custom scroll animations
window.addEventListener('load', function () {
  // Add animation classes to elements when they come into view
  const animatedElements = document.querySelectorAll('.animate-on-scroll')

  if (animatedElements.length === 0) return

  const animationObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 }
  )

  animatedElements.forEach((element) => {
    animationObserver.observe(element)
  })
})

// Initialize custom scroll-based navigation
const scrollNav = document.querySelector('.scroll-nav')
if (scrollNav) {
  const sections = document.querySelectorAll('section[id]')
  const navLinks = scrollNav.querySelectorAll('a')

  window.addEventListener('scroll', function () {
    let current = ''

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight

      if (
        window.pageYOffset >= sectionTop - 200 &&
        window.pageYOffset < sectionTop + sectionHeight - 200
      ) {
        current = section.getAttribute('id')
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove('active')
      if (current && link.getAttribute('href').includes(current)) {
        link.classList.add('active')
      }
    })
  })
}

// FAQ Accordion Functionality (Modern Style)
document.addEventListener('DOMContentLoaded', function () {
  const faqAccordion = document.querySelector('.faq-accordion');
  if (!faqAccordion) return;
  const faqItems = faqAccordion.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', function () {
      // Close all other items
      faqItems.forEach((other) => {
        if (other !== item) other.classList.remove('active');
      });
      // Toggle current item
      item.classList.toggle('active');
    });
  });
});

// Contact Success Modal Logic
function initContactSuccessModal() {
  const form = document.getElementById('contactForm');
  const modal = document.getElementById('contact-success-modal');
  const closeBtn = document.querySelector('.close-success-modal');
  if (!form || !modal) return;

  // Intercept form submit (simulate AJAX for demo)
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    // Optionally, add loading state here
    setTimeout(() => {
      modal.style.display = 'flex';
      form.reset();
      // Optionally, remove loading state here
    }, 600); // Simulate network delay
  });

  // Close modal on button click
  closeBtn.addEventListener('click', function () {
    modal.style.display = 'none';
  });
  // Close modal on overlay click
  modal.addEventListener('click', function (e) {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
}
document.addEventListener('DOMContentLoaded', function () {
  initContactSuccessModal();
});

    
    // Ensure initialization happens after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            console.log('VisionsCraft: All modules loaded and ready');
        });
    } else {
        console.log('VisionsCraft: DOM already ready');
    }
    
})();
