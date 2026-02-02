document.addEventListener('DOMContentLoaded', function() {
    
    // =========================================
    // 1. MOBILE MENU (DRAWER) LOGIC
    // =========================================
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const closeBtn = document.querySelector('.close-menu-btn');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const body = document.body;
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    // মেনু খোলার ফাংশন
    function openMenu() {
        body.classList.add('mobile-menu-active');
        body.style.overflow = 'hidden'; // স্ক্রল বন্ধ করা
    }

    // মেনু বন্ধ করার ফাংশন
    function closeMenu() {
        body.classList.remove('mobile-menu-active');
        body.style.overflow = ''; // স্ক্রল চালু করা
    }

    // ইভেন্ট লিসেনার
    if (menuBtn) {
        menuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            openMenu();
        });
    }

    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);

    // মেনুর লিংকে ক্লিক করলে মেনু বন্ধ হবে
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });



    // script.js-তে যোগ করুন:
document.addEventListener('DOMContentLoaded', function() {
  document.body.classList.add('loaded');
});


    // =========================================
    // 2. STICKY NAVBAR LOGIC
    // =========================================
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('sticky');
            } else {
                navbar.classList.remove('sticky');
            }
        });
    }


    // =========================================
    // 3. COUNTER ANIMATION (HOME PAGE)
    // =========================================
    function animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start) + '+';
            }
        }, 16);
    }
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // হিরো সেকশনের স্ট্যাটাস (Home Page)
                const statBoxes = document.querySelectorAll('.stat-box h3');
                statBoxes.forEach(box => {
                    const targetNum = parseInt(box.innerText.replace(/[^0-9]/g, ''));
                    if (targetNum > 0) {
                        animateCounter(box, targetNum, 2000);
                    }
                });

                // ওল্ড এক্সপেরিয়েন্স ব্যাজ
                const counterElement = entry.target.querySelector('.years');
                if (counterElement) {
                    animateCounter(counterElement, 30, 2000);
                }
                
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        counterObserver.observe(heroSection);
    }


    // =========================================
    // 4. SCROLL TO TOP BUTTON
    // =========================================
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    if (scrollTopBtn) {
        // ক্লিক ইভেন্ট
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // স্ক্রল ইভেন্ট (বাটন দেখানো/লুকানো)
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });
    }


    // =========================================
    // 5. ACTIVE LINK HIGHLIGHT
    // =========================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.nav-link, .mobile-nav-links a').forEach(link => {
        // সব এক্টিভ ক্লাস রিমুভ
        link.classList.remove('active');
        
        // বর্তমান লিংকে এক্টিভ ক্লাস অ্যাড
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

});

