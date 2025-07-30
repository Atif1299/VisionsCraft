// ===== PRELOADER MODULE =====

export function initPreloader() {
  const preloader = document.querySelector('.preloader')

  if (!preloader) {
    console.warn('Preloader element not found')
    return
  }

  // Set minimum preloader display time
  const minDisplayTime = 1000 // 1 second
  const startTime = Date.now()

  function hidePreloader() {
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
