'use strict';

// ===== HEADER SCROLL =====
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}, { passive: true });

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('active');
    nav.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
});

nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// ===== HERO IMAGE KEN BURNS =====
const heroImg = document.getElementById('hero-img');
if (heroImg) {
    heroImg.addEventListener('load', () => {
        heroImg.classList.add('loaded');
    });
    if (heroImg.complete) {
        heroImg.classList.add('loaded');
    }
}

// ===== FADE-IN ON SCROLL =====
const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            const delay = entry.target.closest('.course-list, .concept-grid, .seat-content, .info-grid')
                ? Array.from(entry.target.parentElement.children).indexOf(entry.target) * 80
                : 0;
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay);
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
});

fadeEls.forEach(el => observer.observe(el));

// ===== FOOD SLIDESHOW =====
const foodSlides = document.querySelectorAll('.food-slide');
const foodDots = document.querySelectorAll('.food-slideshow-dot');
let foodSlideIndex = 0;
let foodSlideTimer;

const showFoodSlide = (index) => {
    if (!foodSlides.length) return;
    foodSlideIndex = (index + foodSlides.length) % foodSlides.length;

    foodSlides.forEach((slide, i) => {
        slide.classList.toggle('is-active', i === foodSlideIndex);
    });

    foodDots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === foodSlideIndex);
    });
};

const startFoodSlideshow = () => {
    if (foodSlides.length <= 1) return;
    window.clearInterval(foodSlideTimer);
    foodSlideTimer = window.setInterval(() => {
        showFoodSlide(foodSlideIndex + 1);
    }, 4000);
};

foodDots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        showFoodSlide(i);
        startFoodSlideshow();
    });
});

startFoodSlideshow();

// ===== SMOOTH SCROLL OFFSET =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const offset = header.offsetHeight + 20;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});
