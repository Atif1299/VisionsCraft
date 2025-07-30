// ===== MOBILE MENU MODULE =====

export function initMobileMenu() {
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
