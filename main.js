// --- SVG Timeline Scroll Animation ---
const timelineSection = document.getElementById('story-timeline');
const timelinePath = document.getElementById('timeline-path');
const timelineItems = document.querySelectorAll('.timeline-item');

if (timelineSection && timelinePath) {
  // 1. Get length of SVG path and set initial hidden state
  const pathLength = timelinePath.getTotalLength();
  
  // Set up the dashed array to be exactly the length of the path
  timelinePath.style.strokeDasharray = pathLength;
  // Offset it entirely so it's "invisible" at start
  timelinePath.style.strokeDashoffset = pathLength;
  // Apply transition for smooth drawing
  timelinePath.style.transition = 'stroke-dashoffset 2s ease-in-out';

  // 2. Intersection Observer to trigger drawing
  const timelineObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        
        // Draw the line by setting offset back to 0
        timelinePath.style.strokeDashoffset = '0';
        
        // Stagger the appearance of the text nodes mapping to the line draw
        timelineItems.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('is-visible');
          }, index * 400); // 400ms delay between each node appearing
        });

        // Stop observing once animation has run
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -20% 0px', // Triggers when the element is 20% up from the bottom of the screen
    threshold: 0.2
  });

  timelineObserver.observe(timelineSection);
}