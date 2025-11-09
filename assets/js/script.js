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
                header.classList.remove('menu-open'); // Untuk memastikan header tidak transparan
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
// 2. Logic Slider Hero Section
// ===========================================
function initializeSlider() {
    const slider = document.querySelector('.hero-slider');
    const slides = document.querySelectorAll('.hero-slide');
    const totalSlides = slides.length;
    let currentIndex = 0;

    if (!slider || totalSlides === 0) return;

    // Fungsi untuk menampilkan slide tertentu
    const updateSlider = () => {
        slides.forEach((slide, index) => {
            slide.classList.add('hidden');
            slide.classList.remove('block');
        });
        slides[currentIndex].classList.add('block');
        slides[currentIndex].classList.remove('hidden');
    };

    // Auto-advance
    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    }, 5000); // Ganti slide setiap 5 detik

    updateSlider(); // Inisialisasi slide pertama
}

// ===========================================
// 3. Logic Slider Testimonial
// ===========================================
function initializeTestimonialSlider() {
    const sliderContainer = document.querySelector('.testimonial-slider-container');
    const sliderWrapper = document.querySelector('.testimonial-slider-wrapper');
    const slides = document.querySelectorAll('.testimonial-slide');
    
    if (!sliderContainer || slides.length === 0) return;

    // Duplikasi slide untuk efek loop tanpa batas yang mulus (CSS Scroll Snap)
    slides.forEach(slide => {
        const clone = slide.cloneNode(true);
        sliderWrapper.appendChild(clone);
    });

    // Karena menggunakan CSS scroll-snap, JS hanya perlu mengatur lebar dan auto-scroll dasar (opsional)
    // Untuk saat ini kita hanya fokus pada tampilan di index.html
}


// ===========================================
// 4. Setup Animasi Scroll (Intersection Observer)
// ===========================================
function setupScrollAnimation() {
    const elements = document.querySelectorAll('.animate-on-scroll');

    if (elements.length === 0) return;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Tambahkan class untuk memulai animasi
                entry.target.classList.add('is-visible');
                // Hentikan pengamatan setelah terlihat
                observer.unobserve(entry.target);
            }
        });
    }, {
        // Opsi observer
        root: null, // viewport
        threshold: 0.2, // Mulai animasi ketika 20% elemen terlihat
        rootMargin: '0px 0px -50px 0px' // Mulai sedikit lebih awal dari bagian bawah
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}


// ===========================================
// 5. Inisialisasi Utama (Diperbaiki untuk Semua Halaman)
// ===========================================
document.addEventListener('DOMContentLoaded', () => {
    
    // Fungsi yang selalu dibutuhkan (Header/Navigasi) - HARUS SELALU BERJALAN
    setupMobileMenu(); 
    
    // Cek apakah ini halaman Beranda (hanya Beranda yang punya slider/hero utama)
    const heroSlider = document.querySelector('.hero-slider'); 
    
    if (heroSlider) {
        initializeSlider();
        initializeTestimonialSlider(); 
    }
    
    // Fungsi Animasi Scroll (Berjalan di SEMUA halaman jika ada elemen yang relevan)
    // Ini memperbaiki masalah 'halaman kosong' karena opacity: 0 tidak dihilangkan.
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length > 0) {
        setupScrollAnimation();
    }
});
