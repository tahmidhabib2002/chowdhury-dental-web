// Main JavaScript functionality for the dental clinic website

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeFloatingMessage();
    initializeSmoothScrolling();
    initializeScrollAnimations();
    initializeNavbarScrollEffect();
});

// Navigation functionality
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target) || navToggle.contains(event.target);
            
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    // Highlight active nav link based on scroll position
    window.addEventListener('scroll', highlightActiveNavLink);
}

// Highlight active navigation link based on current section
function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPosition = window.scrollY + 100; // Offset for navbar height

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all nav links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });

            // Add active class to current section's nav link
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

// Floating message functionality
function initializeFloatingMessage() {
    const messageBtn = document.getElementById('message-btn');
    const messageOptions = document.getElementById('message-options');
    let isOptionsVisible = false;

    if (messageBtn && messageOptions) {
        // Toggle message options
        messageBtn.addEventListener('click', function(event) {
            event.stopPropagation();
            isOptionsVisible = !isOptionsVisible;
            
            if (isOptionsVisible) {
                messageOptions.classList.add('show');
                messageBtn.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                messageOptions.classList.remove('show');
                messageBtn.innerHTML = '<i class="fas fa-comments"></i>';
            }
        });

        // Close options when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInside = messageBtn.contains(event.target) || messageOptions.contains(event.target);
            
            if (!isClickInside && isOptionsVisible) {
                messageOptions.classList.remove('show');
                messageBtn.innerHTML = '<i class="fas fa-comments"></i>';
                isOptionsVisible = false;
            }
        });

        // Add click tracking for message options
        const messageOptionLinks = messageOptions.querySelectorAll('.message-option');
        messageOptionLinks.forEach(link => {
            link.addEventListener('click', function() {
                // You can add analytics tracking here
                console.log('Message option clicked:', this.textContent.trim());
                
                // Close the options after clicking
                setTimeout(() => {
                    messageOptions.classList.remove('show');
                    messageBtn.innerHTML = '<i class="fas fa-comments"></i>';
                    isOptionsVisible = false;
                }, 200);
            });
        });
    }
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                event.preventDefault();
                
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations
function initializeScrollAnimations() {
    // Options for the Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Create the observer
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add animation class based on element type
                if (element.classList.contains('doctor-card')) {
                    element.classList.add('animate-fade-in-up');
                } else if (element.classList.contains('service-card')) {
                    element.classList.add('animate-fade-in-up');
                } else if (element.classList.contains('gallery-item')) {
                    element.classList.add('animate-fade-in-up');
                } else if (element.classList.contains('about-text')) {
                    element.classList.add('animate-slide-in-left');
                } else if (element.classList.contains('about-images')) {
                    element.classList.add('animate-slide-in-right');
                } else {
                    element.classList.add('animate-fade-in-up');
                }
                
                // Stop observing this element
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Observe elements that should animate on scroll
    const animatedElements = document.querySelectorAll(
        '.doctor-card, .service-card, .gallery-item, .about-text, .about-images, .contact-item'
    );
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Navbar scroll effect
function initializeNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow when scrolled
        if (scrollTop > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Utility function to check if element is in viewport
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Add loading animation for images
function initializeImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        // If image is already cached and loaded
        if (img.complete) {
            img.classList.add('loaded');
        }
    });
}

// Initialize image loading when DOM is ready
document.addEventListener('DOMContentLoaded', initializeImageLoading);

// Add keyboard navigation support
document.addEventListener('keydown', function(event) {
    // Close floating message options with Escape key
    if (event.key === 'Escape') {
        const messageOptions = document.getElementById('message-options');
        const messageBtn = document.getElementById('message-btn');
        
        if (messageOptions && messageOptions.classList.contains('show')) {
            messageOptions.classList.remove('show');
            messageBtn.innerHTML = '<i class="fas fa-comments"></i>';
        }
    }
});

// Add click tracking for analytics (optional)
function trackClick(elementName, action) {
    // This function can be used to track user interactions
    // You can integrate with Google Analytics, Facebook Pixel, etc.
    console.log(`User interaction: ${elementName} - ${action}`);
    
    // Example Google Analytics tracking (uncomment if using GA)
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', action, {
    //         'event_category': 'engagement',
    //         'event_label': elementName
    //     });
    // }
}

// Add click tracking to important elements
document.addEventListener('DOMContentLoaded', function() {
    // Track button clicks
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            trackClick('Button', `Clicked: ${this.textContent.trim()}`);
        });
    });
    
    // Track social media clicks
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackClick('Social Media', `Clicked: ${this.className}`);
        });
    });
    
    // Track doctor card interactions
    const doctorCards = document.querySelectorAll('.doctor-card');
    doctorCards.forEach(card => {
        card.addEventListener('click', function() {
            const doctorName = this.querySelector('.doctor-name').textContent;
            trackClick('Doctor Card', `Viewed: ${doctorName}`);
        });
    });
});

// Performance optimization: Lazy loading for images
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Error handling for missing elements
function handleMissingElements() {
    const requiredElements = [
        'nav-toggle',
        'nav-menu',
        'message-btn',
        'message-options'
    ];

    requiredElements.forEach(elementId => {
        const element = document.getElementById(elementId);
        if (!element) {
            console.warn(`Element with ID '${elementId}' not found. Some functionality may not work.`);
        }
    });
}

// Call error handling function
document.addEventListener('DOMContentLoaded', handleMissingElements);
