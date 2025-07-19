// Project Popup Functionality

document.addEventListener('DOMContentLoaded', function () {
  initProjectPopups()
})

function initProjectPopups() {
  // Get all project cards
  const projectCards = document.querySelectorAll('.case-study-item')

  if (!projectCards.length) return

  // Create popup overlay if it doesn't exist
  let popupOverlay = document.querySelector('.project-popup-overlay')

  if (!popupOverlay) {
    popupOverlay = document.createElement('div')
    popupOverlay.className = 'project-popup-overlay'
    document.body.appendChild(popupOverlay)

    // Create popup container
    const popupContainer = document.createElement('div')
    popupContainer.className = 'project-popup'
    popupOverlay.appendChild(popupContainer)

    // Create popup header
    const popupHeader = document.createElement('div')
    popupHeader.className = 'project-popup-header'
    popupContainer.appendChild(popupHeader)

    // Add title to header
    const popupTitle = document.createElement('h2')
    popupTitle.id = 'popup-title'
    popupHeader.appendChild(popupTitle)

    // Add close button to header
    const closeButton = document.createElement('button')
    closeButton.className = 'project-popup-close'
    closeButton.innerHTML = '&times;'
    closeButton.addEventListener('click', closePopup)
    popupHeader.appendChild(closeButton)

    // Create popup content container
    const popupContent = document.createElement('div')
    popupContent.className = 'project-popup-content'
    popupContainer.appendChild(popupContent)

    // Create media section
    const popupMedia = document.createElement('div')
    popupMedia.className = 'project-popup-media'
    popupContent.appendChild(popupMedia)

    // Create details section
    const popupDetails = document.createElement('div')
    popupDetails.className = 'project-popup-details'
    popupContent.appendChild(popupDetails)

    // Close popup when clicking on overlay
    popupOverlay.addEventListener('click', function (e) {
      if (e.target === popupOverlay) {
        closePopup()
      }
    })

    // Close popup with Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && popupOverlay.classList.contains('active')) {
        closePopup()
      }
    })
  }

  // Add click event to each project card
  projectCards.forEach((card) => {
    // Get the View Details button
    const viewDetailsBtn = card.querySelector('.overlay .btn-primary')
    const cardImage = card.querySelector('.case-study-image img')

    // Add click event to View Details button
    if (viewDetailsBtn) {
      viewDetailsBtn.addEventListener('click', function (e) {
        e.preventDefault()
        openProjectPopup(card)
      })
    }

    // Add click event to the image
    if (cardImage) {
      cardImage.addEventListener('click', function () {
        openProjectPopup(card)
      })
    }
  })
}

async function openProjectPopup(card) {
  // Create wave animation effect
  createWaveEffect(card)

  const projectId = card.dataset.projectId // Get project ID from data attribute

  if (!projectId) {
    console.error('Project ID not found for the clicked card.')
    return
  }

  try {
    const response = await fetch(`/api/projects/${projectId}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const project = await response.json()

    // Set popup content
    const popupOverlay = document.querySelector('.project-popup-overlay')
    const popupTitle = document.getElementById('popup-title')
    const popupMedia = document.querySelector('.project-popup-media')
    const popupDetails = document.querySelector('.project-popup-details')

    // Set title
    popupTitle.textContent = project.title

    // Generate carousel slides
    let carouselSlidesHtml = `<div class="carousel-slide active"><img src="${project.mainImage}" alt="${project.title}" class="project-popup-image"></div>`
    project.carouselImages.forEach((image) => {
      carouselSlidesHtml += `<div class="carousel-slide"><img src="${image}" alt="${project.title}" class="project-popup-image"></div>`
    })
    project.carouselVideos.forEach((video) => {
      if (video.type === 'youtube') {
        carouselSlidesHtml += `<div class="carousel-slide"><div class="video-container"><iframe src="${video.url}" frameborder="0" allowfullscreen></iframe></div></div>`
      }
    })

    // Set media content
    popupMedia.innerHTML = `
          <div class="carousel-container">
              <div class="carousel-slides">
                  ${carouselSlidesHtml}
              </div>
              ${
                project.carouselImages.length > 0 ||
                project.carouselVideos.length > 0
                  ? '<button class="carousel-nav prev"><</button><button class="carousel-nav next">></button>'
                  : ''
              }
          </div>
          <div class="project-source-link">
              ${
                project.githubLink
                  ? `<a href="${project.githubLink}" class="btn btn-outline" target="_blank">
                  <i class="fab fa-github"></i>
                  View on GitHub
              </a>`
                  : ''
              }
          </div>
      `

    // Set details content
    popupDetails.innerHTML = `
          <span class="industry">${project.industry}</span>
          <h3>${project.title}</h3>
          <p>${project.fullDescription}</p>
          
          <div class="implementation">
              <h4>Implementation</h4>
              <p>${project.implementation}</p>
          </div>
          
          <div class="tech-stack">
              <h4>Technologies Used</h4>
              <div class="tech-tags">
                  ${project.techStack
                    .map((tag) => `<span class="tech-tag">${tag}</span>`)
                    .join('')}
              </div>
          </div>
          
          <div class="results">
              <h4>Results & Impact</h4>
              <ul>
                  ${project.results
                    .map((result) => `<li>${result}</li>`)
                    .join('')}
              </ul>
          </div>
      `

    // Show popup with animation
    setTimeout(() => {
      popupOverlay.classList.add('active')
      document.body.classList.add('no-scroll')
    }, 300) // Delay to allow wave animation to start
    initCarousel(popupMedia)
  } catch (error) {
    console.error('Error fetching project details:', error)
    // Optionally, display an error message to the user
  }
}

function closePopup() {
  const popupOverlay = document.querySelector('.project-popup-overlay')
  popupOverlay.classList.remove('active')
  document.body.classList.remove('no-scroll')
}

function initCarousel(container) {
  const slides = container.querySelectorAll('.carousel-slide')
  const prevButton = container.querySelector('.carousel-nav.prev')
  const nextButton = container.querySelector('.carousel-nav.next')
  let currentIndex = 0

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index)
    })
  }

  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length
    showSlide(currentIndex)
  })

  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length
    showSlide(currentIndex)
  })

  showSlide(currentIndex)
}

function createWaveEffect(element) {
  // Get element position
  const rect = element.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  // Create wave container if it doesn't exist
  let waveContainer = element.querySelector('.wave-container')

  if (!waveContainer) {
    waveContainer = document.createElement('div')
    waveContainer.className = 'wave-container'
    element.appendChild(waveContainer)
  }

  // Clear previous waves
  waveContainer.innerHTML = ''

  // Create multiple waves with different delays
  for (let i = 0; i < 3; i++) {
    const wave = document.createElement('div')
    wave.className = 'wave'
    wave.style.top = '50%'
    wave.style.left = '50%'
    wave.style.animationDelay = `${i * 0.2}s`
    waveContainer.appendChild(wave)
  }
}
