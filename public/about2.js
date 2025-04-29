  // Carousel functionality
  document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('carousel-inner');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentIndex = 0;
    const totalSlides = 11;
    
    // Function to update carousel position
    function updateCarousel() {
      carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      // Update indicators
      indicators.forEach((indicator, index) => {
        if (index === currentIndex) {
          indicator.classList.add('bg-opacity-100');
          indicator.classList.add('active');
        } else {
          indicator.classList.remove('bg-opacity-100');
          indicator.classList.remove('active');
        }
      });
    }
    
    // Event listeners for buttons
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateCarousel();
    });
    
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateCarousel();
    });
    
    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
      });
    });
    
    // Optional: Auto-slide functionality
    let intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateCarousel();
    }, 4000); // Change slide every 5 seconds
    
    // Stop auto-sliding when user interacts
    const carouselContainer = document.getElementById('facilities-carousel');
    carouselContainer.addEventListener('mouseenter', () => {
      clearInterval(intervalId);
    });
    
    carouselContainer.addEventListener('mouseleave', () => {
      intervalId = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
      }, 5000);
    });
  });

  