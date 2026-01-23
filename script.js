// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.05)';
    }
});

// Scroll to top button
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Scroll reveal animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal, .section-header').forEach((el) => {
    observer.observe(el);
});

// Add reveal class to sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('reveal');
});

// Add floating message button functionality (optional)
const messageBtn = document.querySelector('.message-btn');
const messageOptions = document.querySelector('.message-options');

if (messageBtn) {
    messageBtn.addEventListener('click', () => {
        messageOptions.classList.toggle('show');
    });
    
    document.addEventListener('click', (e) => {
        if (!messageBtn.contains(e.target) && !messageOptions.contains(e.target)) {
            messageOptions.classList.remove('show');
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});
// =========================================
// HERO SLIDER SCRIPT (AUTO PLAY)
// =========================================
document.addEventListener("DOMContentLoaded", function() {
    let slides = document.querySelectorAll(".slide");
    let dots = document.querySelectorAll(".dot");
    let currentSlide = 0;
    const slideInterval = 3000; // ৩০০০ মিলি সেকেন্ড = ৩ সেকেন্ড

    function nextSlide() {
        // বর্তমান স্লাইড এবং ডট থেকে active ক্লাস সরানো
        slides[currentSlide].classList.remove("active");
        dots[currentSlide].classList.remove("active");

        // পরের স্লাইডে যাওয়া (লুপ আকারে)
        currentSlide = (currentSlide + 1) % slides.length;

        // নতুন স্লাইড এবং ডটে active ক্লাস যোগ করা
        slides[currentSlide].classList.add("active");
        dots[currentSlide].classList.add("active");
    }

    // প্রতি ৩ সেকেন্ড পর পর nextSlide ফাংশন কল হবে
    setInterval(nextSlide, slideInterval);
});// =========================================
// COVERFLOW GALLERY EFFECT
// =========================================
document.addEventListener('DOMContentLoaded', function() {
    const coverflowWrapper = document.querySelector('.coverflow-wrapper');
    const cards = document.querySelectorAll('.gallery-card');
    const prevBtn = document.querySelector('.coverflow-prev');
    const nextBtn = document.querySelector('.coverflow-next');
    const currentSlideEl = document.querySelector('.current-slide');
    const totalSlidesEl = document.querySelector('.total-slides');
    
    let currentIndex = 0;
    const totalCards = cards.length;
    const visibleCards = 5; // একসাথে কতগুলো কার্ড দেখাবে
    
    // মোবাইল ডিভাইস চেক
    const isMobile = window.innerWidth <= 768;
    
    // ইনিশিয়াল সেটআপ
    totalSlidesEl.textContent = totalCards;
    updateCoverflow();
    
    // কার্ডগুলোর জন্য ইভেন্ট লিসেনার
    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            if (index !== currentIndex) {
                currentIndex = index;
                updateCoverflow();
            }
        });
    });
    
    // পূর্ববর্তী বাটন
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateCoverflow();
    });
    
    // পরবর্তী বাটন
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalCards;
        updateCoverflow();
    });
    
    // টাচ সুইপ সাপোর্ট (মোবাইলের জন্য)
    let touchStartX = 0;
    let touchEndX = 0;
    
    coverflowWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    coverflowWrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // বাম দিকে সুইপ - পরবর্তী কার্ড
            currentIndex = (currentIndex + 1) % totalCards;
            updateCoverflow();
        }
        
        if (touchEndX > touchStartX + swipeThreshold) {
            // ডান দিকে সুইপ - পূর্ববর্তী কার্ড
            currentIndex = (currentIndex - 1 + totalCards) % totalCards;
            updateCoverflow();
        }
    }
    
    // কিবোর্ড নেভিগেশন
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + totalCards) % totalCards;
            updateCoverflow();
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % totalCards;
            updateCoverflow();
        }
    });
    
    // কভারফ্লো আপডেট ফাংশন
    function updateCoverflow() {
        const mobileView = window.innerWidth <= 768;
        const cardWidth = mobileView ? 160 : 280;
        const spacing = mobileView ? 20 : 30;
        const maxRotation = mobileView ? 20 : 25;
        const maxTranslateZ = mobileView ? 80 : 120;
        
        // সব কার্ড রিসেট
        cards.forEach((card, index) => {
            let position = (index - currentIndex + totalCards) % totalCards;
            
            if (position > Math.floor(visibleCards / 2)) {
                position = position - totalCards;
            }
            
            let translateX = 0;
            let translateZ = 0;
            let rotateY = 0;
            let opacity = 1;
            let scale = 1;
            let zIndex = visibleCards - Math.abs(position);
            
            // মাঝের কার্ড (সেন্টার)
            if (position === 0) {
                translateX = 0;
                translateZ = maxTranslateZ;
                rotateY = 0;
                scale = 1.1;
                opacity = 1;
                zIndex = visibleCards + 1;
                card.classList.add('active');
            }
            // ডান দিকের কার্ড
            else if (position > 0) {
                translateX = position * (cardWidth + spacing);
                translateZ = maxTranslateZ - Math.abs(position) * 30;
                rotateY = -maxRotation * Math.abs(position);
                scale = 1 - Math.abs(position) * 0.15;
                opacity = 1 - Math.abs(position) * 0.3;
                card.classList.remove('active');
            }
            // বাম দিকের কার্ড
            else if (position < 0) {
                translateX = position * (cardWidth + spacing);
                translateZ = maxTranslateZ - Math.abs(position) * 30;
                rotateY = maxRotation * Math.abs(position);
                scale = 1 - Math.abs(position) * 0.15;
                opacity = 1 - Math.abs(position) * 0.3;
                card.classList.remove('active');
            }
            
            // অতিরিক্ত দূরের কার্ড লুকানো
            if (Math.abs(position) > Math.floor(visibleCards / 2)) {
                opacity = 0;
                visibility = 'hidden';
                zIndex = 0;
            } else {
                visibility = 'visible';
            }
            
            // CSS ট্রান্সফর্ম প্রয়োগ
            card.style.transform = `
                translateX(${translateX}px)
                translateZ(${translateZ}px)
                rotateY(${rotateY}deg)
                scale(${scale})
            `;
            card.style.opacity = opacity;
            card.style.visibility = visibility;
            card.style.zIndex = zIndex;
        });
        
        // কারেন্ট স্লাইড আপডেট
        currentSlideEl.textContent = currentIndex + 1;
        
        // বাটন স্টেট আপডেট
        prevBtn.disabled = false;
        nextBtn.disabled = false;
        prevBtn.style.opacity = '1';
        nextBtn.style.opacity = '1';
    }
    
    // রেসাইজ ইভেন্টে আপডেট
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateCoverflow();
        }, 200);
    });
    
    // অটো-প্লে (ঐচ্ছিক)
    let autoPlayInterval;
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalCards;
            updateCoverflow();
        }, 4000);
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // হোভার করলে অটোপ্লে থামবে
    coverflowWrapper.addEventListener('mouseenter', stopAutoPlay);
    coverflowWrapper.addEventListener('mouseleave', startAutoPlay);
    coverflowWrapper.addEventListener('touchstart', stopAutoPlay);
    coverflowWrapper.addEventListener('touchend', startAutoPlay);
    
    // শুরুতে অটোপ্লে চালু
    startAutoPlay();
});
// =========================================
// COMPLETE COVERFLOW SCRIPT FOR ALL DEVICES
// =========================================
document.addEventListener('DOMContentLoaded', function() {
    const coverflowWrapper = document.querySelector('.coverflow-wrapper');
    const cards = document.querySelectorAll('.gallery-card');
    const prevBtn = document.querySelector('.coverflow-prev');
    const nextBtn = document.querySelector('.coverflow-next');
    const currentSlideEl = document.querySelector('.current-slide');
    const totalSlidesEl = document.querySelector('.total-slides');
    
    let currentIndex = 0;
    const totalCards = cards.length;
    
    // ইনিশিয়াল সেটআপ
    totalSlidesEl.textContent = totalCards;
    updateCoverflow();
    
    // সব কার্ড দেখানো নিশ্চিত করুন
    cards.forEach(card => {
        card.style.visibility = 'visible';
        card.style.opacity = '1';
    });
    
    // পূর্ববর্তী বাটন
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateCoverflow();
    });
    
    // পরবর্তী বাটন
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalCards;
        updateCoverflow();
    });
    
    // ডিভাইস ডিটেকশন
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 992;
    
    // কভারফ্লো আপডেট ফাংশন - সব ডিভাইসের জন্য
    function updateCoverflow() {
        const screenWidth = window.innerWidth;
        let cardWidth, cardHeight, spacing, maxRotation, maxTranslateZ, visibleCards;
        
        // ডিভাইস অনুযায়ী সেটিংস
        if (screenWidth >= 1200) {
            // ডেস্কটপ
            cardWidth = 350;
            cardHeight = 420;
            spacing = 50;
            maxRotation = 30;
            maxTranslateZ = 120;
            visibleCards = 7;
        } else if (screenWidth >= 992) {
            // ল্যাপটপ
            cardWidth = 320;
            cardHeight = 390;
            spacing = 40;
            maxRotation = 25;
            maxTranslateZ = 100;
            visibleCards = 5;
        } else if (screenWidth >= 768) {
            // ট্যাবলেট
            cardWidth = 280;
            cardHeight = 350;
            spacing = 30;
            maxRotation = 20;
            maxTranslateZ = 80;
            visibleCards = 5;
        } else if (screenWidth >= 576) {
            // বড় মোবাইল
            cardWidth = 240;
            cardHeight = 320;
            spacing = 20;
            maxRotation = 15;
            maxTranslateZ = 60;
            visibleCards = 3;
        } else if (screenWidth >= 480) {
            // মাঝারি মোবাইল
            cardWidth = 220;
            cardHeight = 300;
            spacing = 15;
            maxRotation = 10;
            maxTranslateZ = 50;
            visibleCards = 3;
        } else {
            // ছোট মোবাইল
            cardWidth = 200;
            cardHeight = 280;
            spacing = 10;
            maxRotation = 8;
            maxTranslateZ = 40;
            visibleCards = 3;
        }
        
        // সব কার্ড প্রসেস করা
        cards.forEach((card, index) => {
            let position = (index - currentIndex + totalCards) % totalCards;
            
            // নেগেটিভ পজিশন হ্যান্ডেলিং
            if (position > Math.floor(visibleCards / 2)) {
                position = position - totalCards;
            }
            
            let translateX = 0;
            let translateZ = 0;
            let rotateY = 0;
            let opacity = 1;
            let scale = 1;
            let zIndex = 10;
            
            // সেন্টার কার্ড
            if (position === 0) {
                translateX = 0;
                translateZ = maxTranslateZ;
                rotateY = 0;
                scale = 1;
                opacity = 1;
                zIndex = 1000;
                card.classList.add('active');
                card.classList.remove('hidden');
            } 
            // ডান পাশের কার্ড
            else if (position > 0 && position <= Math.floor(visibleCards / 2)) {
                translateX = position * (cardWidth * 0.85 + spacing);
                translateZ = maxTranslateZ - Math.abs(position) * 25;
                rotateY = -maxRotation * Math.abs(position);
                scale = 0.9 - Math.abs(position) * 0.1;
                opacity = 0.8 - Math.abs(position) * 0.2;
                zIndex = 100 - position * 10;
                card.classList.remove('active');
                card.classList.remove('hidden');
            } 
            // বাম পাশের কার্ড
            else if (position < 0 && position >= -Math.floor(visibleCards / 2)) {
                translateX = position * (cardWidth * 0.85 + spacing);
                translateZ = maxTranslateZ - Math.abs(position) * 25;
                rotateY = maxRotation * Math.abs(position);
                scale = 0.9 - Math.abs(position) * 0.1;
                opacity = 0.8 - Math.abs(position) * 0.2;
                zIndex = 100 + position * 10;
                card.classList.remove('active');
                card.classList.remove('hidden');
            } 
            // স্ক্রিনের বাইরের কার্ড
            else {
                // লুকানো না রেখে দূরের কার্ড হিসেবে রাখা
                translateX = position * (cardWidth * 0.85 + spacing) * 2;
                translateZ = -100;
                rotateY = position > 0 ? -45 : 45;
                scale = 0.6;
                opacity = 0.3;
                zIndex = 1;
                card.classList.remove('active');
                card.classList.add('hidden');
            }
            
            // কার্ড স্টাইল অ্যাপ্লাই
            card.style.transform = `
                translateX(${translateX}px)
                translateZ(${translateZ}px)
                rotateY(${rotateY}deg)
                scale(${scale})
            `;
            card.style.opacity = opacity;
            card.style.zIndex = zIndex;
            card.style.width = cardWidth + 'px';
            card.style.height = cardHeight + 'px';
            
            // ট্রানজিশন
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        // কারেন্ট স্লাইড আপডেট
        currentSlideEl.textContent = currentIndex + 1;
    }
    
    // টাচ সুইপ সাপোর্ট
    let touchStartX = 0;
    let touchEndX = 0;
    
    coverflowWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });
    
    coverflowWrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = Math.abs(touchEndX - touchStartX);
        
        if (swipeDistance < swipeThreshold) return;
        
        if (touchEndX < touchStartX) {
            // বাম দিকে সুইপ - পরবর্তী কার্ড
            currentIndex = (currentIndex + 1) % totalCards;
        } else {
            // ডান দিকে সুইপ - পূর্ববর্তী কার্ড
            currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        }
        
        updateCoverflow();
    }
    
    // কিবোর্ড নেভিগেশন
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + totalCards) % totalCards;
            updateCoverflow();
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % totalCards;
            updateCoverflow();
        }
    });
    
    // রেসাইজ ইভেন্ট
    window.addEventListener('resize', () => {
        updateCoverflow();
    });
    
    // অটো-প্লে
    let autoPlayInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalCards;
        updateCoverflow();
    }, 4000);
    
    // হোভারে অটোপ্লে থামানো
    coverflowWrapper.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });
    
    coverflowWrapper.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalCards;
            updateCoverflow();
        }, 4000);
    });
    
    // টাচ ইভেন্টের জন্য
    coverflowWrapper.addEventListener('touchstart', () => {
        clearInterval(autoPlayInterval);
    }, { passive: true });
    
    coverflowWrapper.addEventListener('touchend', () => {
        setTimeout(() => {
            autoPlayInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % totalCards;
                updateCoverflow();
            }, 4000);
        }, 2000);
    }, { passive: true });
});
// মোবাইলের জন্য সরলীকৃত কভারফ্লো ফাংশন
function updateCoverflow() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // মোবাইলের জন্য সরল সেটিংস
        const cardWidth = window.innerWidth * 0.85; // স্ক্রিনের 85%
        const cardHeight = 380;
        const spacing = window.innerWidth * 0.15; // কার্ডগুলোর মধ্যে স্পেস
        const maxVisible = 3; // মোবাইলে শুধু ৩টা কার্ড দেখা যাবে
        
        cards.forEach((card, index) => {
            let position = (index - currentIndex + totalCards) % totalCards;
            
            // শুধু কাছাকাছি কার্ডগুলো দেখানো
            if (Math.abs(position) > maxVisible) {
                card.style.opacity = '0';
                card.style.visibility = 'hidden';
                card.style.transform = 'scale(0.8)';
                return;
            }
            
            // সেন্টার কার্ড
            if (position === 0) {
                card.classList.add('active');
                card.style.transform = 'translateX(0) scale(1)';
                card.style.opacity = '1';
                card.style.zIndex = '1000';
                card.style.width = cardWidth + 'px';
            }
            // ডান পাশের কার্ড
            else if (position > 0) {
                card.classList.remove('active');
                card.style.transform = `translateX(${position * (cardWidth + spacing)}px) scale(0.85)`;
                card.style.opacity = '0.6';
                card.style.zIndex = 100 - position;
                card.style.width = (cardWidth * 0.85) + 'px';
            }
            // বাম পাশের কার্ড
            else if (position < 0) {
                card.classList.remove('active');
                card.style.transform = `translateX(${position * (cardWidth + spacing)}px) scale(0.85)`;
                card.style.opacity = '0.6';
                card.style.zIndex = 100 + position;
                card.style.width = (cardWidth * 0.85) + 'px';
            }
            
            card.style.visibility = 'visible';
            card.style.transition = 'all 0.4s ease';
        });
    } else {
        // ডেস্কটপের জন্য আগের কোড
        // আপনার আগের ডেস্কটপ কোড এখানে রাখুন
    }
    
    currentSlideEl.textContent = currentIndex + 1;
}

// মোবাইলের জন্য টাচ ইভেন্ট
let touchStartX = 0;
let isTouching = false;

coverflowWrapper.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    isTouching = true;
});

coverflowWrapper.addEventListener('touchmove', (e) => {
    if (!isTouching) return;
    e.preventDefault(); // স্ক্রল বন্ধ করা
});

coverflowWrapper.addEventListener('touchend', (e) => {
    if (!isTouching) return;
    isTouching = false;
    
    const touchEndX = e.changedTouches[0].clientX;
    const swipeDistance = touchEndX - touchStartX;
    const minSwipeDistance = 50;
    
    if (Math.abs(swipeDistance) > minSwipeDistance) {
        if (swipeDistance > 0) {
            // ডান দিকে সুইপ - পূর্বের কার্ড
            currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        } else {
            // বাম দিকে সুইপ - পরের কার্ড
            currentIndex = (currentIndex + 1) % totalCards;
        }
        updateCoverflow();
    }
});