// ===== ANIMATION EFFECTS MODULE =====

export function initTypingEffect() {
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

export function initCounters() {
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

export function initAnimatedCards() {
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
