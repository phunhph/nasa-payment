/* ========================================
   NASA Payment — main.js
   ======================================== */

// --- Smooth scroll utility (easeOutCubic) ---
function smoothScrollTo(targetY, duration) {
    const start = window.scrollY || window.pageYOffset;
    const distance = targetY - start;
    if (Math.abs(distance) < 2) return;
    const dur = duration || 800;
    const startTime = performance.now();

    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / dur, 1);
        const ease = easeOutCubic(progress);
        window.scrollTo(0, start + distance * ease);
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}

// --- Mobile menu toggle ---
const mobileToggle = document.getElementById('mobileToggle');
const menu = document.getElementById('menu');
const device = document.querySelector('.device');

if (mobileToggle && menu) {
    mobileToggle.addEventListener('click', () => {
        menu.classList.toggle('active');
    });
}

// --- Smooth scroll for ALL anchor links ---
document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (!targetId || targetId === '#') return;

        const targetEl = document.querySelector(targetId);
        if (!targetEl) return;

        e.preventDefault();

        // Close mobile menu if open
        if (menu) menu.classList.remove('active');

        // Calculate target position (offset for sticky header)
        const headerHeight = document.querySelector('.header')?.offsetHeight || 76;
        const targetTop = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight;

        smoothScrollTo(targetTop, 900);

        // Update URL hash without jumping
        history.pushState(null, null, targetId);
    });
});

// --- Stagger animation index ---
document.querySelectorAll('.stagger').forEach((group) => {
    Array.from(group.children).forEach((item, index) => {
        item.style.setProperty('--i', index);
    });
});

// --- Scroll-reveal (IntersectionObserver) ---
const revealItems = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .zoom-reveal, .stagger'
);

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.14,
    rootMargin: '0px 0px -70px 0px'
});

revealItems.forEach((item) => observer.observe(item));

// --- Active nav link highlight on scroll ---
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.menu a[href^="#"]');

function highlightNav() {
    const scrollPos = window.scrollY + 120;

    sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach((link) => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNav, { passive: true });
highlightNav();

// --- Parallax float for hero device ---
window.addEventListener('scroll', () => {
    if (!device) return;
    const scrolled = window.scrollY;
    const offset = Math.min(scrolled * 0.035, 18);
    device.style.transform = `rotate(-1deg) translateY(${offset}px)`;
}, { passive: true });

// --- Back to Top button ---
const scrollTopBtn = document.getElementById('scrollTopBtn');

if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        smoothScrollTo(0, 900);
    });
}