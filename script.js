// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js
    initParticles();

    // Initialize typewriter effect
    initTypewriter();

    // Handle navigation highlighting
    handleNavigation();

    // Handle scroll events
    handleScroll();

    // Add floating animation to profile picture
    animateProfilePicture();

    // Initialize mobile menu
    initMobileMenu();

    // Initialize smooth scrolling
    initSmoothScrolling();

    // Trigger initial reveal of elements
    setTimeout(revealElements, 100);

    // Add CSS variables for staggered animations
    addCssVariables();
});

// Initialize particles.js background with enhanced settings
function initParticles() {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 100,
                density: {
                    enable: true,
                    value_area: 1000
                }
            },
            color: {
                value: ['#00ffaa', '#0a84ff', '#ff3860']
            },
            shape: {
                type: ['circle', 'triangle', 'edge'],
                stroke: {
                    width: 0,
                    color: '#000000'
                },
                polygon: {
                    nb_sides: 5
                }
            },
            opacity: {
                value: 0.6,
                random: true,
                anim: {
                    enable: true,
                    speed: 1.5,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#0a84ff',
                opacity: 0.4,
                width: 1.2,
                shadow: {
                    enable: true,
                    color: "#00ffaa",
                    blur: 5
                }
            },
            move: {
                enable: true,
                speed: 1.5,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 180,
                    line_linked: {
                        opacity: 0.8
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 6
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });
}

// Typewriter effect for the hero section
function initTypewriter() {
    const typewriterText = document.getElementById('typewriter-text');
    const phrases = [
        'Ethical Hacker',
        'Penetration Tester',
        'Bug Bounty Hunter',
        'Cyber Forensics Expert',
        'Security Researcher'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            // Deleting text
            typewriterText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            // Typing text
            typewriterText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        // If word is complete
        if (!isDeleting && charIndex === currentPhrase.length) {
            // Pause at the end of typing
            isDeleting = true;
            typingSpeed = 1500;
        } else if (isDeleting && charIndex === 0) {
            // Move to next phrase
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    // Start the typewriter effect
    setTimeout(type, 1000);
}

// Handle navigation highlighting based on scroll position
function handleNavigation() {
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            // Adjust scroll offset based on screen size
            let scrollOffset = 80;

            // Use smaller offset for mobile devices to prevent content from being hidden
            if (window.innerWidth <= 768) {
                scrollOffset = 120; // Larger offset for mobile
            }

            window.scrollTo({
                top: targetSection.offsetTop - scrollOffset,
                behavior: 'smooth'
            });

            // Update active link
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Handle scroll events for various effects
function handleScroll() {
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', function() {
        // Header scroll effect
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Update active navigation link based on scroll position
        let current = '';

        // Adjust offset based on screen size
        let scrollOffset = 150;
        if (window.innerWidth <= 768) {
            scrollOffset = 200; // Larger offset for mobile
        }

        sections.forEach(section => {
            const sectionTop = section.offsetTop - scrollOffset;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = '#' + section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current) {
                link.classList.add('active');
            }
        });

        // Reveal elements on scroll
        revealElements();
    });
}

// Reveal elements as they come into view with enhanced animations
function revealElements() {
    // First, make sure all content is visible (fix for disappearing content)
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
    });

    // Only apply scroll animations to sections with the animate-on-scroll class
    const animatedSections = document.querySelectorAll('section.animate-on-scroll');

    animatedSections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight - 100) {
            section.classList.add('visible');
        }
    });

    // Reveal timeline items with staggered animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (itemTop < windowHeight - 50) {
            item.style.setProperty('--item-index', index);
            item.classList.add('revealed');

            // Add a slight delay for the content to appear after the dot
            const content = item.querySelector('.timeline-content');
            if (content) {
                setTimeout(() => {
                    content.classList.add('revealed');
                }, 200 + (index * 100));
            }
        }
    });

    // Reveal project cards with staggered animation
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (cardTop < windowHeight - 50) {
            card.style.setProperty('--card-index', index);
        }
    });

    // Reveal skill items with staggered animation
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (itemTop < windowHeight - 50) {
            item.style.setProperty('--skill-index', index);
        }
    });

    // Reveal contact items with staggered animation
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (itemTop < windowHeight - 50) {
            item.style.setProperty('--contact-index', index);
        }
    });
}

// Form validation functions removed as they are no longer needed

// Add glitch effect on hover for certain elements
document.addEventListener('mouseover', function(e) {
    if (e.target.classList.contains('glitch')) {
        e.target.classList.add('glitching');
    }
});

document.addEventListener('mouseout', function(e) {
    if (e.target.classList.contains('glitch')) {
        e.target.classList.remove('glitching');
    }
});

// Add custom cursor effect (optional)
function addCustomCursor() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
}

// Uncomment to enable custom cursor
// addCustomCursor();

