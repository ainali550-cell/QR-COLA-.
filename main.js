// Parallax Effect for Product Image
const productParallax = document.getElementById('parallax-product');

window.addEventListener('scroll', () => {
  if (productParallax) {
    // Only animate parallax if the hero section is somewhat in view to save performance
    if (window.scrollY < window.innerHeight) {
      // Moves opposite to scroll direction at 20% speed
      const scrollDist = window.scrollY;
      productParallax.style.transform = `translateY(${scrollDist * -0.2}px)`;
    }
  }
});