// assets/js/script.js

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
                // Tutup Menu
                mobileMenu.classList.remove('flex');
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
                header.classList.remove('menu-open'); 
            } else {
                // Buka Menu
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

    // Cek preferensi tema yang tersimpan di localStorage, atau preferensi sistem
    const savedTheme = localStorage.getItem('theme') || 
                       (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Terapkan tema saat load
    if (savedTheme === 'dark') {
        htmlElement.classList.add('dark');
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    } else {
        htmlElement.classList.remove('dark');
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    }

    // Listener untuk tombol toggle
    themeToggle.addEventListener('click', () => {
        htmlElement.classList.toggle('dark');
        
        // Simpan preferensi baru & ubah ikon
        const currentTheme = htmlElement.classList.contains('dark') ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);

        sunIcon.classList.toggle('hidden');
        moonIcon.classList.toggle('hidden');
    });
}


// ===========================================
// 3. Fungsionalitas TOMBOL SCROLL NAVIGASI
// ===========================================
function setupScrollNavigation() {
    const scrollUpButton = document.getElementById('scroll-up');
    const scrollDownButton = document.getElementById('scroll-down');

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

    // Inisialisasi awal visibilitas
    toggleScrollUpButton();
}


// ===========================================
// 4. Logic Slider Hero Section (Existing)
// ===========================================
function initializeSlider() {
    // Fungsionalitas slider gambar di sini
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
// 5. Logic Slider Testimonial (Existing)
// ===========================================
function initializeTestimonialSlider() {
    const track = document.getElementById('testimonial-track');
    const dotsContainer = document.getElementById('testimonial-dots');
    
    if (!track || !dotsContainer) return;
    
    // Logika lanjutan testimonial di sini
}


// ===========================================
// 6. Setup Animasi Scroll (Intersection Observer) (Existing)
// ===========================================
function setupScrollAnimation() {
    const elements = document.querySelectorAll('.animate-on-scroll');

    if (elements.length === 0) return;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Tambahkan class 'is-visible'
                entry.target.classList.add('is-visible');
                // Hentikan pengamatan setelah terlihat
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
    
    // Fungsionalitas Global
    setupMobileMenu(); 
    setupThemeToggle(); 
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
