document.addEventListener('DOMContentLoaded', function () {
  initDemoPopups()
})

function initDemoPopups() {
  const demoCards = document.querySelectorAll('.demo-card')

  if (!demoCards.length) return

  let popupOverlay = document.querySelector('.demo-popup-overlay')

  if (!popupOverlay) {
    popupOverlay = document.createElement('div')
    popupOverlay.className = 'demo-popup-overlay'
    document.body.appendChild(popupOverlay)

    const popupContainer = document.createElement('div')
    popupContainer.className = 'demo-popup'
    popupOverlay.appendChild(popupContainer)

    const closeButton = document.createElement('button')
    closeButton.className = 'demo-popup-close'
    closeButton.innerHTML = '&times;'
    closeButton.addEventListener('click', closeDemoPopup)
    popupContainer.appendChild(closeButton)

    const videoWrapper = document.createElement('div')
    videoWrapper.className = 'demo-video-wrapper'
    popupContainer.appendChild(videoWrapper)

    popupOverlay.addEventListener('click', function (e) {
      if (e.target === popupOverlay) {
        closeDemoPopup()
      }
    })

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && popupOverlay.classList.contains('active')) {
        closeDemoPopup()
      }
    })
  }

  demoCards.forEach((card) => {
    const launchButton = card.querySelector('.btn-secondary')
    const demoPreview = card.querySelector('.demo-preview')

    if (launchButton) {
      launchButton.addEventListener('click', function (e) {
        e.preventDefault()
        const videoUrl = launchButton.dataset.videoUrl
        const videoType = launchButton.dataset.videoType
        if (videoUrl) {
          openDemoPopup(videoUrl, videoType)
        }
      })
    }

    if (demoPreview) {
      demoPreview.addEventListener('click', function () {
        const launchButton = card.querySelector('.btn-secondary')
        const videoUrl = launchButton.dataset.videoUrl
        const videoType = launchButton.dataset.videoType
        if (videoUrl) {
          openDemoPopup(videoUrl, videoType)
        }
      })
    }
  })
}

function openDemoPopup(videoUrl, videoType) {
  const popupOverlay = document.querySelector('.demo-popup-overlay')
  const videoWrapper = document.querySelector('.demo-video-wrapper')

  if (videoType === 'local') {
    videoWrapper.innerHTML = `
            <video src="${videoUrl}" autoplay muted loop playsinline controls></video>
        `
  } else {
    videoWrapper.innerHTML = `
            <iframe src="${videoUrl}" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
        `
  }

  popupOverlay.classList.add('active')
  document.body.classList.add('no-scroll')
}

function closeDemoPopup() {
  const popupOverlay = document.querySelector('.demo-popup-overlay')
  const videoWrapper = document.querySelector('.demo-video-wrapper')

  popupOverlay.classList.remove('active')
  document.body.classList.remove('no-scroll')
  videoWrapper.innerHTML = ''
}
