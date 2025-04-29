document.addEventListener('DOMContentLoaded', function() {
    // Solo ejecutar en vista móvil
    if (window.innerWidth < 768) {
      const slidesContainer = document.getElementById('slides-container');
      const prevButton = document.getElementById('prev-btn');
      const nextButton = document.getElementById('next-btn');
      const indicatorsContainer = document.getElementById('carousel-indicators');
      const slides = document.querySelectorAll('.carousel-slide');
      
      if (!slidesContainer || !prevButton || !nextButton || !indicatorsContainer) return;
      
      let currentIndex = 0;
      const totalSlides = slides.length;
      
      // Configurar el ancho de los slides para mostrar 3 a la vez en móvil (o menos si hay menos de 3)
      const slidesToShow = Math.min(1, totalSlides);
      const slideWidth = 100 / slidesToShow;
      
      slides.forEach(slide => {
        slide.style.width = `${slideWidth}%`;
      });
      
      // Actualizar el ancho del contenedor de slides
      slidesContainer.style.width = `${(totalSlides / slidesToShow) * 100}%`;
      
      // Crear indicadores
      for (let i = 0; i < Math.ceil(totalSlides / slidesToShow); i++) {
        const indicator = document.createElement('button');
        indicator.classList.add('w-3', 'h-3', 'rounded-full', 'bg-gray-300');
        indicator.dataset.index = i;
        
        indicator.addEventListener('click', function() {
          goToSlide(parseInt(this.dataset.index));
        });
        
        indicatorsContainer.appendChild(indicator);
      }
      
      const indicators = indicatorsContainer.querySelectorAll('button');
      
      // Función para actualizar la vista del carrusel
      function updateCarousel() {
        const offset = -currentIndex * (slidesToShow * slideWidth);
        slidesContainer.style.transform = `translateX(${offset}%)`;
        
        // Actualizar indicadores
        indicators.forEach((indicator, index) => {
          if (index === currentIndex) {
            indicator.classList.remove('bg-gray-300');
            indicator.classList.add('bg-gray-700');
          } else {
            indicator.classList.remove('bg-gray-700');
            indicator.classList.add('bg-gray-300');
          }
        });
      }
      
      // Función para ir a un slide específico
      function goToSlide(index) {
        currentIndex = index;
        if (currentIndex < 0) {
          currentIndex = Math.ceil(totalSlides / slidesToShow) - 1;
        } else if (currentIndex >= Math.ceil(totalSlides / slidesToShow)) {
          currentIndex = 0;
        }
        updateCarousel();
      }
      
      // Event listeners para los botones
      prevButton.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
      });
      
      nextButton.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
      });
      
      // Inicializar carrusel
      updateCarousel();
      
      // Opcionalmente, hacer que el carrusel avance automáticamente
       setInterval(() => {
         goToSlide(currentIndex + 1);
       }, 3000);
    }
  });