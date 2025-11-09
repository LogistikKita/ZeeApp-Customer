// Data Gambar Hero Section (Diambil dari Assets Lokal)
const IMAGE_SOURCES = [
    'assets/armada-1.jpeg',
    'assets/armada-2.jpeg',
    'assets/armada-3.jpeg',
    'assets/armada-4.jpeg',
    'assets/armada-5.jpeg'
];

// Data Mockup Testimoni (Dipisahkan dari HTML untuk kemudahan update)
const TESTIMONIALS = [
    { text: "Layanan carter mereka sangat andal. Pengiriman barang konsol game kami selalu tiba tepat waktu, bahkan untuk rute antar pulau yang menantang. Tim support responsif!", name: "Budi Santoso", title: "CEO, PT. Game Nusantara" },
    { text: "Logistik Rantai Dingin mereka adalah yang terbaik di kelasnya. Kualitas produk makanan beku kami terjaga sempurna dari gudang hingga tangan retailer. Harga reguler yang sangat terjangkau.", name: "Dewi Puspita", title: "Manajer Distribusi, CV. Pangan Sehat" },
    { text: "Integrasi WMS mereka memudahkan manajemen inventaris kami. Kami mengurangi error hingga 40% sejak beralih ke Logistik Kita. Solusi yang sangat modern.", name: "Rizky Fauzan", title: "Kepala Operasi, PT. E-Commerce Maju" }
];


// ===========================================
// 1. Logika Slider Gambar di Hero Section
// ===========================================
function initializeSlider() {
    const sliderContainer = document.getElementById('image-slider');
    if (!sliderContainer) return;
    
    let currentIndex = 0;

    IMAGE_SOURCES.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Slider Image Logistik Kita ${index + 1}`;
        img.className = 'slider-image absolute inset-0';

        // Penanganan Fallback Gambar
        img.onerror = function() {
            console.error(`Gagal memuat gambar: ${src}. Menggunakan fallback.`);
            const fallbackDiv = document.createElement('div');
            fallbackDiv.className = `absolute inset-0 w-full h-[600px] md:h-[700px] flex items-center justify-center bg-gray-700/80 text-white text-xl font-bold slider-image`;
            fallbackDiv.innerHTML = `Foto Armada ${index + 1} (Placeholder)`;
            
            if (img.parentNode === sliderContainer) {
                sliderContainer.replaceChild(fallbackDiv, img);
            } else {
                 sliderContainer.appendChild(fallbackDiv);
            }

            if (index === 0) {
                fallbackDiv.classList.add('active'); 
            }
        };
        
        if (index === 0) {
            img.classList.add('active'); 
        }
        sliderContainer.appendChild(img);
    });
    
    const images = Array.from(sliderContainer.children).filter(el => el.classList.contains('slider-image')); 
    const totalImages = images.length;
    
    function nextSlide() {
        if (images.length === 0) return;
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % totalImages;
        images[currentIndex].classList.add('active');
    }

    if (totalImages > 0) {
        setInterval(nextSlide, 5000); // Hanya jalankan jika ada gambar
    }
}


// ===========================================
// 2. Logika Slider Testimoni
// ===========================================
function initializeTestimonialSlider() {
    const track = document.getElementById('testimonial-track');
    const dotsContainer = document.getElementById('testimonial-dots');
    if (!track || !dotsContainer) return;

    let currentTestimonial = 0;
    const totalTestimonials = TESTIMONIALS.length;

    // A. Generate Kartu Testimoni (dengan ikon quote SVG inline)
    TESTIMONIALS.forEach(t => {
        const card = document.createElement('div');
        card.className = 'testimonial-card flex flex-col items-center text-center';
        card.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-10 h-10 accent-text mb-4"><path d="M3 21c-2.76 0-5 2.24-5 5s2.24 5 5 5h1c4.42 0 8-3.58 8-8V8a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v12h1zm12-11v10h2c2.76 0 5-2.24 5-5s-2.24-5-5-5h-2"/></svg>
            <p class="text-lg italic mb-6">"${t.text}"</p>
            <div class="font-semibold text-primary">${t.name}</div>
            <div class="text-sm text-gray-500">${t.title}</div>
        `;
        track.appendChild(card);
    });
    
    // B. Generate Dots Navigasi
    for (let i = 0; i < totalTestimonials; i++) {
        const dot = document.createElement('button');
        dot.className = 'w-3 h-3 rounded-full bg-white opacity-50 transition duration-300';
        dot.setAttribute('data-index', i);
        dot.addEventListener('click', () => showTestimonial(i));
        dotsContainer.appendChild(dot);
    }

    function updateDots() {
        const dots = dotsContainer.querySelectorAll('button');
        dots.forEach((dot, index) => {
            dot.classList.remove('opacity-100', 'bg-accent');
            dot.classList.add('opacity-50', 'bg-white');
            if (index === currentTestimonial) {
                dot.classList.add('opacity-100', 'bg-accent');
            }
        });
    }

    function showTestimonial(index) {
        currentTestimonial = index;
        const offset = -currentTestimonial * 100 / (totalTestimonials / 1);
        track.style.transform = `translateX(${offset}%)`;
        updateDots();
    }

    showTestimonial(0);
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
        showTestimonial(currentTestimonial);
    }, 7000); // Auto-slide setiap 7 detik
}


// ===========================================
// 3. Logika Navigasi Mobile/Universal (Menu Toggle)
// ===========================================
function setupMobileMenu() {
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    
    if (!menuButton || !mobileMenu || !menuIcon || !closeIcon) return;

    menuButton.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.toggle('hidden');
        
        // Mengganti ikon Menu menjadi ikon Close (X) dan sebaliknya
        if (isHidden) {
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        } else {
            menuIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
        }
    });

    // Menutup menu saat link diklik
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        });
    });
}


// ===========================================
// 4. Logika Animasi Entrance saat Scroll
// ===========================================
function setupScrollAnimation() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    if (elements.length === 0) return;
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay');
                if (delay) {
                    entry.target.style.transitionDelay = `${delay}s`;
                }
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.2, 
        rootMargin: '0px 0px -50px 0px' 
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}


// ===========================================
// 5. Inisialisasi Utama
// ===========================================
document.addEventListener('DOMContentLoaded', () => {
    initializeSlider();
    initializeTestimonialSlider(); 
    setupMobileMenu();
    setupScrollAnimation();
});