/* ========================================
   LACEY DOES - STUNNING INTERACTIONS
   Smooth • Editorial • Intentional
======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // === MOBILE MENU ===
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const menuSpans = menuToggle?.querySelectorAll('span');

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('active');

            // Animate hamburger to X
            if (mobileNav.classList.contains('active')) {
                menuSpans[0].style.transform = 'translateY(9px) rotate(45deg)';
                menuSpans[1].style.opacity = '0';
                menuSpans[2].style.transform = 'translateY(-9px) rotate(-45deg)';
            } else {
                menuSpans[0].style.transform = 'none';
                menuSpans[1].style.opacity = '1';
                menuSpans[2].style.transform = 'none';
            }
        });

        // Close mobile nav on link click
        document.querySelectorAll('.mobile-nav a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                menuSpans[0].style.transform = 'none';
                menuSpans[1].style.opacity = '1';
                menuSpans[2].style.transform = 'none';
            });
        });
    }

    // === SMOOTH SCROLL ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // === HEADER SCROLL EFFECT ===
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 60) {
            header.style.background = 'rgba(253, 248, 243, 0.98)';
            header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.08)';
        } else {
            header.style.background = 'rgba(253, 248, 243, 0.92)';
            header.style.boxShadow = 'none';
        }
    });

    // === INTERSECTION OBSERVER FOR REVEAL ANIMATIONS ===
    const observerOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate on scroll
    const revealElements = document.querySelectorAll(`
        .about-img-wrap,
        .about-text,
        .mural-item,
        .featured-item,
        .service-card,
        .now-content,
        .now-img-wrap,
        .shop-text,
        .shop-img-frame,
        .cta-card,
        .testimonial
    `);

    revealElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = `opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)`;
        el.style.transitionDelay = `${(index % 4) * 0.1}s`;
        revealObserver.observe(el);
    });

    // Add revealed class styles
    const style = document.createElement('style');
    style.textContent = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // === PARALLAX FOR BACKGROUND SHAPES ===
    const shapes = document.querySelectorAll('.shape');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                shapes.forEach((shape, index) => {
                    const speed = 0.08 + (index * 0.04);
                    shape.style.transform = `translateY(${scrolled * speed}px)`;
                });
                ticking = false;
            });
            ticking = true;
        }
    });

    // === SUBTLE 3D TILT ON HERO IMAGE ===
    const heroFrame = document.querySelector('.hero-frame');
    const heroVisual = document.querySelector('.hero-visual');

    if (heroVisual && heroFrame && window.innerWidth > 992) {
        heroVisual.addEventListener('mousemove', (e) => {
            const rect = heroVisual.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            heroFrame.style.transition = 'transform 0.15s ease-out';
            heroFrame.style.transform = `
                perspective(1200px)
                rotateY(${x * 6}deg)
                rotateX(${-y * 6}deg)
            `;
        });

        heroVisual.addEventListener('mouseleave', () => {
            heroFrame.style.transition = 'transform 0.5s ease';
            heroFrame.style.transform = 'none';
        });
    }

    // === MURAL CARD HOVER EFFECTS ===
    const muralFrames = document.querySelectorAll('.mural-frame');

    muralFrames.forEach(frame => {
        if (window.innerWidth > 768) {
            frame.addEventListener('mouseenter', function () {
                this.style.zIndex = '10';
            });

            frame.addEventListener('mouseleave', function () {
                this.style.zIndex = '1';
            });
        }
    });

    // === SERVICE CARDS STAGGER DELAY ===
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.08}s`;
    });

    // === FLOATING TAGS RANDOM TIMING ===
    const floatingTags = document.querySelectorAll('.floating-tag');
    floatingTags.forEach((tag, i) => {
        tag.style.animationDuration = `${3.5 + (i * 0.5)}s`;
        tag.style.animationDelay = `${i * 0.4}s`;
    });

    console.log('🎨 Lacey Does Homepage - Loaded with stunning interactions!');
});

// === PAGE LOAD TRANSITION ===
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease';

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            document.body.style.opacity = '1';
        });
    });
});
