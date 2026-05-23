document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const announcementBar = document.getElementById("announcement-bar");
  const closeBtn = document.getElementById("close-announcement");
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");
  const navLinks = document.querySelectorAll(".nav-link, .mobile-link");

  // 1. Dismiss Announcement Bar
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      announcementBar.classList.add("hidden");
    });
  }

  // 2. Sticky Nav Background on Scroll
  window.addEventListener("scroll", () => {
    // If scrolled past 50px, add the solid background
    if (window.scrollY > 50) {
      navbar.classList.add("nav-scrolled");
    } else {
      navbar.classList.remove("nav-scrolled");
    }
  });

  // 3. Mobile Menu Toggle
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("is-active");
    mobileMenu.classList.toggle("is-open");
    
    // Prevent body scrolling when menu is open
    document.body.style.overflow = mobileMenu.classList.contains("is-open") ? "hidden" : "auto";
  });

  // 4. Smooth Scrolling & Active Link State
  navLinks.forEach(link => {
    link.addEventListener("click", function(e) {
      // Get the target section ID
      const targetId = this.getAttribute("href");
      
      // Only prevent default and scroll if it's an internal anchor link
      if (targetId.startsWith("#")) {
        e.preventDefault();
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          // Account for fixed navbar height during scroll
          const navHeight = navbar.offsetHeight;
          const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - navHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
          });
        }

        // Close mobile menu on link click
        if (mobileMenu.classList.contains("is-open")) {
          hamburger.classList.remove("is-active");
          mobileMenu.classList.remove("is-open");
          document.body.style.overflow = "auto";
        }
      }
    });
  });
});