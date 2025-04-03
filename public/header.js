 // Mobile menu toggle with animation
 const mobileMenuButton = document.getElementById('mobile-menu-button');
 const mobileMenu = document.getElementById('mobile-menu');
 const menuIcon = document.getElementById('menu-icon');
 const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
 
 if (mobileMenuButton && mobileMenu) {
   mobileMenuButton.addEventListener('click', () => {
     // Toggle menu visibility with animation
     if (mobileMenu.classList.contains('hidden')) {
       // Show menu
       mobileMenu.classList.remove('hidden');
       mobileMenu.style.maxHeight = '0';
       
       // Use setTimeout to ensure the transition works after removing 'hidden'
       setTimeout(() => {
         mobileMenu.style.maxHeight = '1000px'; // Use a value larger than your menu height
         
         // Rotate menu icon
         menuIcon.classList.add('rotate-90');
         
         // Animate in each nav item with a staggered delay
         mobileNavItems.forEach(item => {
           setTimeout(() => {
             item.classList.add('opacity-100');
             item.classList.remove('translate-y-4');
           }, 100);
         });
       }, 10);
     } else {
       // Hide menu
       mobileMenu.style.maxHeight = '0';
       
       // Rotate menu icon back
       menuIcon.classList.remove('rotate-90');
       
       // Animate out each nav item
       mobileNavItems.forEach(item => {
         item.classList.remove('opacity-100');
         item.classList.add('translate-y-4');
       });
       
       // Add 'hidden' class after transition completes
       setTimeout(() => {
         mobileMenu.classList.add('hidden');
       }, 500);
     }
   });
 }