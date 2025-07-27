// Portfolio Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-in-out'
    });

    // Copy to clipboard function
    window.copyToClipboard = function(text) {
        navigator.clipboard.writeText(text).then(function() {
            // Determine simple message based on content
            let message = '';
            if (text.includes('@')) {
                message = 'Email copied';
            } else if (text.includes('+91')) {
                message = 'Phone copied';
            } else if (text.includes('Karthikeya')) {
                message = 'Name copied';
            } else if (text.includes('Ongole')) {
                message = 'Location copied';
            } else {
                message = 'Copied';
            }
            
            // Show simple notification
            showNotification(message, 'success');
            
            // Add visual feedback
            const clickedElement = event.currentTarget;
            clickedElement.classList.add('copied');
            
            // Change icon temporarily
            const copyIcon = clickedElement.querySelector('.copy-icon');
            const originalClass = copyIcon.className;
            copyIcon.className = 'fas fa-check copy-icon';
            
            setTimeout(() => {
                clickedElement.classList.remove('copied');
                copyIcon.className = originalClass;
            }, 3000);
            
        }).catch(function(err) {
            showNotification('Failed to copy', 'error');
            console.error('Could not copy text: ', err);
        });
    };

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateNavbar() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(targetId);
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
            }
        });
    });

    // Update active navigation link based on scroll position
    function updateActiveNavLink(activeId = null) {
        const sections = document.querySelectorAll('section[id]');
        const navbarHeight = navbar.offsetHeight;
        
        if (activeId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === activeId) {
                    link.classList.add('active');
                }
            });
            return;
        }
        
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentSection = '#' + section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentSection) {
                link.classList.add('active');
            }
        });
    }

    // Scroll event listeners
    window.addEventListener('scroll', function() {
        updateNavbar();
        updateActiveNavLink();
        updateScrollToTop();
        animateProgressBars();
    });

    // Create and handle scroll to top button
    function createScrollToTopButton() {
        const scrollTopBtn = document.createElement('button');
        scrollTopBtn.className = 'scroll-top';
        scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(scrollTopBtn);
        
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        return scrollTopBtn;
    }

    const scrollTopBtn = createScrollToTopButton();

    function updateScrollToTop() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }

    // Animate skill progress bars (if needed)
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        progressBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
            
            if (isVisible && !bar.classList.contains('animated')) {
                const targetWidth = bar.getAttribute('data-width');
                bar.style.width = targetWidth;
                bar.classList.add('animated');
            }
        });
    }

    // Typing effect for hero section
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Initialize typing effect for job title
    const jobTitle = document.querySelector('.hero-content h2');
    if (jobTitle) {
        const originalText = jobTitle.textContent;
        setTimeout(() => {
            typeWriter(jobTitle, originalText, 100);
        }, 1000);
    }

    // Parallax effect for hero background
    function parallaxEffect() {
        const heroSection = document.querySelector('.hero-section');
        const heroBackground = document.querySelector('.hero-bg');
        
        if (heroBackground) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroBackground.style.transform = `translateY(${rate}px)`;
        }
    }

    window.addEventListener('scroll', parallaxEffect);

    // Contact form handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[placeholder="Your Name"]').value;
            const email = this.querySelector('input[placeholder="Your Email"]').value;
            const subject = this.querySelector('input[placeholder="Subject"]').value;
            const message = this.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Message sent successfully! I will get back to you soon.', 'success');
            this.reset();
        });
    }

    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove any existing notifications first
        const existingNotifications = document.querySelectorAll('.copy-notification');
        existingNotifications.forEach(notif => notif.remove());
        
        const notification = document.createElement('div');
        notification.className = `copy-notification alert alert-${type === 'error' ? 'danger' : 'success'} fade show`;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 9999;
            max-width: 350px;
            font-weight: 500;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            animation: slideInRight 0.3s ease-out;
        `;
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" onclick="this.parentElement.remove()"></button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 4 seconds (increased from 5)
        setTimeout(() => {
            if (notification && notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease-in';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 4000);
    }

    // Animate counters (if you want to add counters)
    function animateCounters() {
        const counters = document.querySelectorAll('[data-counter]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-counter'));
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                counter.textContent = Math.floor(current);
                
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                }
            }, 20);
        });
    }

    // Lazy loading for images
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }

    // Initialize lazy loading
    lazyLoadImages();

    // Add smooth reveal animation for elements
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.fade-in');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);

    // Add fade-in class to elements that should animate
    const animateElements = document.querySelectorAll('.skill-category, .project-card, .education-card, .highlight-item');
    animateElements.forEach(element => {
        element.classList.add('fade-in');
    });

    // Preloader (optional)
    function hidePreloader() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    }

    // Hide preloader when page is loaded
    window.addEventListener('load', hidePreloader);

    // Add interactive hover effects
    function addHoverEffects() {
        const cards = document.querySelectorAll('.project-card, .skill-category, .education-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Initialize hover effects
    addHoverEffects();

    // Handle navbar collapse on mobile
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        // Close navbar when clicking outside
        document.addEventListener('click', function(e) {
            if (!navbar.contains(e.target) && navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        });
    }

    // Initialize everything
    updateNavbar();
    updateActiveNavLink();
    revealOnScroll();

    // Console log for developers
    console.log('🚀 Portfolio website loaded successfully!');
    console.log('📧 Contact: kadamkarthikeyasaisandeep@gmail.com');
    console.log('📱 Phone: +91 85005 57142');
});

// Additional utility functions
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

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    updateNavbar();
    updateActiveNavLink();
    updateScrollToTop();
}, 10);

// Replace scroll listeners with optimized version
window.removeEventListener('scroll', updateNavbar);
window.removeEventListener('scroll', updateActiveNavLink);
window.addEventListener('scroll', optimizedScrollHandler);
