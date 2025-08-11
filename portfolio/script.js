// Wait for DOM to load completely
document.addEventListener('DOMContentLoaded', function() {
  console.log('Document ready!');

  // Custom Cursor
  initCustomCursor();

  // Mobile Navigation
  initMobileNav();

  // Scroll Animations
  initScrollAnimations();

  // Click Ripple Effect
  initRippleEffect();

  // Contact Form Handling
  initContactForm();
});

// =============================================
// Custom Animated Cursor
// =============================================
function initCustomCursor() {
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');

  // Variables for smooth animation
  let mouseX = 0;
  let mouseY = 0;
  let dotX = 0;
  let dotY = 0;
  let outlineX = 0;
  let outlineY = 0;

  // Set initial positions off-screen
  gsTransform(cursorDot, -100, -100);
  gsTransform(cursorOutline, -100, -100);

  // Update mouse position
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseout', () => {
    cursorDot.style.opacity = 0;
    cursorOutline.style.opacity = 0;
  });

  // Show cursor when entering window
  document.addEventListener('mouseover', () => {
    cursorDot.style.opacity = 1;
    cursorOutline.style.opacity = 1;
  });

  // Add hover effect for links and buttons
  const hoverables = document.querySelectorAll('a, button, .hamburger, .project-card, .skill-card, input, textarea');
  hoverables.forEach(hoverable => {
    hoverable.addEventListener('mouseenter', () => {
      cursorOutline.style.width = '70px';
      cursorOutline.style.height = '70px';
      cursorOutline.style.borderColor = 'rgba(99, 102, 241, 0.8)';
      cursorDot.style.backgroundColor = 'rgba(99, 102, 241, 0.8)';
    });

    hoverable.addEventListener('mouseleave', () => {
      cursorOutline.style.width = '40px';
      cursorOutline.style.height = '40px';
      cursorOutline.style.borderColor = 'rgba(99, 102, 241, 0.5)';
      cursorDot.style.backgroundColor = '#6366f1';
    });
  });

  // Animation loop for smooth cursor movement
  function animateCursor() {
    // Smooth movement with easing
    dotX += (mouseX - dotX) * 0.2;
    dotY += (mouseY - dotY) * 0.2;
    
    // Outline follows dot with delay
    outlineX += (mouseX - outlineX) * 0.1;
    outlineY += (mouseY - outlineY) * 0.1;

    // Apply transforms
    gsTransform(cursorDot, dotX, dotY);
    gsTransform(cursorOutline, outlineX, outlineY);

    requestAnimationFrame(animateCursor);
  }

  // Helper function for transform
  function gsTransform(element, x, y) {
    element.style.transform = `translate(${x}px, ${y}px)`;
  }

  // Start animation loop
  animateCursor();
}

// =============================================
// Mobile Navigation Toggle
// =============================================
function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links a');
  
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  // Close mobile nav when clicking on nav items
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      }
      
      // Highlight active nav item
      navItems.forEach(link => link.classList.remove('active'));
      item.classList.add('active');
    });
  });
}

// =============================================
// Scroll Animations & Navbar
// =============================================
function initScrollAnimations() {
  // Navbar scroll behavior
  const navbar = document.querySelector('.navbar');
  let lastScrollTop = 0;
  
  // Reveal elements on scroll
  const revealElements = document.querySelectorAll('.reveal');
  
  // Update active nav on scroll
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Navbar behavior (hide/show on scroll)
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop;
    
    // Update navbar background
    if (scrollTop > 50) {
      navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
      navbar.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.3)';
    } else {
      navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.8)';
      navbar.style.boxShadow = 'none';
    }
    
    // Reveal elements on scroll
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('revealed');
      }
    });
    
    // Update active nav section
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollTop >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  });
  
  // Trigger initial scroll to show elements in view
  setTimeout(() => {
    window.dispatchEvent(new Event('scroll'));
  }, 100);
}

// =============================================
// Click Ripple Effect
// =============================================
function initRippleEffect() {
  const rippleContainer = document.querySelector('.ripple-container');
  
  document.addEventListener('click', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    rippleContainer.appendChild(ripple);
    
    // Remove ripple after animation completes
    setTimeout(() => {
      ripple.remove();
    }, 800);
  });
}

// =============================================
// Contact Form Submission
// =============================================
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Simple validation
      if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
      }
      
      // Simulate form submission
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
      
      // Simulate API call with timeout
      setTimeout(() => {
        console.log('Form submitted:', { name, email, subject, message });
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        
        // Show success message
        alert('Message sent successfully!');
      }, 1500);
    });
  }
}

// =============================================
// Utility Functions
// =============================================

// Function for smooth scrolling to anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80, // Offset for navbar
        behavior: 'smooth'
      });
    }
  });
});
