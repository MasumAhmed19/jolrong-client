// ----------------------------------------------------
// 1. Header/Logo Transition Logic (Fixed scroll threshold)
// ----------------------------------------------------
const header = document.getElementById('header');

const handleScroll = () => {
  const scrollThreshold = 100; 
  if (window.scrollY > scrollThreshold) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
};

window.addEventListener('scroll', handleScroll);


// ----------------------------------------------------
// 2. Section Reveal Logic (Scroll-by-Scroll Gradual Transition)
// ----------------------------------------------------

// Select all sections we want to gradually reveal. 
const revealElements = document.querySelectorAll('.services, .projects, .recent-works-section, .about-us, footer');

// Create the Intersection Observer
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add the 'visible' class to trigger the CSS transition (fade-up)
      entry.target.classList.add('visible');
      // Stop observing this element once it's visible
      observer.unobserve(entry.target); 
    }
  });
}, {
  // Options: Trigger when 20% of the element is visible in the viewport
  rootMargin: '0px',
  threshold: 0.2 
});

// Start observing each element
revealElements.forEach(element => {
  observer.observe(element);
});

// ----------------------------------------------------
// 3. Hero Slideshow Logic (Manual & Automatic Control)
// ----------------------------------------------------
const slides = document.querySelectorAll('.hero-slideshow .slide');
const prevButton = document.querySelector('.slide-nav.prev');
const nextButton = document.querySelector('.slide-nav.next');

let currentSlide = 0;
// Define the interval duration (5 seconds)
const slideIntervalTime = 5000; 
let slideTimer; // Variable to hold the interval ID

// Ensure only the first slide is active on load
if (slides.length > 0) {
    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        if (index === 0) {
            slide.classList.add('active');
        }
    });
}

/**
 * Updates the slideshow display to show the slide at the given index.
 * @param {number} newIndex - The index of the slide to display.
 */
const goToSlide = (newIndex) => {
    // 1. Remove 'active' from the current slide
    slides[currentSlide].classList.remove('active');
    
    // 2. Update the currentSlide index
    currentSlide = newIndex;
    
    // 3. Add 'active' to the new current slide
    slides[currentSlide].classList.add('active');
};

/**
 * Moves the slideshow to the next slide, cycling to the start if at the end.
 */
const nextSlide = () => {
    // Use modulo operator for seamless wrap-around
    const newIndex = (currentSlide + 1) % slides.length;
    goToSlide(newIndex);
};

/**
 * Moves the slideshow to the previous slide, cycling to the end if at the start.
 */
const prevSlide = () => {
    // Use modulo with length added to handle negative results for wrap-around
    const newIndex = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(newIndex);
};

/**
 * Stops the current automatic slide timer and restarts it.
 * This is called whenever a user manually interacts with a button.
 */
const restartSlideTimer = () => {
    clearInterval(slideTimer);
    slideTimer = setInterval(nextSlide, slideIntervalTime);
};

// Start the automatic slideshow
if (slides.length > 1) {
    slideTimer = setInterval(nextSlide, slideIntervalTime);
}

// Add event listeners for the buttons
if (prevButton && nextButton) {
    // When a button is clicked, change the slide and restart the timer
    prevButton.addEventListener('click', () => {
        prevSlide();
        restartSlideTimer(); 
    });
    nextButton.addEventListener('click', () => {
        nextSlide();
        restartSlideTimer();
    });
}


// ----------------------------------------------------
// 4. Hamburger Menu Toggle Logic (With Icon Swap & Accessibility Fix)
// ----------------------------------------------------
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('main-nav');
const menuIcon = menuToggle.querySelector('i');

/**
 * Traps keyboard focus inside the navigation when the mobile menu is open.
 * Sets the main page content to be hidden from screen readers.
 * @param {boolean} isOpen - true if opening, false if closing.
 */
const manageFocusTrap = (isOpen) => {
    // Select all main sections of the body *excluding* the header and nav
    const mainContent = document.querySelector('body > *:not(#header):not(#main-nav)');
    
    if (isOpen) {
        mainContent.setAttribute('aria-hidden', 'true');
        
        const focusableElements = nav.querySelectorAll('a');
        if (focusableElements.length > 0) {
            // Focus on the first link
            focusableElements[0].focus(); 
        }
    } else {
        mainContent.removeAttribute('aria-hidden');
        // Return focus to the menu button
        menuToggle.focus(); 
    }
};


// Helper function to toggle the menu and icon
const toggleMenu = () => {
    const isOpen = !nav.classList.contains('open');
    
    nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
    
    // Icon Swap Logic: fa-bars (☰) <-> fa-times (X)
    if (isOpen) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
    } else {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }
    
    manageFocusTrap(isOpen); 
};

// Set initial aria-expanded state
menuToggle.setAttribute('aria-expanded', 'false');

// Toggle when the hamburger/close button is clicked
menuToggle.addEventListener('click', toggleMenu);


// ----------------------------------------------------
// 5. Active Navigation Link Logic & Menu Closing (Scroll Snap Integrated)
// ----------------------------------------------------
const navLinks = document.querySelectorAll('#main-nav a');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        
        // 1. Remove 'active' class from all links
        navLinks.forEach(item => {
            item.classList.remove('active');
        });

        // 2. Add 'active' class to the clicked link
        e.currentTarget.classList.add('active');
        
        // 3. SPECIAL HANDLING FOR HOME LINK (Manual scroll required for y=0)
        const href = e.currentTarget.getAttribute('href');
        if (href === 'index.html' || href === '/') {
             e.preventDefault();
             
             window.scrollTo({
                 top: 0,
                 behavior: 'smooth'
             });
        }
        // NOTE: For all other links (#anchor), default anchor behavior is used, 
        // which the CSS scroll-snap handles for smooth, snapped, offset scrolling.
        
        // 4. Close the mobile menu if open
        if (nav.classList.contains('open')) {
            setTimeout(() => {
                toggleMenu(); 
            }, 100); 
        }
    });
});