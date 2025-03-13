// Sticky Header
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

// Mobile Menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.innerHTML = navMenu.classList.contains('active') ?
        '<i class="fas fa-times"></i>' :
        '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Countdown Timer
function updateCountdown() {
    const eventDate = new Date('July 15, 2025 09:00:00').getTime();
    const now = new Date().getTime();
    const timeLeft = eventDate - now;

    if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById('countdown-days').textContent = days.toString().padStart(2, '0');
        document.getElementById('countdown-hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('countdown-minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('countdown-seconds').textContent = seconds.toString().padStart(2, '0');
    } else {
        document.getElementById('countdown').innerHTML = '<p>Acara telah dimulai!</p>';
    }
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Agenda Tabs
const agendaTabs = document.querySelectorAll('.agenda-tab');
const agendaDays = document.querySelectorAll('.agenda-day');

agendaTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        agendaTabs.forEach(tab => tab.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');

        // Hide all agenda days
        agendaDays.forEach(day => day.classList.remove('active'));
        // Show selected day
        const dayId = tab.getAttribute('data-day');
        document.getElementById(dayId).classList.add('active');
    });
});

// Testimonial Slider
const track = document.getElementById('testimonials-track');
const dots = document.querySelectorAll('.testimonial-dot');
const prevBtn = document.getElementById('testimonial-prev');
const nextBtn = document.getElementById('testimonial-next');
let currentIndex = 0;
const testimonialCount = document.querySelectorAll('.testimonial').length;

function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % testimonialCount;
    updateSlider();
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + testimonialCount) % testimonialCount;
    updateSlider();
});

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        currentIndex = parseInt(dot.getAttribute('data-index'));
        updateSlider();
    });
});

// Auto slide testimonials every 5 seconds
setInterval(() => {
    currentIndex = (currentIndex + 1) % testimonialCount;
    updateSlider();
}, 5000);

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isActive = question.classList.contains('active');

        // Close all other answers
        faqQuestions.forEach(q => {
            if (q !== question) {
                q.classList.remove('active');
                q.nextElementSibling.style.maxHeight = null;
            }
        });

        // Toggle current answer
        if (isActive) {
            question.classList.remove('active');
            answer.style.maxHeight = null;
        } else {
            question.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    });
});

// Form Validation
const form = document.getElementById('registration-form');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    let isValid = true;

    // Validate name
    const name = document.getElementById('name');
    if (!name.value.trim()) {
        showError(name, 'name-error', 'Nama lengkap harus diisi');
        isValid = false;
    } else {
        hideError(name, 'name-error');
    }

    // Validate email
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value)) {
        showError(email, 'email-error', 'Email tidak valid');
        isValid = false;
    } else {
        hideError(email, 'email-error');
    }

    // Validate phone
    const phone = document.getElementById('phone');
    const phoneRegex = /^[0-9+\-\s]{10,15}$/;
    if (!phone.value.trim() || !phoneRegex.test(phone.value)) {
        showError(phone, 'phone-error', 'Nomor telepon tidak valid');
        isValid = false;
    } else {
        hideError(phone, 'phone-error');
    }

    // Validate company
    const company = document.getElementById('company');
    if (!company.value.trim()) {
        showError(company, 'company-error', 'Perusahaan/Institusi harus diisi');
        isValid = false;
    } else {
        hideError(company, 'company-error');
    }

    // Validate position
    const position = document.getElementById('position');
    if (!position.value.trim()) {
        showError(position, 'position-error', 'Jabatan harus diisi');
        isValid = false;
    } else {
        hideError(position, 'position-error');
    }

    // Validate ticket
    const ticket = document.getElementById('ticket');
    if (!ticket.value) {
        showError(ticket, 'ticket-error', 'Pilih jenis tiket');
        isValid = false;
    } else {
        hideError(ticket, 'ticket-error');

        // If group ticket, validate participants
        if (ticket.value === 'group') {
            const participants = document.getElementById('participants');
            if (!participants.value || participants.value < 3) {
                showError(participants, 'participants-error', 'Minimal 3 peserta untuk tiket group');
                isValid = false;
            } else {
                hideError(participants, 'participants-error');
            }
        }
    }

    if (isValid) {
        // Show success message
        alert('Terima kasih telah mendaftar! Tim kami akan menghubungi Anda segera untuk konfirmasi dan detail pembayaran.');
        form.reset();
    }
});

function showError(input, errorId, message) {
    input.classList.add('error');
    const errorElement = document.getElementById(errorId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function hideError(input, errorId) {
    input.classList.remove('error');
    document.getElementById(errorId).style.display = 'none';
}

// Show/hide participants field based on ticket selection
const ticketSelect = document.getElementById('ticket');
const participantsGroup = document.getElementById('participants').parentNode;

participantsGroup.style.display = 'none';

ticketSelect.addEventListener('change', function() {
    if (this.value === 'group') {
        participantsGroup.style.display = 'block';
    } else {
        participantsGroup.style.display = 'none';
    }
});

// Animate on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.about-text, .speaker-card, .agenda-session, .pricing-card, .register-text, .register-form, .faq-item');

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementPosition < windowHeight - 100) {
            element.classList.add('animate');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Ticket toggle on mobile for Early Bird deadline
const earlyBirdDeadline = new Date('June 15, 2025').getTime();
const now = new Date().getTime();

if (now > earlyBirdDeadline) {
    document.querySelectorAll('.pricing-card').forEach(card => {
        if (card.querySelector('h3').textContent === 'Early Bird') {
            card.style.display = 'none';
        }
    });
}