document.addEventListener('DOMContentLoaded', function () {
  const bookingToggleBtn = document.getElementById('booking-toggle-btn')
  const bookingFormPopup = document.getElementById('booking-form-popup')
  const closeBookingPopupBtn = document.getElementById('close-booking-popup')
  const bookingForm = document.getElementById('booking-form')
  const serviceSelect = document.getElementById('service-select')
  const bookingMessage = document.getElementById('booking-message')

  // Toggle booking form popup visibility
  bookingToggleBtn.addEventListener('click', () => {
    bookingFormPopup.classList.toggle('active')
    if (bookingFormPopup.classList.contains('active')) {
      fetchServices() // Fetch services when popup opens
    }
  })

  closeBookingPopupBtn.addEventListener('click', () => {
    bookingFormPopup.classList.remove('active')
    bookingMessage.style.display = 'none' // Hide message on close
    bookingForm.reset() // Reset form fields
  })

  // Close popup if clicked outside (optional, but good UX)
  // document.addEventListener('click', (event) => {
  //     if (!bookingFormPopup.contains(event.target) && !bookingToggleBtn.contains(event.target) && bookingFormPopup.classList.contains('active')) {
  //         bookingFormPopup.classList.remove('active');
  //         bookingMessage.style.display = 'none';
  //         bookingForm.reset();
  //     }
  // });

  // Fetch services and populate dropdown
  async function fetchServices() {
    console.log('Attempting to fetch services...')
    try {
      const response = await fetch('/api/services')
      console.log('Response received:', response)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const services = await response.json()
      console.log(
        'Services fetched (detailed):',
        JSON.stringify(services, null, 2)
      ) // Detailed log
      serviceSelect.innerHTML =
        '<option value="">-- Choose a Service --</option>' // Clear existing options
      services.forEach((service) => {
        const option = document.createElement('option')
        option.value = service._id
        option.textContent = `${service.name} - $${service.price}`
        serviceSelect.appendChild(option)
        console.log(`Appended service: ${service.name}`) // Log each append
      })
      serviceSelect.selectedIndex = 0 // Explicitly set to the first option (Choose a Service)
    } catch (error) {
      console.error('Error fetching services:', error)
      displayMessage(
        'Failed to load services. Please try again later.',
        'error'
      )
    }
  }

  // Handle form submission
  bookingForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    const formData = new FormData(bookingForm)
    const data = Object.fromEntries(formData.entries())

    // Convert date to ISO string for consistency
    if (data.preferredDate) {
      data.preferredDate = new Date(data.preferredDate).toISOString()
    }

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        displayMessage(
          'Booking submitted successfully! We will contact you shortly.',
          'success'
        )
        bookingForm.reset() // Clear form after successful submission
        // Optionally close popup after a delay
        setTimeout(() => {
          bookingFormPopup.classList.remove('active')
          bookingMessage.style.display = 'none'
        }, 3000)
      } else {
        displayMessage(
          `Booking failed: ${result.message || 'Unknown error'}`,
          'error'
        )
      }
    } catch (error) {
      console.error('Error submitting booking:', error)
      displayMessage('An unexpected error occurred. Please try again.', 'error')
    }
  })

  function displayMessage(message, type) {
    bookingMessage.textContent = message
    bookingMessage.className = 'booking-message' // Reset classes
    bookingMessage.classList.add(type) // Add success or error class
    bookingMessage.style.display = 'block' // Make visible
  }
})
