// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Setup typed.js effect
    setupTypedEffect();
    
    // Setup mobile navigation
    setupMobileNav();
    
    // Add scroll effects
    setupScrollEffects();
    
    // Setup form submission
    setupContactForm();
    
    // Reveal animations
    setupAnimations();
    
    // Add animation classes to elements
    addAnimationClasses();
    
    // Setup slideshow
    setupSlideshow();
});

// Setup typed.js effect
function setupTypedEffect() {
    try {
        const typed = new Typed('#typed-output', {
            strings: [
                'Software Developer',
                'AI Trainer',
                'Mentor',
                'Problem Solver',
                'Tech Enthusiast'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            startDelay: 500,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    } catch (error) {
        console.warn('Typed.js could not be initialized.');
        // Fallback
        document.querySelector('#typed-output').textContent = 'Software Developer | AI Trainer | Mentor';
    }
}

// Mobile navigation setup
function setupMobileNav() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    
    if (burger && nav) {
        burger.addEventListener('click', () => {
            // Toggle navigation
            nav.classList.toggle('nav-active');
            
            // Burger animation
            burger.classList.toggle('toggle');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-links li');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
            });
        });
    }
}

// Scroll effects
function setupScrollEffects() {
    // Navigation background change on scroll
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }
        
        // Reveal animations for sections
        revealElements();
        
        // Handle timeline items visibility
        handleTimelineAnimation();
        
        // Handle section animations
        animateSectionsOnScroll();
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// Contact form setup
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                from_name: this.name.value,
                from_email: this.email.value,
                subject: this.subject.value,
                message: this.message.value
            };

            // Send email using EmailJS
            emailjs.send('service_o9tq2hn', 'template_ody274a', formData)
                .then(function() {
                    // Show success message
                    alert('Message sent successfully! I will get back to you soon.');
                    contactForm.reset();
                }, function(error) {
                    // Show error message
                    alert('Sorry, there was an error sending your message. Please try again later.');
                    console.error('Error:', error);
                });
        });
    }
}

// Animation setup
function setupAnimations() {
    // Initial reveal of visible elements
    setTimeout(() => {
        revealElements();
        handleTimelineAnimation();
        animateSectionsOnScroll();
    }, 100);
    
    // Add animation to terminal lines
    const terminalLines = document.querySelectorAll('.terminal-line');
    terminalLines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.transform = 'translateY(10px)';
        line.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        line.style.transitionDelay = `${index * 0.2}s`;
        
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
        }, 500 + (index * 200));
    });
    
    // Contact items animation
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        item.style.transitionDelay = `${index * 0.1}s`;
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 1000 + (index * 100));
    });
}

// Handle timeline animation
function handleTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        const position = item.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // If timeline item is in viewport
        if (position.top < viewportHeight * 0.85) {
            item.classList.add('visible');
        } else {
            item.classList.remove('visible');
        }
    });
}

// Add animation classes to elements based on their position
function addAnimationClasses() {
    // Add animation classes to section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.classList.add('animate-scale-in');
    });
    
    // Add left/right animation to alternating project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        if (index % 2 === 0) {
            card.classList.add('animate-fade-in-left');
        } else {
            card.classList.add('animate-fade-in-right');
        }
        card.classList.add(`delay-${(index % 5 + 1) * 100}`);
    });
    
    // Add fade animations to certificate cards
    const certificateCards = document.querySelectorAll('.certificate-card');
    certificateCards.forEach((card, index) => {
        card.classList.add('animate-fade-in');
        card.classList.add(`delay-${(index % 5 + 1) * 100}`);
    });
    
    // Add animations to skills columns
    const skillsColumns = document.querySelectorAll('.skills-column');
    skillsColumns.forEach((column, index) => {
        if (index === 0) {
            column.classList.add('animate-fade-in-left');
        } else {
            column.classList.add('animate-fade-in-right');
        }
        column.classList.add(`delay-${(index + 1) * 100}`);
    });
}

// Animate sections when they come into view
function animateSectionsOnScroll() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.8) {
            section.classList.add('section-visible');
            
            // Animate section titles
            const title = section.querySelector('.section-title');
            if (title) {
                title.classList.add('title-visible');
            }
            
            // Animate section content with staggered effect
            const animatedElements = section.querySelectorAll('.project-card, .certificate-card, .skills-column, .contact-item');
            animatedElements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, 100 + (index * 100));
            });
        }
    });
}

// Reveal elements as they come into view
function revealElements() {
    const revealElements = document.querySelectorAll(
        '.project-card, .certificate-card, .skills-column'
    );
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.85) {
            element.classList.add('animate-fade-in');
        }
    });
}

// Setup automatic slideshow
function setupSlideshow() {
    let slideIndex = 1;
    let slideTimer;
    
    // Initial display
    showSlide(slideIndex);
    
    // Auto advance slides
    resetTimer();
    
    // Get navigation elements
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    
    // Add event listeners to navigation
    if (prevButton) prevButton.addEventListener('click', () => {
        plusSlides(-1);
    });
    
    if (nextButton) nextButton.addEventListener('click', () => {
        plusSlides(1);
    });
    
    // Navigation functions
    function plusSlides(n) {
        clearTimeout(slideTimer);
        showSlide(slideIndex += n);
        resetTimer();
    }
    
    function showSlide(n) {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        
        // Handle edge cases
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        
        // Hide all slides
        for (i = 0; i < slides.length; i++) {
            slides[i].classList.remove("active");
        }
        
        // Show current slide
        slides[slideIndex-1].classList.add("active");
    }
    
    function resetTimer() {
        clearTimeout(slideTimer);
        slideTimer = setTimeout(() => {
            plusSlides(1);
        }, 3000); // Change slides every 3 seconds
    }
}

// Gallery slideshow functionality
let slideIndex = 1;
const images = [
    "photos/PHOTO-2024-12-09-11-15-25.JPG",
    "photos/PHOTO-2024-12-09-11-15-25 2.JPG",
    "photos/PHOTO-2024-12-09-11-14-16.JPG",
    "photos/PHOTO-2024-12-09-11-14-16 2.JPG",
    "photos/PHOTO-2024-12-09-11-14-16 3.JPG",
    "photos/PHOTO-2024-12-09-11-13-11.JPG",
    "photos/PHOTO-2024-12-09-11-12-39.JPG",
    "photos/PHOTO-2024-12-09-11-12-13.JPG",
    "photos/f8600d65-5199-4d9a-b011-e112801e696b.JPG",
    "photos/c7b561f5-62d7-40bf-b653-3a881af98891.JPG",
    "photos/1c7bfdfd-fd36-4341-aef4-93d1da799293.JPG",
    "photos/807a6249-84bf-4ea2-b8aa-a2248e0145c1.JPG"
];

function showSlide(n) {
    const img = document.querySelector('.gallery-image img');
    
    if (n > images.length) slideIndex = 1;
    if (n < 1) slideIndex = images.length;
    
    img.src = images[slideIndex - 1];
    
    // Reset the auto-advance timer
    clearTimeout(slideTimer);
    slideTimer = setTimeout(() => plusSlides(1), 5000);
}

function plusSlides(n) {
    showSlide(slideIndex += n);
}

let slideTimer;

// Initialize the slideshow
document.addEventListener('DOMContentLoaded', () => {
    showSlide(slideIndex);
});
