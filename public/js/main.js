document.addEventListener('DOMContentLoaded', function () {
  // Function to handle video lazy loading
  function lazyLoadVideos() {
    const previews = document.querySelectorAll('.demo-preview');
    previews.forEach(preview => {
      const video = preview.querySelector('video[data-src]');
      const overlay = preview.querySelector('.demo-overlay');

      if (video) {
        preview.addEventListener('click', () => {
          if (video.paused) {
            // Load the video source only if it's not already loaded
            if (!video.src || !video.src.includes(video.getAttribute('data-src'))) {
                 video.src = video.getAttribute('data-src');
            }
            video.play();
            if (overlay) {
              overlay.style.opacity = '0'; // Hide the overlay
            }
          } else {
            video.pause();
            if (overlay) {
              overlay.style.opacity = '1'; // Show the overlay again if paused
            }
          }
        });
      }
    });
  }

  // Initialize video lazy loading
  lazyLoadVideos();
});
