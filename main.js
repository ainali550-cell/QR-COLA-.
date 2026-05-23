// --- Scroll Animations for Benefit Rows ---
const scrollElements = document.querySelectorAll('.scroll-animate');

if (scrollElements.length > 0) {
  const rowObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add visible class to trigger CSS transform/opacity
        entry.target.classList.add('is-visible');
        
        // Find if this row has counters and animate them (reusing your animateCounter function)
        const rowCounters = entry.target.querySelectorAll('.counter');
        if (rowCounters.length > 0) {
            rowCounters.forEach(counter => {
                // Check a custom attribute so we don't animate twice
                if(!counter.hasAttribute('data-animated')) {
                    animateCounter(counter);
                    counter.setAttribute('data-animated', 'true');
                }
            });
        }

        // Stop observing once it has animated
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -100px 0px', // Triggers slightly before it hits the bottom
    threshold: 0.2 // Triggers when 20% of the element is visible
  });

  scrollElements.forEach(el => rowObserver.observe(el));
}