// ===== UI COMPONENTS MODULE =====

export function initAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item')

  accordionItems.forEach((item) => {
    const trigger = item.querySelector('.accordion-trigger')
    const content = item.querySelector('.accordion-content')

    if (!trigger || !content) return

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active')

      // Close all accordion items
      accordionItems.forEach((otherItem) => {
        otherItem.classList.remove('active')
        const otherContent = otherItem.querySelector('.accordion-content')
        if (otherContent) {
          otherContent.style.maxHeight = null
        }
      })

      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add('active')
        content.style.maxHeight = content.scrollHeight + 'px'
      }
    })
  })
}

export function initTabs() {
  const tabContainers = document.querySelectorAll('.tabs-container')

  tabContainers.forEach((container) => {
    const triggers = container.querySelectorAll('.tab-trigger')
    const contents = container.querySelectorAll('.tab-content')

    triggers.forEach((trigger, index) => {
      trigger.addEventListener('click', () => {
        // Remove active class from all triggers and contents
        triggers.forEach((t) => t.classList.remove('active'))
        contents.forEach((c) => c.classList.remove('active'))

        // Add active class to clicked trigger and corresponding content
        trigger.classList.add('active')
        if (contents[index]) {
          contents[index].classList.add('active')
        }
      })
    })
  })
}

export function initTooltips() {
  const tooltipElements = document.querySelectorAll('[data-tooltip]')

  tooltipElements.forEach((element) => {
    element.addEventListener('mouseenter', createTooltip)
    element.addEventListener('mouseleave', removeTooltip)
  })

  function createTooltip(e) {
    const tooltip = document.createElement('div')
    tooltip.className = 'tooltip'
    tooltip.textContent = e.target.dataset.tooltip
    document.body.appendChild(tooltip)

    const rect = e.target.getBoundingClientRect()
    tooltip.style.left =
      rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px'
    tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px'
  }

  function removeTooltip() {
    const tooltip = document.querySelector('.tooltip')
    if (tooltip) {
      tooltip.remove()
    }
  }
}

export function initFilterControls() {
  const filterButtons = document.querySelectorAll('.filter-btn')
  const filterItems = document.querySelectorAll('.filter-item')

  if (filterButtons.length === 0 || filterItems.length === 0) return

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove('active'))
      button.classList.add('active')

      // Filter items
      filterItems.forEach((item) => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'block'
          item.classList.add('fade-in')
        } else {
          item.style.display = 'none'
          item.classList.remove('fade-in')
        }
      })
    })
  })
}
