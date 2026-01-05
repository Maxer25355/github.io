// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Preloader handling
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        // Hide preloader after page load
        window.addEventListener('load', function() {
            setTimeout(() => {
                preloader.classList.add('hidden');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 1000);
        });
    }
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            this.innerHTML = navList.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : 
                '<i class="fas fa-bars"></i>';
        });
    }
    
    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
            }
        });
    }
    
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements with hidden class
    document.querySelectorAll('.hidden').forEach(el => {
        observer.observe(el);
    });
    
    // Add hidden class to elements that should animate on scroll
    const animateElements = document.querySelectorAll('h2, h3, .about-features, .services-grid, .articles-grid, .contact-info, .contact-form');
    animateElements.forEach(el => {
        el.classList.add('hidden');
    });
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form elements
            const nameInput = this.querySelector('#name');
            const emailInput = this.querySelector('#email');
            const messageInput = this.querySelector('#message');
            const submitBtn = this.querySelector('button[type="submit"]');
            
            // Validation
            let isValid = true;
            const errors = [];
            
            if (!nameInput.value.trim()) {
                isValid = false;
                errors.push('Пожалуйста, введите ваше имя.');
                nameInput.style.borderColor = '#d32f2f';
            } else {
                nameInput.style.borderColor = '';
            }
            
            if (!emailInput.value.trim() || !emailInput.checkValidity()) {
                isValid = false;
                errors.push('Пожалуйста, введите корректный email адрес.');
                emailInput.style.borderColor = '#d32f2f';
            } else {
                emailInput.style.borderColor = '';
            }
            
            if (!messageInput.value.trim()) {
                isValid = false;
                errors.push('Пожалуйста, введите ваше сообщение.');
                messageInput.style.borderColor = '#d32f2f';
            } else {
                messageInput.style.borderColor = '';
            }
            
            if (isValid) {
                // Simulate form submission
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Отправляется...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.textContent = 'Сообщение отправлено!';
                    submitBtn.style.background = '#28a745';
                    
                    // Reset form
                    setTimeout(() => {
                        this.reset();
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                    }, 2000);
                }, 1000);
            } else {
                alert(errors.join('\n'));
            }
        });
        
        // Real-time validation
        [contactForm.querySelector('#name'), contactForm.querySelector('#email'), contactForm.querySelector('#message')].forEach(input => {
            input.addEventListener('blur', function() {
                if (!this.value.trim()) {
                    this.style.borderColor = '#d32f2f';
                } else {
                    this.style.borderColor = '';
                }
            });
        });
    }
    
    // Floating elements animation enhancement
    const floatingCircles = document.querySelectorAll('.floating-circle');
    floatingCircles.forEach((circle, index) => {
        circle.style.animationDelay = `${index * 2}s`;
    });
    
    // Logo animation enhancement
    const logoIcon = document.querySelector('.logo-icon');
    if (logoIcon) {
        logoIcon.addEventListener('mouseenter', () => {
            logoIcon.style.transform = 'scale(1.2) rotate(15deg)';
        });
        
        logoIcon.addEventListener('mouseleave', () => {
            logoIcon.style.transform = 'scale(1) rotate(0deg)';
        });
    }
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Dark mode toggle (optional enhancement)
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Add a dark mode toggle button if needed
    // This is commented out but can be easily enabled
    /*
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: var(--shadow);
        z-index: 1000;
    `;
    
    document.body.appendChild(darkModeToggle);
    
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
    */
});

// Utility function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Performance optimization: Debounce scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = () => {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Enhanced scroll performance
window.addEventListener('scroll', debounce(() => {
    // Your scroll logic here
}, 10));