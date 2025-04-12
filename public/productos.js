document.addEventListener('DOMContentLoaded', () => {

    const tabButtons = document.querySelectorAll('[data-tab]');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        
     
        tabButtons.forEach(btn => {
          if (btn.getAttribute('data-tab') === tabId) {
            btn.classList.add('bg-red-100', 'text-black');
            btn.classList.remove('bg-red-100', 'text-gray-700', 'hover:bg-red-200');
          } else {
            btn.classList.remove('bg-red-100', 'text-black');
            btn.classList.add('bg-red-100', 'text-gray-700', 'hover:bg-red-200');
          }
        });
      
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

   
    const selects = document.querySelectorAll('select[id^="doc-select-"]');
    selects.forEach(select => {
      select.selectedIndex = 0;
    });
  });