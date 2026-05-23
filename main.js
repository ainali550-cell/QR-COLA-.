// --- Animated Stats Counter on Scroll ---
const statsBar = document.getElementById('stats-bar');
const counters = document.querySelectorAll('.counter');

// Function to animate a single counter
const animateCounter = (counter) => {
  const target = parseFloat(counter.getAttribute('data-target'));
  const decimals = parseInt(counter.getAttribute('data-decimals') || 0);
  const duration = 2000; // 2 seconds animation
  const frameRate = 1000 / 60; // 60 fps
  const totalFrames = Math.round(duration / frameRate);
  
  let currentFrame = 0;
  
  const counterInterval = setInterval(() => {
    currentFrame++;
    // Easing function (easeOutQuad) to slow down at the end
    const progress = currentFrame / totalFrames;
    const easeProgress = progress * (2 - progress); 
    
    const currentValue = target * easeProgress;
    
    // Format based on decimals requested
    if (decimals > 0) {
      counter.innerText = currentValue.toFixed(decimals);
    } else {
      counter.innerText = Math.round(currentValue);
    }
    
    if (currentFrame === totalFrames) {
      clearInterval(counterInterval);
      // Ensure exactly target at end
      counter.innerText = target.toFixed(decimals > 0 ? decimals : 0);
    }
  }, frameRate);
};

// Intersection Observer to trigger when visible
if (statsBar) {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5 // Trigger when 50% of the bar is visible
  };

  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach(counter => animateCounter(counter));
        // Stop observing once animated
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  statsObserver.observe(statsBar);
}