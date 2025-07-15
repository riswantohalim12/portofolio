document.addEventListener('DOMContentLoaded', function() {

    // ======== STICKY NAVBAR ========
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }
    
    // ======== MOBILE MENU (HAMBURGER) ========
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('is-active');
            navLinks.classList.toggle('active');
        });

        // Tutup menu saat link di klik (untuk navigasi di halaman yang sama)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('is-active');
                navLinks.classList.remove('active');
            });
        });
    }

    // ======== TYPED.JS EFFECT ========
    if (document.querySelector('.tagline')) {
        new Typed('.tagline', {
            strings: ["Full-Stack Web Developer", "Crafting Scalable Solutions", "Building Modern Web Apps"],
            typeSpeed: 70,
            backSpeed: 50,
            loop: true,
            backDelay: 2000,
        });
    }

    // ======== PARTICLES.JS BACKGROUND ========
    if (document.getElementById('particles-js')) {
        particlesJS("particles-js", {
            particles: {
                number: { value: 40, density: { enable: true, value_area: 800 } },
                color: { value: "#ffffff" },
                shape: { type: "circle" },
                opacity: { value: 0.2, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: "#A855F7", opacity: 0.2 },
                move: { enable: true, speed: 2, direction: "none", random: true, out_mode: "out" }
            },
            interactivity: {
                events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" } },
                modes: { grab: { distance: 140, line_linked: { opacity: 0.5 } }, push: { particles_nb: 4 } }
            },
            retina_detect: true
        });
    }
    
    // ======== SWIPER.JS PROJECT SLIDER ========
    let projectSwiper;
    if (document.querySelector('.project-slider')) {
        projectSwiper = new Swiper('.project-slider', {
            loop: false, // Loop dinonaktifkan agar filter berfungsi dengan benar
            grabCursor: true, 
            spaceBetween: 30,
            slidesPerView: 1,
            breakpoints: {
                768: { slidesPerView: 2 },
                992: { slidesPerView: 3 }
            },
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        });
    }

    // ======== SWIPER.JS TESTIMONIAL SLIDER ========
    if (document.querySelector('.testimonial-slider')) {
        new Swiper('.testimonial-slider', {
            loop: true,
            grabCursor: true,
            spaceBetween: 30,
            slidesPerView: 1,
            pagination: { el: '.swiper-pagination', clickable: true },
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
        });
    }

    // ======== PROJECT FILTERING LOGIC ========
    const filterContainer = document.querySelector('.project-filter');
    if (filterContainer) {
        filterContainer.addEventListener('click', (e) => {
            if (!e.target.classList.contains('filter-btn')) return;

            filterContainer.querySelector('.active').classList.remove('active');
            e.target.classList.add('active');
            const filterValue = e.target.getAttribute('data-filter');
            
            document.querySelectorAll('.project-slider .swiper-slide').forEach(slide => {
                const category = slide.getAttribute('data-category');
                if (filterValue === 'all' || (category && category.includes(filterValue))) {
                    slide.style.display = 'flex';
                } else {
                    slide.style.display = 'none';
                }
            });

            if (projectSwiper) {
                projectSwiper.update();
                projectSwiper.slideTo(0);
            }
        });
    }

    // ======== SPOTLIGHT CARD EFFECT ========
    document.querySelectorAll('.spotlight-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });
    
    // ======== MAGNETIC BUTTONS EFFECT ========
    document.querySelectorAll('.magnetic-link').forEach(link => {
        const icon = link.querySelector('i');
        link.addEventListener('mousemove', (e) => {
            const rect = link.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(icon, { x: x * 0.5, y: y * 0.5, duration: 0.4, ease: 'power2.out' });
        });
        link.addEventListener('mouseleave', () => {
            gsap.to(icon, { x: 0, y: 0, duration: 0.4, ease: 'elastic.out(1, 0.3)' });
        });
    });
    
    // ======== BACK TO TOP BUTTON ========
    const backToTopBtn = document.getElementById('back-to-top-btn');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ======== SCROLL REVEAL & ACTIVE NAV LINK HIGHLIGHTING ========
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.nav-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                navItems.forEach(item => {
                    const link = item.querySelector('a');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(section => {
        observer.observe(section);
    });

    // ======== CONTACT FORM SUBMISSION (AJAX) - KODE BARU ========
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        formStatus.innerText = 'Mengirim...';
        formStatus.style.color = 'var(--text-muted)';

        fetch(event.target.action, {
            method: contactForm.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                formStatus.innerText = "Pesan berhasil terkirim! Terima kasih.";
                formStatus.style.color = 'var(--secondary-color)';
                contactForm.reset();
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        formStatus.innerText = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        formStatus.innerText = "Oops! Terjadi kesalahan saat mengirim pesan.";
                        formStatus.style.color = 'red';
                    }
                })
            }
        }).catch(error => {
            formStatus.innerText = "Oops! Terjadi kesalahan koneksi.";
            formStatus.style.color = 'red';
        });
    }

    if (contactForm) {
        contactForm.addEventListener("submit", handleSubmit);
    }
});
