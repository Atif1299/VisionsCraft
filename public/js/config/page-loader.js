// ===== PAGE-SPECIFIC MODULE LOADER =====

// Configuration for which modules to load on which pages
const pageConfigurations = {
  // Home page - full functionality
  home: {
    css: [
      '/css/base/variables.css',
      '/css/base/typography.css',
      '/css/components/buttons.css',
      '/css/components/preloader.css',
      '/css/components/notifications.css',
      '/css/layout/hero.css',
      '/css/layout/services.css',
      '/css/utilities/spacing.css',
      '/css/utilities/responsive.css',
    ],
    js: [
      '/js/core/preloader.js',
      '/js/navigation/mobile-menu.js',
      '/js/effects/scroll-effects.js',
      '/js/effects/animations.js',
      '/js/components/ui-components.js',
      '/js/components/sliders.js',
    ],
  },

  // About page - lighter functionality
  about: {
    css: [
      '/css/base/variables.css',
      '/css/base/typography.css',
      '/css/components/buttons.css',
      '/css/components/preloader.css',
      '/css/layout/about.css',
      '/css/utilities/spacing.css',
      '/css/utilities/responsive.css',
    ],
    js: [
      '/js/core/preloader.js',
      '/js/navigation/mobile-menu.js',
      '/js/effects/scroll-effects.js',
      '/js/effects/animations.js',
    ],
  },

  // Contact page
  contact: {
    css: [
      '/css/base/variables.css',
      '/css/base/typography.css',
      '/css/components/buttons.css',
      '/css/components/preloader.css',
      '/css/components/notifications.css',
      '/css/layout/contact.css',
      '/css/utilities/spacing.css',
      '/css/utilities/responsive.css',
    ],
    js: [
      '/js/core/preloader.js',
      '/js/navigation/mobile-menu.js',
      '/js/effects/scroll-effects.js',
      '/js/utils/utilities.js',
    ],
  },

  // Blog pages
  blog: {
    css: [
      '/css/base/variables.css',
      '/css/base/typography.css',
      '/css/components/buttons.css',
      '/css/components/preloader.css',
      '/css/layout/blog.css',
      '/css/utilities/spacing.css',
      '/css/utilities/responsive.css',
    ],
    js: [
      '/js/core/preloader.js',
      '/js/navigation/mobile-menu.js',
      '/js/effects/scroll-effects.js',
      '/js/components/ui-components.js',
    ],
  },

  // Services page
  services: {
    css: [
      '/css/base/variables.css',
      '/css/base/typography.css',
      '/css/components/buttons.css',
      '/css/components/preloader.css',
      '/css/layout/services.css',
      '/css/utilities/spacing.css',
      '/css/utilities/responsive.css',
    ],
    js: [
      '/js/core/preloader.js',
      '/js/navigation/mobile-menu.js',
      '/js/effects/scroll-effects.js',
      '/js/effects/animations.js',
      '/js/components/ui-components.js',
    ],
  },
}

// Dynamic loader function
export function loadPageAssets(pageName) {
  const config = pageConfigurations[pageName] || pageConfigurations.home

  // Load CSS files
  config.css.forEach((cssFile) => {
    if (!document.querySelector(`link[href="${cssFile}"]`)) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = cssFile
      document.head.appendChild(link)
    }
  })

  // Load JS modules
  Promise.all(config.js.map((jsFile) => import(jsFile)))
    .then((modules) => {
      console.log(`Page assets loaded for: ${pageName}`)
      // Initialize modules based on page needs
      initializePageModules(pageName, modules)
    })
    .catch((error) => {
      console.error('Error loading page assets:', error)
    })
}

function initializePageModules(pageName, modules) {
  // Common initialization for all pages
  modules.forEach((module) => {
    Object.keys(module).forEach((exportName) => {
      if (
        typeof module[exportName] === 'function' &&
        exportName.startsWith('init')
      ) {
        try {
          module[exportName]()
        } catch (error) {
          console.warn(`Error initializing ${exportName}:`, error)
        }
      }
    })
  })
}

// Auto-detect page and load appropriate assets
export function autoLoadPageAssets() {
  const path = window.location.pathname
  let pageName = 'home'

  if (path.includes('/about')) pageName = 'about'
  else if (path.includes('/contact')) pageName = 'contact'
  else if (path.includes('/blog')) pageName = 'blog'
  else if (path.includes('/services')) pageName = 'services'

  loadPageAssets(pageName)
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', autoLoadPageAssets)
} else {
  autoLoadPageAssets()
}
