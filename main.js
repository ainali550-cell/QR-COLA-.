// --- Product Filter Logic ---
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // 1. Remove active class from all tabs, add to clicked tab
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // 2. Get target filter category
    const filterValue = btn.getAttribute('data-filter');

    // 3. Filter cards
    productCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      
      if (filterValue === 'all' || filterValue === cardCategory) {
        // Show Card
        card.classList.remove('hidden');
        // Small reset hack to re-trigger layout for grid
        card.style.position = 'relative'; 
      } else {
        // Hide Card
        card.classList.add('hidden');
        // Removes item from DOM flow while keeping it for JS to un-hide later
        setTimeout(() => {
          if(card.classList.contains('hidden')) {
             card.style.position = 'absolute';
          }
        }, 400); // Matches CSS transition duration
      }
    });
  });
});