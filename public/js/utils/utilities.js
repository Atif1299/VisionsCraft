// ===== UTILITIES MODULE =====

export function showNotification(message, type = 'info', duration = 3000) {
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

function removeNotification(notification) {
  notification.classList.add('hide')
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification)
    }
  }, 300)
}

export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export function throttle(func, limit) {
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

export function getElementPosition(element) {
  const rect = element.getBoundingClientRect()
  return {
    top: rect.top + window.pageYOffset,
    left: rect.left + window.pageXOffset,
    width: rect.width,
    height: rect.height,
  }
}

export function isElementInViewport(element, threshold = 0) {
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
export const techIconMap = {
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