document.addEventListener('DOMContentLoaded', function() {
    
    // =========================================
    // 1. MOBILE MENU (DRAWER) LOGIC - FIXED
    // =========================================
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const closeBtn = document.querySelector('.close-menu-btn');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const body = document.body;
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    // মেনু খোলার ফাংশন
    function openMenu() {
        body.classList.add('mobile-menu-active'); // body তে ক্লাস এড হবে
        body.style.overflow = 'hidden'; // স্ক্রল বন্ধ করা
    }

    // মেনু বন্ধ করার ফাংশন
    function closeMenu() {
        body.classList.remove('mobile-menu-active'); // ক্লাস রিমুভ হবে
        body.style.overflow = ''; // স্ক্রল চালু করা
    }

    // ইভেন্ট লিসেনার (যদি বাটন থাকে তবেই কাজ করবে)
    if (menuBtn) {
        menuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            openMenu();
        });
    }

    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);

    // মেনুর লিংকে ক্লিক করলে মেনু বন্ধ হবে
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });


    // =========================================
    // 2. STICKY NAVBAR LOGIC
    // =========================================
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('sticky');
            } else {
                navbar.classList.remove('sticky');
            }
        });
    }


    // =========================================
    // 3. COUNTER ANIMATION (GLOBAL)
    // =========================================
    // সব পেজের জন্য কাউন্টার সিলেক্টর ঠিক করা হলো
    const stats = document.querySelectorAll('.stat-number, .stat-box h3, .years');

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // ডেটা অথবা টেক্সট থেকে টার্গেট ভ্যালু নেওয়া
                let target = 0;
                if (element.hasAttribute('data-count')) {
                    target = parseInt(element.getAttribute('data-count'));
                } else {
                    target = parseInt(element.innerText.replace(/[^0-9]/g, ''));
                }

                if (target > 0) {
                    animateCounter(element, target, 2000);
                    observer.unobserve(element);
                }
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => counterObserver.observe(stat));

    function animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.innerText = target.toLocaleString('bn-BD') + '+'; // বাংলা বা ইংরেজিতে প্লাস সাইন
                clearInterval(timer);
            } else {
                element.innerText = Math.floor(start).toLocaleString('bn-BD');
            }
        }, 16);
    }


    // =========================================
    // 4. SCROLL TO TOP BUTTON
    // =========================================
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });
    }

    // =========================================
    // 5. ACTIVE LINK HIGHLIGHT (URL Check)
    // =========================================
    // বর্তমান পেজের নাম বের করা
    const pathName = window.location.pathname;
    const pageName = pathName.split("/").pop();

    const allLinks = document.querySelectorAll('.nav-link, .mobile-nav-links a');

    allLinks.forEach(link => {
        // href অ্যাট্রিবিউট থেকে পেজের নাম নেওয়া
        const linkPage = link.getAttribute('href');

        if (linkPage === pageName || (pageName === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const closeMenuBtn = document.querySelector('.close-menu-btn');
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
const mobileMenuSidebar = document.querySelector('.mobile-menu-sidebar');
const body = document.body;

// Open mobile menu
mobileMenuBtn.addEventListener('click', () => {
    body.classList.add('mobile-menu-active');
});

// Close mobile menu
closeMenuBtn.addEventListener('click', () => {
    body.classList.remove('mobile-menu-active');
});

mobileMenuOverlay.addEventListener('click', () => {
    body.classList.remove('mobile-menu-active');
});

// Close menu when clicking on links
const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        body.classList.remove('mobile-menu-active');
    });
});

// Sticky Navbar
const navbar = document.querySelector('.navbar');
const topOfferBar = document.querySelector('.top-offer-bar');
let topOfferHeight = topOfferBar ? topOfferBar.offsetHeight : 0;

window.addEventListener('scroll', () => {
    if (window.scrollY > topOfferHeight) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
    
    // Scroll to top button
    const scrollTopBtn = document.querySelector('.scroll-btn');
    if (scrollTopBtn) {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    }
});

