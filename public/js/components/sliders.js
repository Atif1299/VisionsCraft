// ===== SLIDERS AND CAROUSELS MODULE =====

export function initTestimonialsSlider() {
  const slider = document.querySelector('.testimonials-slider')
  const slides = document.querySelectorAll('.testimonial-slide')
  const prevBtn = document.querySelector('.slider-prev')
  const nextBtn = document.querySelector('.slider-next')
  const dots = document.querySelectorAll('.slider-dot')

  if (!slider || slides.length === 0) return

  let currentSlide = 0

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index)
    })

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index)
    })

    currentSlide = index
  }

  function nextSlide() {
    const next = (currentSlide + 1) % slides.length
    showSlide(next)
  }

  function prevSlide() {
    const prev = (currentSlide - 1 + slides.length) % slides.length
    showSlide(prev)
  }

  // Event listeners
  if (nextBtn) nextBtn.addEventListener('click', nextSlide)
  if (prevBtn) prevBtn.addEventListener('click', prevSlide)

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index))
  })

  // Auto-play
  const autoPlay = setInterval(nextSlide, 5000)

  // Pause auto-play on hover
  slider.addEventListener('mouseenter', () => clearInterval(autoPlay))
  slider.addEventListener('mouseleave', () => {
    setInterval(nextSlide, 5000)
  })

  // Initialize first slide
  showSlide(0)
}

// Initialize Swiper sliders if Swiper is available
export function initSwiperSliders() {
  if (typeof Swiper === 'undefined') return

  // Testimonials Swiper
  const testimonialsSwiper = new Swiper('.testimonials-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  })

  // Blog Swiper
  const blogSwiper = new Swiper('.blog-swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.blog-pagination',
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  })
}
