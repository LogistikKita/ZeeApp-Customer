// assets/js/script.js

// ===========================================
// X. Fungsionalitas HTML Include (untuk Header/Footer)
// ===========================================
function includeHTML(elementId, filePath) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                console.error(`Gagal memuat file ${filePath}: Status ${response.status}`);
                throw new Error(`Gagal memuat file: ${filePath}`);
            }
            return response.text();
        })
        .then(htmlContent => {
            const placeholder = document.getElementById(elementId);
            if (placeholder) {
                placeholder.innerHTML = htmlContent;
                
                if (elementId === 'header-placeholder') {
                    setupMobileMenu(); 
                    setupThemeToggle(); 
                }
            }
        })
        .catch(error => {
            console.error(error);
        });
}


// ===========================================
// 1. Setup Mobile Menu (Hamburger)
// ===========================================
function setupMobileMenu() {
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    const header = document.getElementById('main-header');

    if (menuButton && mobileMenu && menuIcon && closeIcon) {
        menuButton.addEventListener('click', () => {
            const isMenuOpen = mobileMenu.classList.contains('flex');

            if (isMenuOpen) {
                mobileMenu.classList.remove('flex');
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
                header.classList.remove('menu-open'); 
            } else {
                mobileMenu.classList.add('flex');
                mobileMenu.classList.remove('hidden');
                menuIcon.classList.add('hidden');
                closeIcon.classList.remove('hidden');
                header.classList.add('menu-open');
            }
        });
    }
}

// ===========================================
// 2. Fungsionalitas MODE GELAP/TERANG
// ===========================================
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    if (!themeToggle || !sunIcon || !moonIcon) return;

    const savedTheme = localStorage.getItem('theme') || 
                       (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    if (savedTheme === 'dark') {
        htmlElement.classList.add('dark');
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    } else {
        htmlElement.classList.remove('dark');
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    }

    themeToggle.addEventListener('click', () => {
        htmlElement.classList.toggle('dark');
        
        const currentTheme = htmlElement.classList.contains('dark') ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);

        sunIcon.classList.toggle('hidden');
        moonIcon.classList.toggle('hidden');
    });
}


// ===========================================
// 3. Fungsionalitas TOMBOL SCROLL NAVIGASI BARU
// ===========================================
function setupScrollNavigation() {
    const scrollUpButton = document.getElementById('scroll-up');
    const scrollDownButton = document.getElementById('scroll-down');
    // Tombol Chatbot juga ada di container, tapi tidak memiliki fungsi scroll di sini.
    const geminiChatbotButton = document.getElementById('gemini-chatbot-button'); 

    if (!scrollUpButton || !scrollDownButton) return;

    // Mengontrol visibilitas tombol "scroll up"
    const toggleScrollUpButton = () => {
        // Tampilkan tombol saat scroll lebih dari 300px
        if (window.scrollY > 300) { 
            scrollUpButton.classList.remove('opacity-0', 'pointer-events-none');
            scrollUpButton.classList.add('opacity-100');
        } else {
            scrollUpButton.classList.remove('opacity-100');
            scrollUpButton.classList.add('opacity-0', 'pointer-events-none');
        }
        
        // Mengontrol visibilitas tombol "scroll down"
        // Sembunyikan tombol 'scroll down' jika sudah di bawah atau dekat bagian bawah halaman
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const scrollBottom = Math.ceil(window.scrollY + clientHeight);

        if (scrollBottom >= scrollHeight - 50) { // 50px buffer
             scrollDownButton.classList.add('opacity-0', 'pointer-events-none');
        } else {
             scrollDownButton.classList.remove('opacity-0', 'pointer-events-none');
        }
    };

    window.addEventListener('scroll', toggleScrollUpButton);

    // Scroll ke Paling Atas
    scrollUpButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Scroll ke Paling Bawah
    scrollDownButton.addEventListener('click', () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    });
    
    // Placeholder function for Gemini Chatbot (akan diisi nanti)
    if (geminiChatbotButton) {
        geminiChatbotButton.addEventListener('click', () => {
            console.log('Gemini Chatbot opened!');
            // Logika untuk membuka jendela chat atau modal di sini
        });
    }

    // Inisialisasi awal visibilitas
    toggleScrollUpButton();
}


// ===========================================
// 4. Logic Slider Hero Section (Placeholder)
// ===========================================
function initializeSlider() {
    const slider = document.querySelector('#image-slider');
    const slides = document.querySelectorAll('.hero-slide'); 
    const totalSlides = slides.length;
    let currentIndex = 0;

    if (!slider || totalSlides === 0) return;

    const updateSlider = () => {
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
        });
        slides[currentIndex].classList.add('active');
    };

    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    }, 5000); 

    updateSlider(); 
}

// ===========================================
// 5. Logic Slider Testimonial (Placeholder)
// ===========================================
function initializeTestimonialSlider() {
    const track = document.getElementById('testimonial-track');
    const dotsContainer = document.getElementById('testimonial-dots');
    
    if (!track || !dotsContainer) return;
    
    // Logika lanjutan testimonial di sini
}


// ===========================================
// 6. Setup Animasi Scroll (Intersection Observer)
// ===========================================
function setupScrollAnimation() {
    const elements = document.querySelectorAll('.animate-on-scroll');

    if (elements.length === 0) return;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || '0';
                entry.target.style.transitionDelay = delay;

                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, 
        threshold: 0.2, 
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}


// ===========================================
// 7. Inisialisasi Utama
// ===========================================
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 7.1 MEMUAT HEADER & FOOTER DARI FILE TERPISAH ---
    includeHTML('header-placeholder', 'header.html');
    includeHTML('footer-placeholder', 'footer.html');

    // Fungsionalitas Global Lainnya (Dipanggil setelah header dimuat)
    setupScrollNavigation(); 
    
    // Fungsionalitas Khusus Halaman Depan
    const heroSlider = document.getElementById('image-slider'); 
    
    if (heroSlider) {
        initializeSlider();
        initializeTestimonialSlider(); 
    }
    
    // Animasi Scroll
    setupScrollAnimation();
});