// Scroll to top functionality
const scrollTopBtn = document.getElementById('scrollTopBtn');
if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const phone = formData.get('phone');
        
        // Show success message
        alert(`ধন্যবাদ ${name}! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব (${phone})`);
        
        // Reset form
        this.reset();
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    const yearSpan = document.querySelector('.current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Add animation to elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.fadeInUp, .service-card, .doctor-card, .case-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check
});
/**
 * Chowdhury Dental - Main JavaScript
 * Author: Tahmid Habib
 * Version: 3.0.0
 * SEO Optimized | Mobile First | Performance Focused
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // ===========================================
    // 1. Mobile Navigation Toggle
    // ===========================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('active');
            body.classList.toggle('nav-open');
            
            // Animate hamburger to X
            const bars = this.querySelectorAll('.bar');
            if (isExpanded) {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            } else {
                bars[0].style.transform = 'translateY(8px) rotate(45deg)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'translateY(-8px) rotate(-45deg)';
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mainNav && mainNav.classList.contains('active')) {
            if (!mainNav.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                mainNav.classList.remove('active');
                body.classList.remove('nav-open');
                
                // Reset hamburger icon
                const bars = mobileMenuToggle.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        }
    });
    
    // Close mobile menu on ESC key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && mainNav.classList.contains('active')) {
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            mainNav.classList.remove('active');
            body.classList.remove('nav-open');
        }
    });
    
    // ===========================================
    // 2. Sticky Header on Scroll
    // ===========================================
    const header = document.querySelector('.main-header');
    
    function updateHeaderOnScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', updateHeaderOnScroll);
    updateHeaderOnScroll(); // Initial check
    
    // ===========================================
    // 3. Scroll to Top Button
    // ===========================================
    const scrollTopBtn = document.getElementById('scrollToTop');
    
    if (scrollTopBtn) {
        function toggleScrollTopButton() {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        }
        
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        window.addEventListener('scroll', toggleScrollTopButton);
        toggleScrollTopButton(); // Initial check
    }
    
    // ===========================================
    // 4. Lazy Loading Images
    // ===========================================
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                img.src = img.dataset.src || img.src;
            });
        }
    }
    
    lazyLoadImages();
    
    // ===========================================
    // 5. Smooth Scroll for Anchor Links
    // ===========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (mainNav.classList.contains('active')) {
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                    mainNav.classList.remove('active');
                    body.classList.remove('nav-open');
                }
                
                // Scroll to target
                const headerHeight = header.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without page jump
                history.pushState(null, null, href);
            }
        });
    });
    
    // ===========================================
    // 6. Current Year in Copyright
    // ===========================================
    const copyrightYearElements = document.querySelectorAll('[itemprop="copyrightYear"]');
    if (copyrightYearElements.length > 0) {
        const currentYear = new Date().getFullYear();
        copyrightYearElements.forEach(element => {
            element.textContent = currentYear;
        });
    }
    
    // ===========================================
    // 7. Form Handling (if any forms exist)
    // ===========================================
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    
                    // Add error message
                    if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
                        const errorMsg = document.createElement('span');
                        errorMsg.className = 'error-message';
                        errorMsg.textContent = 'এই ফিল্ডটি পূরণ করুন';
                        errorMsg.style.cssText = 'color: #f44336; font-size: 0.875rem; margin-top: 0.25rem; display: block;';
                        field.parentNode.insertBefore(errorMsg, field.nextSibling);
                    }
                } else {
                    field.classList.remove('error');
                    
                    // Remove error message
                    const errorMsg = field.nextElementSibling;
                    if (errorMsg && errorMsg.classList.contains('error-message')) {
                        errorMsg.remove();
                    }
                }
            });
            
            if (isValid) {
                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> পাঠানো হচ্ছে...';
                submitBtn.disabled = true;
                
                // Simulate form submission (replace with actual AJAX call)
                setTimeout(() => {
                    alert('আপনার বার্তা সফলভাবে পাঠানো হয়েছে! আমরা শীঘ্রই যোগাযোগ করব।');
                    this.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    this.classList.remove('error');
                    
                    const errorMsg = this.nextElementSibling;
                    if (errorMsg && errorMsg.classList.contains('error-message')) {
                        errorMsg.remove();
                    }
                }
            });
        });
    });
    
    // ===========================================
    // 8. Service Cards Animation on Scroll
    // ===========================================
    function animateOnScroll() {
        const elements = document.querySelectorAll('.service-card, .doctor-card, .testimonial-card, .news-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }
    
    // Wait for page to fully load before animating
    window.addEventListener('load', animateOnScroll);
    
    // ===========================================
    // 9. Phone Number Formatting
    // ===========================================
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    
    phoneLinks.forEach(link => {
        const phoneNumber = link.getAttribute('href').replace('tel:', '');
        const formattedNumber = formatPhoneNumber(phoneNumber);
        
        // Update link text if it contains the number
        if (link.textContent.includes(phoneNumber)) {
            link.textContent = link.textContent.replace(phoneNumber, formattedNumber);
        }
    });
    
    function formatPhoneNumber(phone) {
        // Remove all non-digits
        const cleaned = phone.replace(/\D/g, '');
        
        // Format Bangladeshi numbers
        if (cleaned.length === 11 && cleaned.startsWith('01')) {
            return cleaned.replace(/(\d{4})(\d{3})(\d{4})/, '$1-$2-$3');
        } else if (cleaned.length === 13 && cleaned.startsWith('8801')) {
            const localNumber = cleaned.substring(3);
            return localNumber.replace(/(\d{4})(\d{3})(\d{4})/, '$1-$2-$3');
        }
        
        return phone;
    }
    
    // ===========================================
    // 10. Google Maps Enhancement
    // ===========================================
    const mapIframes = document.querySelectorAll('iframe[src*="google.com/maps"]');
    
    mapIframes.forEach(iframe => {
        // Add loading="lazy" if not present
        if (!iframe.hasAttribute('loading')) {
            iframe.setAttribute('loading', 'lazy');
        }
        
        // Add title if not present
        if (!iframe.hasAttribute('title')) {
            iframe.setAttribute('title', 'Chowdhury Dental Location Map');
        }
    });
    
    // ===========================================
    // 11. Testimonials Slider (Simple Version)
    // ===========================================
    function initTestimonialsSlider() {
        const sliderContainer = document.querySelector('.testimonials-slider');
        if (!sliderContainer) return;
        
        const cards = sliderContainer.children;
        let currentIndex = 0;
        
        // Only create slider if there are more than 2 cards
        if (cards.length > 2) {
            // Add navigation buttons
            const prevBtn = document.createElement('button');
            prevBtn.className = 'slider-nav prev';
            prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
            prevBtn.setAttribute('aria-label', 'Previous testimonial');
            
            const nextBtn = document.createElement('button');
            nextBtn.className = 'slider-nav next';
            nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
            nextBtn.setAttribute('aria-label', 'Next testimonial');
            
            sliderContainer.parentNode.appendChild(prevBtn);
            sliderContainer.parentNode.appendChild(nextBtn);
            
            // Add slider indicators
            const indicators = document.createElement('div');
            indicators.className = 'slider-indicators';
            
            for (let i = 0; i < cards.length - 2; i++) {
                const indicator = document.createElement('button');
                indicator.className = 'indicator';
                indicator.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
                indicator.setAttribute('data-index', i);
                if (i === 0) indicator.classList.add('active');
                indicators.appendChild(indicator);
            }
            
            sliderContainer.parentNode.appendChild(indicators);
            
            // Navigation functions
            function goToSlide(index) {
                if (index < 0) index = cards.length - 3;
                if (index > cards.length - 3) index = 0;
                
                currentIndex = index;
                const translateX = -index * (100 / 3);
                sliderContainer.style.transform = `translateX(${translateX}%)`;
                
                // Update active indicator
                document.querySelectorAll('.indicator').forEach((ind, i) => {
                    ind.classList.toggle('active', i === index);
                });
            }
            
            // Event listeners
            prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
            nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
            
            document.querySelectorAll('.indicator').forEach(indicator => {
                indicator.addEventListener('click', () => {
                    const index = parseInt(indicator.getAttribute('data-index'));
                    goToSlide(index);
                });
            });
            
            // Auto slide
            let autoSlide = setInterval(() => goToSlide(currentIndex + 1), 5000);
            
            // Pause auto slide on hover
            sliderContainer.addEventListener('mouseenter', () => clearInterval(autoSlide));
            sliderContainer.addEventListener('mouseleave', () => {
                autoSlide = setInterval(() => goToSlide(currentIndex + 1), 5000);
            });
            
            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') goToSlide(currentIndex - 1);
                if (e.key === 'ArrowRight') goToSlide(currentIndex + 1);
            });
        }
    }
    
    // Wait a bit for DOM to settle
    setTimeout(initTestimonialsSlider, 1000);
    
    // ===========================================
    // 12. Dynamic Schema Data Injection
    // ===========================================
    function injectDynamicSchema() {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        
        const schema = {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": document.title,
            "description": document.querySelector('meta[name="description"]')?.content || '',
            "url": window.location.href,
            "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "হোম",
                        "item": window.location.origin
                    }
                ]
            },
            "mainEntity": document.querySelector('main')?.innerText || '',
            "datePublished": document.querySelector('meta[property="article:published_time"]')?.content || new Date().toISOString(),
            "dateModified": document.querySelector('meta[property="article:modified_time"]')?.content || new Date().toISOString(),
            "publisher": {
                "@type": "Organization",
                "name": "Chowdhury Dental",
                "logo": {
                    "@type": "ImageObject",
                    "url": "img/Chowdhury Dental Logo.png"
                }
            }
        };
        
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
    }
    
    injectDynamicSchema();
    
    // ===========================================
    // 13. Performance Monitoring
    // ===========================================
    if ('performance' in window) {
        // Log Largest Contentful Paint
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.startTime, 'ms');
        }).observe({ type: 'largest-contentful-paint', buffered: true });
        
        // Log First Input Delay
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                console.log('FID:', entry.processingStart - entry.startTime, 'ms');
            }
        }).observe({ type: 'first-input', buffered: true });
    }
    
    // ===========================================
    // 14. Service Worker Registration (PWA)
    // ===========================================
    if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').catch(error => {
                console.log('Service Worker registration failed:', error);
            });
        });
    }
    
    // ===========================================
    // 15. Accessibility Improvements
    // ===========================================
    
    // Add focus trap for mobile menu
    if (mainNav) {
        const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        const firstFocusableElement = mainNav.querySelectorAll(focusableElements)[0];
        const focusableContent = mainNav.querySelectorAll(focusableElements);
        const lastFocusableElement = focusableContent[focusableContent.length - 1];
        
        document.addEventListener('keydown', function(e) {
            if (mainNav.classList.contains('active')) {
                let isTabPressed = e.key === 'Tab';
                
                if (!isTabPressed) return;
                
                if (e.shiftKey) { // Shift + Tab
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else { // Tab
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }
    
    // Add aria-live region for dynamic content
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'visually-hidden';
    document.body.appendChild(liveRegion);
    
    // ===========================================
    // 16. Network Status Detection
    // ===========================================
    function updateNetworkStatus() {
        const isOnline = navigator.onLine;
        const statusElement = document.createElement('div');
        statusElement.className = `network-status ${isOnline ? 'online' : 'offline'}`;
        statusElement.textContent = isOnline ? 'You are online' : 'You are offline';
        statusElement.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            padding: 10px;
            text-align: center;
            color: white;
            font-weight: bold;
            z-index: 9999;
            transform: translateY(${isOnline ? '-100%' : '0'});
            transition: transform 0.3s ease;
        `;
        
        if (isOnline) {
            statusElement.style.backgroundColor = '#4CAF50';
        } else {
            statusElement.style.backgroundColor = '#F44336';
            setTimeout(() => {
                statusElement.style.transform = 'translateY(-100%)';
            }, 3000);
        }
        
        const existingStatus = document.querySelector('.network-status');
        if (existingStatus) {
            existingStatus.remove();
        }
        
        document.body.appendChild(statusElement);
        
        // Show status
        setTimeout(() => {
            statusElement.style.transform = 'translateY(0)';
        }, 100);
    }
    
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);
    updateNetworkStatus(); // Initial check
    
    // ===========================================
    // 17. Print Functionality
    // ===========================================
    const printBtn = document.createElement('button');
    printBtn.className = 'print-btn visually-hidden';
    printBtn.innerHTML = '<i class="fas fa-print"></i> প্রিন্ট করুন';
    printBtn.setAttribute('aria-label', 'Print this page');
    printBtn.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 20px;
        background: #1976D2;
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 50px;
        cursor: pointer;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        z-index: 999;
        display: flex;
        align-items: center;
        gap: 8px;
        font-family: 'Baloo Da 2', cursive;
    `;
    
    printBtn.addEventListener('click', () => window.print());
    document.body.appendChild(printBtn);
    
    // Show print button on larger screens
    if (window.innerWidth > 768) {
        printBtn.classList.remove('visually-hidden');
    }
    
    // ===========================================
    // 18. Cookie Consent (Basic)
    // ===========================================
    if (!localStorage.getItem('cookieConsent')) {
        const cookieConsent = document.createElement('div');
        cookieConsent.className = 'cookie-consent';
        cookieConsent.innerHTML = `
            <div class="cookie-content">
                <p>আমরা আপনার অভিজ্ঞতা উন্নত করতে কুকিজ ব্যবহার করি। এই ওয়েবসাইট ব্যবহার করে আপনি আমাদের কুকি নীতি মেনে চলেন।</p>
                <div class="cookie-actions">
                    <button class="btn btn-primary btn-small accept-cookies">স্বীকার করুন</button>
                    <button class="btn btn-outline btn-small learn-more">আরো জানুন</button>
                </div>
            </div>
        `;
        
        cookieConsent.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: var(--dark);
            color: white;
            padding: 20px;
            z-index: 9998;
            box-shadow: 0 -4px 12px rgba(0,0,0,0.1);
        `;
        
        document.body.appendChild(cookieConsent);
        
        // Add styles for cookie content
        const cookieContent = cookieConsent.querySelector('.cookie-content');
        cookieContent.style.cssText = `
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            flex-wrap: wrap;
        `;
        
        cookieContent.querySelector('p').style.cssText = `
            margin: 0;
            flex: 1;
            min-width: 300px;
            font-size: 14px;
        `;
        
        const cookieActions = cookieContent.querySelector('.cookie-actions');
        cookieActions.style.cssText = `
            display: flex;
            gap: 10px;
        `;
        
        // Event listeners
        cookieConsent.querySelector('.accept-cookies').addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'accepted');
            cookieConsent.style.transform = 'translateY(100%)';
            setTimeout(() => cookieConsent.remove(), 300);
        });
        
        cookieConsent.querySelector('.learn-more').addEventListener('click', () => {
            // Open privacy policy page or modal
            alert('আমাদের গোপনীয়তা নীতি সম্পর্কে জানতে আমাদের প্রাইভেসি পলিসি পেজ ভিজিট করুন।');
        });
    }
    
    // ===========================================
    // 19. WhatsApp Click Tracking
    // ===========================================
    const whatsappLinks = document.querySelectorAll('a[href*="whatsapp"], .whatsapp-btn');
    
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Send data to Google Analytics (if configured)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'whatsapp_click', {
                    'event_category': 'engagement',
                    'event_label': this.href
                });
            }
        });
    });
    
    // ===========================================
    // 20. Phone Call Tracking
    // ===========================================
    const phoneCallLinks = document.querySelectorAll('a[href^="tel:"]');
    
    phoneCallLinks.forEach(link => {
        link.addEventListener('click', function() {
            const phoneNumber = this.getAttribute('href').replace('tel:', '');
            
            // Send data to Google Analytics (if configured)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'phone_call', {
                    'event_category': 'engagement',
                    'event_label': phoneNumber
                });
            }
            
            // Log to console for debugging
            console.log('Phone call initiated to:', phoneNumber);
        });
    });
});

// ===========================================
// Utility Functions
// ===========================================

/**
 * Debounce function for performance optimization
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function for performance optimization
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Generate UUID for tracking purposes
 */
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// ===========================================
// Error Tracking
// ===========================================

