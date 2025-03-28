// FAQ accordion functionality
document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
      question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const icon = question.querySelector('svg');
        
        // Toggle answer visibility
        answer.classList.toggle('hidden');
        
        // Update aria-expanded
        const expanded = answer.classList.contains('hidden') ? 'false' : 'true';
        question.setAttribute('aria-expanded', expanded);
        
        // Rotate icon
        if (expanded === 'true') {
          icon.classList.add('rotate-180');
        } else {
          icon.classList.remove('rotate-180');
        }
      });
    });
    
    // Search functionality
    const searchInput = document.getElementById('faq-search');
    const searchResults = document.getElementById('search-results');
    const searchTerm = document.getElementById('search-term');
    const clearSearch = document.getElementById('clear-search');
    const faqContent = document.getElementById('faq-content');
    const faqItems = document.querySelectorAll('.faq-item');
    const faqCategories = document.querySelectorAll('.faq-category');
    
    if (searchInput && searchResults && clearSearch) {
      searchInput.addEventListener('input', (e) => {
        const value = e.target.value.toLowerCase().trim();
        
        if (value === '') {
          // Show all categories and items
          searchResults.classList.add('hidden');
          faqContent.classList.remove('hidden');
          faqCategories.forEach(category => {
            category.classList.remove('hidden');
          });
          faqItems.forEach(item => {
            item.classList.remove('hidden');
          });
          return;
        }
        
        // Filter items
        let foundItems = 0;
        
        faqCategories.forEach(category => {
          let categoryHasVisibleItems = false;
          const items = category.querySelectorAll('.faq-item');
          
          items.forEach(item => {
            const question = item.getAttribute('data-question').toLowerCase();
            const answer = item.getAttribute('data-answer').toLowerCase();
            
            if (question.includes(value) || answer.includes(value)) {
              item.classList.remove('hidden');
              categoryHasVisibleItems = true;
              foundItems++;
            } else {
              item.classList.add('hidden');
            }
          });
          
          if (categoryHasVisibleItems) {
            category.classList.remove('hidden');
          } else {
            category.classList.add('hidden');
          }
        });
        
        // Show/hide search results message
        if (foundItems === 0) {
          searchTerm.textContent = value;
          searchResults.classList.remove('hidden');
          faqContent.classList.add('hidden');
        } else {
          searchResults.classList.add('hidden');
          faqContent.classList.remove('hidden');
        }
      });
      
      clearSearch.addEventListener('click', () => {
        searchInput.value = '';
        searchResults.classList.add('hidden');
        faqContent.classList.remove('hidden');
        
        faqCategories.forEach(category => {
          category.classList.remove('hidden');
        });
        
        faqItems.forEach(item => {
          item.classList.remove('hidden');
        });
      });
    }
  });