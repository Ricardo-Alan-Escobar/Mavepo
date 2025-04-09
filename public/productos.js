document.addEventListener('DOMContentLoaded', () => {
    // Tabs functionality
    const tabButtons = document.querySelectorAll('[data-tab]');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        
        // Update active tab button
        tabButtons.forEach(btn => {
          if (btn.getAttribute('data-tab') === tabId) {
            btn.classList.add('bg-red-100', 'text-black');
            btn.classList.remove('bg-red-100', 'text-gray-700', 'hover:bg-red-200');
          } else {
            btn.classList.remove('bg-red-100', 'text-black');
            btn.classList.add('bg-red-100', 'text-gray-700', 'hover:bg-red-200');
          }
        });
        
        // Show active tab content
        tabContents.forEach(content => {
          if (content.id === `tab-${tabId}`) {
            content.classList.remove('hidden');
            content.classList.add('block');
          } else {
            content.classList.add('hidden');
            content.classList.remove('block');
          }
        });
      });
    });

    // Dropdown functionality
    const dropdownButtons = document.querySelectorAll('[data-dropdown]');
    
    // Cerrar todos los dropdowns al hacer clic fuera
    document.addEventListener('click', (event) => {
      const dropdowns = document.querySelectorAll('[id^="dropdown-"]');
      dropdowns.forEach(dropdown => {
        if (!dropdown.parentElement.contains(event.target)) {
          dropdown.classList.add('hidden');
        }
      });
    });

    // Toggle dropdown al hacer clic en el botón
    dropdownButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        event.stopPropagation();
        const dropdownId = button.getAttribute('data-dropdown');
        const dropdown = document.getElementById(dropdownId);
        
        // Cerrar todos los demás dropdowns
        const allDropdowns = document.querySelectorAll('[id^="dropdown-"]');
        allDropdowns.forEach(d => {
          if (d.id !== dropdownId) {
            d.classList.add('hidden');
          }
        });
        
        // Toggle el dropdown actual
        dropdown.classList.toggle('hidden');
      });
    });
  });