
document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.getAttribute('data-tab');
      
      // Actualizar botón activo con animación
      tabButtons.forEach(btn => {
        // Eliminar clase active con efecto de transición
        if (btn.classList.contains('active')) {
          btn.classList.add('fade-out');
          setTimeout(() => {
            btn.classList.remove('active', 'fade-out');
          }, 200);
        }
        
        // Añadir clase active al botón seleccionado
        if (btn.getAttribute('data-tab') === tabId) {
          setTimeout(() => {
            btn.classList.add('active', 'fade-in');
            setTimeout(() => {
              btn.classList.remove('fade-in');
            }, 200);
          }, 210);
        }
      });
      
      // Mostrar contenido de la pestaña activa con animación
      tabContents.forEach(content => {
        if (content.id === `tab-${tabId}`) {
          // Hacer fade out del contenido actual
          tabContents.forEach(c => {
            if (!c.classList.contains('hidden')) {
              c.style.opacity = '0';
              setTimeout(() => {
                c.classList.add('hidden');
                c.classList.remove('block');
                c.style.opacity = '';
              }, 300);
            }
          });
          
          // Hacer fade in del nuevo contenido
          setTimeout(() => {
            content.classList.remove('hidden');
            content.classList.add('block');
            content.style.opacity = '0';
            setTimeout(() => {
              content.style.opacity = '1';
            }, 50);
          }, 310);
        }
      });
    });
  });

  // Reset select elements after navigation
  const selects = document.querySelectorAll('select[id^="doc-select-"]');
  selects.forEach(select => {
    select.selectedIndex = 0;
  });
  
  // Añadir estilos adicionales para animaciones
  const style = document.createElement('style');
  style.textContent = `
    .tab-content {
      transition: opacity 0.3s ease;
    }
    .fade-in {
      animation: fadeIn 0.3s ease forwards;
    }
    .fade-out {
      animation: fadeOut 0.2s ease forwards;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(5px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeOut {
      from { opacity: 1; transform: translateY(0); }
      to { opacity: 0; transform: translateY(5px); }
    }
  `;
  document.head.appendChild(style);
});