// Animate profile picture with enhanced floating effect and interactive elements
function animateProfilePicture() {
    const profileContainer = document.querySelector('.profile-container');
    const profilePic = document.querySelector('.profile-pic');
    const cyberCircle = document.querySelector('.cyber-circle');

    if (profileContainer) {
        profileContainer.style.animation = 'float 8s ease-in-out infinite';
    }

    // Add interactive glow effect on mouse move
    const heroSection = document.querySelector('.hero');
    const cyberGlow = document.querySelector('.cyber-glow');
    const heroText = document.querySelector('.hero-text h1');

    if (heroSection && cyberGlow) {
        heroSection.addEventListener('mousemove', function(e) {
            // Calculate mouse position relative to the hero section
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate the center of the hero section
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate the distance from the mouse to the center (normalized)
            const distX = (x - centerX) / centerX;
            const distY = (y - centerY) / centerY;

            // Apply enhanced movement to the glow based on mouse position
            cyberGlow.style.transform = `translate(${distX * 30}px, ${distY * 30}px)`;

            // Apply subtle rotation to the cyber circle
            if (cyberCircle) {
                cyberCircle.style.transform = `rotate(${distX * 5}deg) scale(${1 + Math.abs(distX) * 0.05})`;
            }

            // Apply subtle movement to the profile picture
            if (profilePic) {
                profilePic.style.transform = `translate(${distX * 10}px, ${distY * 10}px) scale(${1 + Math.abs(distX) * 0.03})`;
            }

            // Add subtle parallax effect to the hero text
            if (heroText) {
                heroText.style.transform = `translate(${distX * -15}px, ${distY * -10}px)`;

                // Trigger glitch effect when mouse moves quickly
                const speed = Math.sqrt(Math.pow(e.movementX, 2) + Math.pow(e.movementY, 2));
                if (speed > 20) {
                    heroText.classList.add('glitching');
                    setTimeout(() => {
                        heroText.classList.remove('glitching');
                    }, 300);
                }
            }
        });

        // Reset transforms when mouse leaves the hero section
        heroSection.addEventListener('mouseleave', function() {
            cyberGlow.style.transform = 'translate(0, 0)';
            if (cyberCircle) cyberCircle.style.transform = '';
            if (profilePic) profilePic.style.transform = '';
            if (heroText) heroText.style.transform = '';
        });
    }

    // Add scroll-based parallax effect
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;

        if (profileContainer && scrollY < window.innerHeight) {
            profileContainer.style.transform = `translateY(${scrollY * 0.2}px)`;
        }

        if (heroText && scrollY < window.innerHeight) {
            heroText.style.transform = `translateY(${scrollY * 0.1}px)`;
        }
    });
}

// Initialize mobile menu functionality
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('#nav-menu li a');

    if (mobileMenuToggle && navMenu) {
        // Toggle menu on button click
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');

            // Change icon based on menu state
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');

                // Reset icon
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');

                // Reset icon
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Add touch-friendly enhancements for mobile
        if ('ontouchstart' in window) {
            // Make buttons and links more touch-friendly
            const allButtons = document.querySelectorAll('.btn, .hero-social-link, .social-link, .project-link');

            allButtons.forEach(button => {
                button.addEventListener('touchstart', function() {
                    this.classList.add('touch-active');
                });

                button.addEventListener('touchend', function() {
                    this.classList.remove('touch-active');
                });
            });

            // Disable hover effects that might cause issues on touch devices
            document.body.classList.add('touch-device');
        }
    }
}

// Initialize smooth scrolling for a better user experience
function initSmoothScrolling() {
    // Check if the browser supports smooth scrolling natively
    if ('scrollBehavior' in document.documentElement.style) {
        return; // Browser already supports smooth scrolling
    }

    // For browsers that don't support smooth scrolling natively
    document.addEventListener('wheel', function(e) {
        if (e.ctrlKey) return; // Don't interfere with zoom

        e.preventDefault();

        const delta = e.deltaY;
        const currentScroll = window.pageYOffset;

        // Smooth scroll with custom easing
        window.scrollTo({
            top: currentScroll + delta,
            behavior: 'smooth'
        });
    }, { passive: false });

    // Smooth scroll for keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Space, Page Down, Page Up, End, Home, Arrow Down, Arrow Up
        const keysMap = {
            'Space': ' ',
            'PageDown': 'PageDown',
            'PageUp': 'PageUp',
            'End': 'End',
            'Home': 'Home',
            'ArrowUp': 'ArrowUp',
            'ArrowDown': 'ArrowDown'
        };

        if (Object.values(keysMap).includes(e.key)) {
            e.preventDefault();

            let scrollAmount = 0;
            const currentScroll = window.pageYOffset;

            switch (e.key) {
                case ' ': // Space
                case 'PageDown':
                    scrollAmount = window.innerHeight * 0.9;
                    break;
                case 'PageUp':
                    scrollAmount = -window.innerHeight * 0.9;
                    break;
                case 'End':
                    scrollAmount = document.body.scrollHeight - currentScroll;
                    break;
                case 'Home':
                    scrollAmount = -currentScroll;
                    break;
                case 'ArrowUp':
                    scrollAmount = -100;
                    break;
                case 'ArrowDown':
                    scrollAmount = 100;
                    break;
            }

            window.scrollTo({
                top: currentScroll + scrollAmount,
                behavior: 'smooth'
            });
        }
    }, { passive: false });
}

// Add CSS variables for staggered animations and ensure content visibility
function addCssVariables() {
    // Make sure all sections are visible by default
    document.querySelectorAll('section').forEach(section => {
        // Force sections to be visible
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
    });

    // Add index variables to project cards for staggered animations
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.setProperty('--card-index', index);
        // Make sure cards are visible
        card.style.opacity = '1';
    });

    // Add index variables to skill items for staggered animations
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.style.setProperty('--skill-index', index);
        // Make sure skill items are visible
        item.style.opacity = '1';
    });

    // Add index variables to contact items for staggered animations
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.style.setProperty('--contact-index', index);
        // Make sure contact items are visible
        item.style.opacity = '1';
    });

    // Add index variables to timeline items for staggered animations
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.setProperty('--item-index', index);
        // Make sure timeline items are visible
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';

        // Also make timeline content visible
        const content = item.querySelector('.timeline-content');
        if (content) {
            content.style.opacity = '1';
            content.style.transform = 'translateX(0)';
        }
    });
}
