// ===== SCROLL EFFECTS MODULE =====

export function initScrollReveal() {
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

export function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress')

  if (!progressBar) return

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset
    const docHeight = document.body.scrollHeight - window.innerHeight
    const scrollPercent = (scrollTop / docHeight) * 100

    progressBar.style.width = scrollPercent + '%'
  })
}

export function initScrollToTop() {
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

export function initHeaderScroll() {
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
