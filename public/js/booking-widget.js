document.addEventListener('DOMContentLoaded', function () {
  const bookingToggleBtn = document.getElementById('booking-toggle-btn')
  const bookingFormPopup = document.getElementById('booking-form-popup')
  const closeBookingPopupBtn = document.getElementById('close-booking-popup')
  const bookingForm = document.getElementById('booking-form')
  const serviceSelect = document.getElementById('service-select')
  const bookingMessage = document.getElementById('booking-message')
  const nextBtns = document.querySelectorAll('.btn-next')
  const prevBtns = document.querySelectorAll('.btn-prev')
  const formSteps = document.querySelectorAll('.form-step')
  const progressSteps = document.querySelectorAll('.progress-step')
  const dynamicQuestionContainer = document.getElementById(
    'dynamic-question-container'
  )
  const documentUpload = document.getElementById('document-upload')
  const submitBtn = document.querySelector('button[type="submit"]')

  let currentStep = 1
  let servicesData = []

  const dynamicQuestions = {
    'Generative AI Implementation': {
      label: 'What kind of content do you need?',
      type: 'select',
      options: ['Text', 'Images', 'Code', 'Other'],
      name: 'content_type',
    },
    'AI Automation & Optimization': {
      label: 'What business process are you looking to automate?',
      type: 'text',
      name: 'process_to_automate',
    },
  }

  // Toggle booking form popup visibility
  bookingToggleBtn.addEventListener('click', () => {
    bookingFormPopup.classList.toggle('active')
    if (
      bookingFormPopup.classList.contains('active') &&
      servicesData.length === 0
    ) {
      fetchServices()
    }
    // Set min date for date picker
    const today = new Date().toISOString().split('T')[0]
    document.getElementById('preferred-date').setAttribute('min', today)
  })

  closeBookingPopupBtn.addEventListener('click', () => {
    bookingFormPopup.classList.remove('active')
    resetForm()
  })

  // Multi-step form navigation
  nextBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (validateStep(currentStep)) {
        currentStep++
        updateFormSteps()
      }
    })
  })

  prevBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      currentStep--
      updateFormSteps()
    })
  })

  function updateFormSteps() {
    formSteps.forEach((step) => {
      step.classList.remove('active')
    })
    document.getElementById(`step-${currentStep}`).classList.add('active')
    updateProgressBar()
  }

  function updateProgressBar() {
    progressSteps.forEach((step, index) => {
      if (index < currentStep) {
        step.classList.add('active')
      } else {
        step.classList.remove('active')
      }
    })
  }

  function validateStep(step) {
    if (step === 1) {
      if (serviceSelect.value === '') {
        alert('Please select a service.')
        return false
      }
      const name = document.getElementById('client-name').value
      const email = document.getElementById('client-email').value
      if (name === '' || email === '') {
        alert('Please fill in your name and email.')
        return false
      }
    }
    // Add more validation for other steps if needed
    return true
  }

  // Fetch services and populate dropdown
  async function fetchServices() {
    try {
      const response = await fetch('/api/services')
      if (!response.ok) throw new Error('Failed to fetch services')
      servicesData = await response.json()
      populateServices()
    } catch (error) {
      console.error('Error fetching services:', error)
      displayMessage('Failed to load services.', 'error')
    }
  }

  function populateServices() {
    serviceSelect.innerHTML = '<option value="">-- Choose a Service --</option>'
    servicesData.forEach((service) => {
      const option = document.createElement('option')
      option.value = service._id
      option.textContent = service.name
      option.dataset.name = service.name
      serviceSelect.appendChild(option)
    })
  }

  // Handle dynamic questions
  serviceSelect.addEventListener('change', (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex]
    const serviceName = selectedOption.dataset.name
    const question = dynamicQuestions[serviceName]

    dynamicQuestionContainer.innerHTML = ''
    if (question) {
      const label = document.createElement('label')
      label.textContent = question.label
      dynamicQuestionContainer.appendChild(label)

      if (question.type === 'text') {
        const input = document.createElement('input')
        input.type = 'text'
        input.name = question.name
        input.required = true
        dynamicQuestionContainer.appendChild(input)
      } else if (question.type === 'select') {
        const select = document.createElement('select')
        select.name = question.name
        select.required = true
        question.options.forEach((opt) => {
          const option = document.createElement('option')
          option.value = opt.toLowerCase()
          option.textContent = opt
          select.appendChild(option)
        })
        dynamicQuestionContainer.appendChild(select)
      }
      dynamicQuestionContainer.style.display = 'block'
    } else {
      dynamicQuestionContainer.style.display = 'none'
    }
  })

  // Handle file upload feedback
  if (documentUpload) {
    documentUpload.addEventListener('change', function (e) {
      const file = e.target.files[0]
      const fileInfo = document.getElementById('file-upload-info')
      const maxSizeMB = 10 // 10MB limit

      if (file) {
        const fileSizeMB = file.size / 1024 / 1024
        const fileName = file.name

        // Check file size limit
        if (fileSizeMB > maxSizeMB) {
          // Show error for oversized file
          displayMessage(
            `File too large! Maximum size allowed is ${maxSizeMB}MB. Your file is ${fileSizeMB.toFixed(
              2
            )}MB.`,
            'error'
          )

          // Clear the file input
          documentUpload.value = ''

          // Remove file info if exists
          if (fileInfo) {
            fileInfo.remove()
          }
          return
        }

        // Create or update file info display
        if (!fileInfo) {
          const infoDiv = document.createElement('div')
          infoDiv.id = 'file-upload-info'
          infoDiv.className = 'file-upload-info'
          documentUpload.parentNode.appendChild(infoDiv)
        }

        // Show success for valid file
        document.getElementById('file-upload-info').innerHTML = `
          <div class="file-selected">
            <i class="fas fa-file"></i>
            <span class="file-name">${fileName}</span>
            <span class="file-size">(${fileSizeMB.toFixed(2)} MB)</span>
            <i class="fas fa-check-circle file-success"></i>
          </div>
        `

        // Clear any previous error messages
        bookingMessage.style.display = 'none'
      } else if (fileInfo) {
        fileInfo.remove()
      }
    })
  }

  // Handle form submission
  bookingForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    // Disable submit button to prevent double submission
    submitBtn.disabled = true
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...'

    // Show loading message
    displayMessage('Submitting booking...', 'info')

    const formData = new FormData(bookingForm)
    const hasFile =
      formData.get('document') && formData.get('document').size > 0

    // Show file upload progress if file is being uploaded
    if (hasFile) {
      const fileSizeMB = (formData.get('document').size / 1024 / 1024).toFixed(
        2
      )
      displayMessage(
        `Uploading document (${fileSizeMB} MB) and submitting booking... Please wait.`,
        'info'
      )

      // Show estimated time for larger files
      if (fileSizeMB > 2) {
        setTimeout(() => {
          displayMessage(
            `Large file detected (${fileSizeMB} MB). This may take up to 30 seconds...`,
            'info'
          )
        }, 3000)
      }
    }

    // Log form data for debugging
    console.log('Form data being submitted:')
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(
          key,
          `File: ${value.name} (${(value.size / 1024).toFixed(2)} KB)`
        )
      } else {
        console.log(key, value)
      }
    }

    try {
      // Create AbortController for timeout handling
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 60000) // 60 second timeout

      const response = await fetch('/api/bookings', {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      })

      clearTimeout(timeoutId) // Clear timeout if request completes
      const result = await response.json()
      console.log('Server response:', result)

      if (response.ok) {
        if (result.emailStatus === 'failed') {
          displayMessage(
            'Booking successful! Note: Confirmation email could not be sent.',
            'warning'
          )
        } else {
          displayMessage(
            'Booking successful! Check your email for confirmation.',
            'success'
          )
        }
        setTimeout(() => {
          bookingFormPopup.classList.remove('active')
          resetForm()
        }, 3000)
      } else {
        displayMessage(
          `Error: ${result.message || 'Unknown error occurred'}`,
          'error'
        )
        if (result.details) {
          console.error('Error details:', result.details)
        }
      }
    } catch (error) {
      console.error('Error submitting booking:', error)

      if (error.name === 'AbortError') {
        displayMessage(
          'Request timeout. Please try again with a smaller file or check your internet connection.',
          'error'
        )
      } else if (error.message.includes('Failed to fetch')) {
        displayMessage(
          'Connection error. Please check if the server is running and try again.',
          'error'
        )
      } else {
        displayMessage('Unexpected error occurred. Please try again.', 'error')
      }
    } finally {
      // Re-enable submit button
      submitBtn.disabled = false
      submitBtn.innerHTML = 'Submit Booking'
    }
  })

  function displayMessage(message, type) {
    bookingMessage.textContent = message
    bookingMessage.className = `booking-message ${type}`
    bookingMessage.style.display = 'block'
  }

  function resetForm() {
    bookingForm.reset()
    currentStep = 1
    updateFormSteps()
    dynamicQuestionContainer.style.display = 'none'
    bookingMessage.style.display = 'none'

    // Remove file upload info
    const fileInfo = document.getElementById('file-upload-info')
    if (fileInfo) {
      fileInfo.remove()
    }

    // Reset submit button
    submitBtn.disabled = false
    submitBtn.innerHTML = 'Submit Booking'
  }
})
