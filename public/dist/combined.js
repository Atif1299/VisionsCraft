
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
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
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

    /* ==== public/js/utils/utilities.js ==== */
// ===== UTILITIES MODULE =====

window.showNotification = function(message, type = 'info', duration = 3000) {
  const notification = document.createElement('div')
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `

  document.body.appendChild(notification)

  // Auto remove
  const autoRemove = setTimeout(() => {
    removeNotification(notification)
  }, duration)

  // Manual close
  const closeBtn = notification.querySelector('.notification-close')
  closeBtn.addEventListener('click', () => {
    clearTimeout(autoRemove)
    removeNotification(notification)
  })

  // Show notification
  setTimeout(() => {
    notification.classList.add('show')
  }, 100)
}

window.removeNotification = function(notification) {
  notification.classList.add('hide')
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification)
    }
  }, 300)
}

window.debounce = function(func, wait) {
  let timeout
  return window.executedFunction = function(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

window.throttle = function(func, limit) {
  let inThrottle
  return function () {
    const args = arguments
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

window.getElementPosition = function(element) {
  const rect = element.getBoundingClientRect()
  return {
    top: rect.top + window.pageYOffset,
    left: rect.left + window.pageXOffset,
    width: rect.width,
    height: rect.height,
  }
}

window.isElementInViewport = function(element, threshold = 0) {
  const rect = element.getBoundingClientRect()
  const viewHeight = window.innerHeight || document.documentElement.clientHeight
  const viewWidth = window.innerWidth || document.documentElement.clientWidth

  return (
    rect.top >= -threshold &&
    rect.left >= -threshold &&
    rect.bottom <= viewHeight + threshold &&
    rect.right <= viewWidth + threshold
  )
}

// Tech Icon Mapping - moved from main.js
const techIconMap = {
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
}


    /* ==== public/js/core/preloader.js ==== */
// ===== PRELOADER MODULE =====

window.initPreloader = function() {
  const preloader = document.querySelector('.preloader')

  if (!preloader) {
    console.warn('Preloader element not found')
    return
  }

  // Set minimum preloader display time
  const minDisplayTime = 1000 // 1 second
  const startTime = Date.now()

  window.hidePreloader = function() {
    const elapsedTime = Date.now() - startTime
    const remainingTime = Math.max(0, minDisplayTime - elapsedTime)

    setTimeout(() => {
      preloader.style.opacity = '0'
      setTimeout(() => {
        preloader.style.display = 'none'
        document.body.classList.add('loaded')

        // Initialize particles after preloader is hidden
        if (typeof initParticles === 'function') {
          initParticles()
        }

        // Trigger any animations that wait for page load
        document.dispatchEvent(new Event('pageLoaded'))
      }, 500)
    }, remainingTime)
  }

  // Hide preloader when page is fully loaded
  if (document.readyState === 'complete') {
    hidePreloader()
  } else {
    window.addEventListener('load', hidePreloader)
  }

  // Fallback: hide preloader after maximum wait time
  setTimeout(() => {
    if (preloader.style.display !== 'none') {
      console.warn('Preloader timeout reached, hiding preloader')
      hidePreloader()
    }
  }, 5000) // 5 seconds maximum
}


    /* ==== public/js/navigation/mobile-menu.js ==== */
// ===== MOBILE MENU MODULE =====

window.initMobileMenu = function() {
  const hamburger = document.querySelector('.hamburger')
  const navLinks = document.querySelector('.nav-links')
  const header = document.querySelector('.header')

  if (!hamburger || !navLinks) {
    console.warn('Mobile menu elements not found')
    return
  }

  // Toggle mobile menu
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active')
    navLinks.classList.toggle('active')
    document.body.classList.toggle('menu-open')
  })

  // Close menu when clicking on nav links
  const navItems = navLinks.querySelectorAll('a')
  navItems.forEach((item) => {
    item.addEventListener('click', () => {
      hamburger.classList.remove('active')
      navLinks.classList.remove('active')
      document.body.classList.remove('menu-open')
    })
  })

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      hamburger.classList.remove('active')
      navLinks.classList.remove('active')
      document.body.classList.remove('menu-open')
    }
  })

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      hamburger.classList.remove('active')
      navLinks.classList.remove('active')
      document.body.classList.remove('menu-open')
    }
  })
}


    /* ==== public/js/effects/scroll-effects.js ==== */
// ===== SCROLL EFFECTS MODULE =====

window.initScrollReveal = function() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed')
      }
    })
  }, observerOptions)

  // Observe all elements with scroll reveal classes
  const elementsToReveal = document.querySelectorAll(
    '.scroll-reveal, .fade-in-up, .fade-in-left, .fade-in-right, .fade-in-down'
  )

  elementsToReveal.forEach((el) => observer.observe(el))
}

window.initScrollProgress = function() {
  const progressBar = document.querySelector('.scroll-progress')

  if (!progressBar) return

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset
    const docHeight = document.body.scrollHeight - window.innerHeight
    const scrollPercent = (scrollTop / docHeight) * 100

    progressBar.style.width = scrollPercent + '%'
  })
}

window.initScrollToTop = function() {
  const scrollToTopBtn = document.getElementById('scrollToTop')

  if (!scrollToTopBtn) return

  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add('visible')
    } else {
      scrollToTopBtn.classList.remove('visible')
    }
  })

  // Smooth scroll to top
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  })
}

window.initHeaderScroll = function() {
  const header = document.querySelector('.header')
  let lastScrollTop = 0

  if (!header) return

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    if (scrollTop > 100) {
      header.classList.add('scrolled')

      // Hide header on scroll down, show on scroll up
      if (scrollTop > lastScrollTop && scrollTop > 200) {
        header.classList.add('hidden')
      } else {
        header.classList.remove('hidden')
      }
    } else {
      header.classList.remove('scrolled', 'hidden')
    }

    lastScrollTop = scrollTop
  })
}


    /* ==== public/js/effects/animations.js ==== */
// ===== ANIMATION EFFECTS MODULE =====

window.initTypingEffect = function() {
  const elements = document.querySelectorAll('.typing-effect')

  elements.forEach((element) => {
    const text = element.textContent
    const speed = parseInt(element.dataset.speed) || 50

    element.textContent = ''
    element.style.visibility = 'visible'

    let i = 0
    const typeWriter = () => {
      if (i < text.length) {
        element.textContent += text.charAt(i)
        i++
        setTimeout(typeWriter, speed)
      }
    }

    // Start typing when element comes into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          typeWriter()
          observer.unobserve(entry.target)
        }
      })
    })

    observer.observe(element)
  })
}

window.initCounters = function() {
  const counters = document.querySelectorAll('.counter')

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target
          const target = parseInt(counter.dataset.target)
          const duration = parseInt(counter.dataset.duration) || 2000
          const increment = target / (duration / 16) // 60fps

          let current = 0
          const updateCounter = () => {
            current += increment
            if (current < target) {
              counter.textContent = Math.floor(current)
              requestAnimationFrame(updateCounter)
            } else {
              counter.textContent = target
            }
          }

          updateCounter()
          observer.unobserve(counter)
        }
      })
    },
    { threshold: 0.5 }
  )

  counters.forEach((counter) => observer.observe(counter))
}

window.initAnimatedCards = function() {
  const cards = document.querySelectorAll(
    '.service-card, .project-card, .blog-card'
  )

  cards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px)'
    })

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)'
    })
  })
}


    /* ==== public/js/components/ui-components.js ==== */
// ===== UI COMPONENTS MODULE =====

window.initAccordion = function() {
  const accordionItems = document.querySelectorAll('.accordion-item')

  accordionItems.forEach((item) => {
    const trigger = item.querySelector('.accordion-trigger')
    const content = item.querySelector('.accordion-content')

    if (!trigger || !content) return

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active')

      // Close all accordion items
      accordionItems.forEach((otherItem) => {
        otherItem.classList.remove('active')
        const otherContent = otherItem.querySelector('.accordion-content')
        if (otherContent) {
          otherContent.style.maxHeight = null
        }
      })

      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add('active')
        content.style.maxHeight = content.scrollHeight + 'px'
      }
    })
  })
}

window.initTabs = function() {
  const tabContainers = document.querySelectorAll('.tabs-container')

  tabContainers.forEach((container) => {
    const triggers = container.querySelectorAll('.tab-trigger')
    const contents = container.querySelectorAll('.tab-content')

    triggers.forEach((trigger, index) => {
      trigger.addEventListener('click', () => {
        // Remove active class from all triggers and contents
        triggers.forEach((t) => t.classList.remove('active'))
        contents.forEach((c) => c.classList.remove('active'))

        // Add active class to clicked trigger and corresponding content
        trigger.classList.add('active')
        if (contents[index]) {
          contents[index].classList.add('active')
        }
      })
    })
  })
}

window.initTooltips = function() {
  const tooltipElements = document.querySelectorAll('[data-tooltip]')

  tooltipElements.forEach((element) => {
    element.addEventListener('mouseenter', createTooltip)
    element.addEventListener('mouseleave', removeTooltip)
  })

  window.createTooltip = function(e) {
    const tooltip = document.createElement('div')
    tooltip.className = 'tooltip'
    tooltip.textContent = e.target.dataset.tooltip
    document.body.appendChild(tooltip)

    const rect = e.target.getBoundingClientRect()
    tooltip.style.left =
      rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px'
    tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px'
  }

  window.removeTooltip = function() {
    const tooltip = document.querySelector('.tooltip')
    if (tooltip) {
      tooltip.remove()
    }
  }
}

window.initFilterControls = function() {
  const filterButtons = document.querySelectorAll('.filter-btn')
  const filterItems = document.querySelectorAll('.filter-item')

  if (filterButtons.length === 0 || filterItems.length === 0) return

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove('active'))
      button.classList.add('active')

      // Filter items
      filterItems.forEach((item) => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'block'
          item.classList.add('fade-in')
        } else {
          item.style.display = 'none'
          item.classList.remove('fade-in')
        }
      })
    })
  })
}


    /* ==== public/js/components/sliders.js ==== */
// ===== SLIDERS AND CAROUSELS MODULE =====

window.initTestimonialsSlider = function() {
  const slider = document.querySelector('.testimonials-slider')
  const slides = document.querySelectorAll('.testimonial-slide')
  const prevBtn = document.querySelector('.slider-prev')
  const nextBtn = document.querySelector('.slider-next')
  const dots = document.querySelectorAll('.slider-dot')

  if (!slider || slides.length === 0) return

  let currentSlide = 0

  window.showSlide = function(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index)
    })

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index)
    })

    currentSlide = index
  }

  window.nextSlide = function() {
    const next = (currentSlide + 1) % slides.length
    showSlide(next)
  }

  window.prevSlide = function() {
    const prev = (currentSlide - 1 + slides.length) % slides.length
    showSlide(prev)
  }

  // Event listeners
  if (nextBtn) nextBtn.addEventListener('click', nextSlide)
  if (prevBtn) prevBtn.addEventListener('click', prevSlide)

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index))
  })

  // Auto-play
  const autoPlay = setInterval(nextSlide, 5000)

  // Pause auto-play on hover
  slider.addEventListener('mouseenter', () => clearInterval(autoPlay))
  slider.addEventListener('mouseleave', () => {
    setInterval(nextSlide, 5000)
  })

  // Initialize first slide
  showSlide(0)
}

// Initialize Swiper sliders if Swiper is available
window.initSwiperSliders = function() {
  if (typeof Swiper === 'undefined') return

  // Testimonials Swiper
  const testimonialsSwiper = new Swiper('.testimonials-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  })

  // Blog Swiper
  const blogSwiper = new Swiper('.blog-swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.blog-pagination',
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  })
}


    /* ==== public/js/main.js ==== */
document.addEventListener('DOMContentLoaded', function () {
  // Function to handle video lazy loading
  window.lazyLoadVideos = function() {
    const previews = document.querySelectorAll('.demo-preview');
    previews.forEach(preview => {
      const video = preview.querySelector('video[data-src]');
      const overlay = preview.querySelector('.demo-overlay');

      if (video) {
        preview.addEventListener('click', () => {
          if (video.paused) {
            // Load the video source only if it's not already loaded
            if (!video.src || !video.src.includes(video.getAttribute('data-src'))) {
                 video.src = video.getAttribute('data-src');
            }
            video.play();
            if (overlay) {
              overlay.style.opacity = '0'; // Hide the overlay
            }
          } else {
            video.pause();
            if (overlay) {
              overlay.style.opacity = '1'; // Show the overlay again if paused
            }
          }
        });
      }
    });
  }

  // Initialize video lazy loading
  lazyLoadVideos();
});


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
                    console.log(`Initialized: ${funcName}`);
                } catch (error) {
                    console.warn(`Error initializing ${funcName}:`, error);
                }
            } else {
                console.warn(`Function not found: ${funcName}`);
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