window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    
    // You can send this to your error tracking service
    // Example: sendToErrorTrackingService(e);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
    
    // You can send this to your error tracking service
    // Example: sendToErrorTrackingService(e.reason);
});

// ===========================================
// Page Visibility API
// ===========================================

document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('Page is now hidden');
        // Pause animations, videos, etc.
    } else {
        console.log('Page is now visible');
        // Resume animations, videos, etc.
    }
});

// ===========================================
// Online/Offline Detection
// ===========================================

window.addEventListener('online', function() {
    console.log('You are now online');
    // Sync data, enable forms, etc.
});

window.addEventListener('offline', function() {
    console.log('You are now offline');
    // Show offline message, disable forms, etc.
});

// ===========================================
// Before Install Prompt (PWA)
// ===========================================

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    
    // Show install button
    const installButton = document.createElement('button');
    installButton.textContent = 'Install App';
    installButton.className = 'install-btn';
    installButton.style.cssText = `
        position: fixed;
        bottom: 160px;
        right: 20px;
        background: #1976D2;
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 50px;
        cursor: pointer;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        z-index: 999;
        display: flex;
        align-items: center;
        gap: 8px;
        font-family: 'Baloo Da 2', cursive;
    `;
    
    installButton.addEventListener('click', () => {
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            deferredPrompt = null;
            installButton.remove();
        });
    });
    
    document.body.appendChild(installButton);
});
