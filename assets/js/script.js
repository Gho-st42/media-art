// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handling
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Simple form validation
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ff4757';
            } else {
                input.style.borderColor = '';
            }
        });

        if (isValid) {
            // Simulate form submission
            const button = form.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            button.textContent = 'Sending...';
            button.disabled = true;

            setTimeout(() => {
                button.textContent = 'Message Sent!';
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    form.reset();
                }, 2000);
            }, 1000);
        }
    });
});

// Wait for DOM to be loaded before adding event listeners
document.addEventListener('DOMContentLoaded', function() {
    const seeMoreButtons = document.querySelectorAll('.see-more');
    const serviceModal = document.getElementById('service-modal');
    const closeModalBtn = document.querySelector('.close-service-modal');

    seeMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const serviceType = this.getAttribute('data-service');
            const data = serviceData[serviceType];

            if (data && serviceModal) {
                // Update modal content
                const modalTitle = document.getElementById('modal-service-title');
                const modalSubtitle = document.getElementById('modal-service-subtitle');
                const modalIcon = document.getElementById('modal-service-icon');
                const modalPrice = document.getElementById('modal-service-price');

                if (modalTitle) modalTitle.textContent = data.title;
                if (modalSubtitle) modalSubtitle.textContent = data.subtitle;
                if (modalIcon) modalIcon.className = data.icon;
                if (modalPrice) modalPrice.textContent = data.price;

                // Update features list
                const featuresList = document.getElementById('modal-service-features');
                if (featuresList) {
                    featuresList.innerHTML = '';
                    data.features.forEach(feature => {
                        const li = document.createElement('li');
                        li.textContent = feature;
                        featuresList.appendChild(li);
                    });
                }

                // Update details list
                const detailsList = document.getElementById('modal-service-details');
                if (detailsList) {
                    detailsList.innerHTML = '';
                    data.details.forEach(detail => {
                        const li = document.createElement('li');
                        li.textContent = detail;
                        detailsList.appendChild(li);
                    });
                }

                // Show modal
                serviceModal.classList.add('active');
            }
        });
    });

    // Close modal functionality
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            if (serviceModal) {
                serviceModal.classList.remove('active');
            }
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (serviceModal && e.target === serviceModal) {
            serviceModal.classList.remove('active');
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .team-member, .value-card, .glass-card').forEach(el => {
    observer.observe(el);
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(37, 35, 33, 0.98)';
    } else {
        navbar.style.background = 'rgba(37, 35, 33, 0.95)';
    }
});

// Job application form handling (for careers page)
const jobButtons = document.querySelectorAll('.apply-btn');
jobButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const jobTitle = this.closest('.job-card').querySelector('h3').textContent;
        const positionField = document.querySelector('#position');
        if (positionField) {
            positionField.value = jobTitle;
            positionField.style.borderColor = 'var(--accent)';
        }

        // Add visual feedback
        const originalText = this.textContent;
        this.textContent = 'Application Form Selected ✓';
        this.style.background = 'var(--accent)';

        setTimeout(() => {
            this.textContent = originalText;
            this.style.background = '';
        }, 2000);

        // Scroll to contact form with offset for navbar
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            const yOffset = -100;
            const y = contactForm.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({top: y, behavior: 'smooth'});
        }
    });
});

// Add job card hover effects
const jobCards = document.querySelectorAll('.job-card');
jobCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderColor = 'var(--accent)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.borderColor = 'var(--glass-border)';
    });
});

// Productions modal handling (for productions page)
const productionCards = document.querySelectorAll('.production-card');
const productionData = {
    'test': {
        title: 'Test Podcast',
        type: 'Podcast Series',
        description: 'Test podcast description.',
        details: 'Test podcast details.'
    },

};

productionCards.forEach(card => {
    card.addEventListener('click', function() {
        const modal = document.querySelector('#production-modal');
        const productionId = this.getAttribute('data-production');
        const data = productionData[productionId];

        if (modal && data) {
            modal.querySelector('.modal-title').textContent = data.title;
            modal.querySelector('.modal-type').textContent = data.type;
            modal.querySelector('.modal-description').textContent = data.description;
            modal.querySelector('.modal-details').innerHTML = `<p>${data.details}</p>`;
            modal.classList.add('active');
        }
    });
});

// Close modal
const closeModal = document.querySelector('.close-modal');
if (closeModal) {
    closeModal.addEventListener('click', function() {
        document.querySelector('.production-modal').classList.remove('active');
    });
}

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const modal = document.querySelector('.production-modal');
    if (modal && e.target === modal) {
        modal.classList.remove('active');
    }
});

// Add CSS classes for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);