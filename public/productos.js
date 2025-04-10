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

    // Reset select elements after navigation
    const selects = document.querySelectorAll('select[id^="doc-select-"]');
    selects.forEach(select => {
      select.selectedIndex = 0;
    });
  });