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
    { text: "Logistik Rantai Dingin mereka adalah yang terbaik di kelasnya. Kualitas produk makanan beku kami terjaga sempurna dari gudang hingga tangan retailer. Harga reguler yang sangat terjangankan.", name: "Dewi Puspita", title: "Manajer Distribusi, CV. Pangan Sehat" },
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

        img.onerror = function() {
            // Logika Fallback dipindahkan ke JS
            console.error(`Gagal memuat gambar: ${src}. Menggunakan fallback.`);
            const fallbackDiv = document.createElement('div');
            fallbackDiv.className = `absolute inset-0 w-full h-full flex items-center justify-center bg-gray-700/80 text-white text-xl font-bold slider-image`;
            fallbackDiv.innerHTML = `Foto Armada ${index + 1} (Assets Placeholder)`;
            
            sliderContainer.replaceChild(fallbackDiv, img);
            if (index === 0) {
                fallbackDiv.classList.add('active'); 
            }
        };
        
        if (index === 0) {
            img.classList.add('active'); 
        }
        sliderContainer.appendChild(img);
    });

    const images = Array.from(sliderContainer.children);
    const totalImages = images.length;

    function nextSlide() {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % totalImages;
        images[currentIndex].classList.add('active');
    }

    setInterval(nextSlide, 5000); // Ganti slide setiap 5 detik
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

    // A. Generate Kartu Testimoni
    TESTIMONIALS.forEach(t => {
        const card = document.createElement('div');
        card.className = 'testimonial-card flex flex-col items-center text-center';
        card.innerHTML = `
            <span data-lucide="quote" class="w-10 h-10 accent-text mb-4"></span>
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
// 3. Logika Navigasi Mobile (Menu Toggle)
// ===========================================
function setupMobileMenu() {
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!menuButton || !mobileMenu) return;

    // Memastikan Lucide Icons terbuat saat DOM dimuat
    lucide.createIcons();

    menuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const iconContainer = menuButton.querySelector('span');
        
        // Mengganti ikon Menu menjadi ikon Close (X) dan sebaliknya
        iconContainer.innerHTML = mobileMenu.classList.contains('hidden') 
            ? lucide.icons.menu.toSvg({ class: 'w-7 h-7' }) 
            : lucide.icons['x'].toSvg({ class: 'w-7 h-7' });
        lucide.createIcons();
    });

    // Menutup menu mobile saat link diklik
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            const iconContainer = menuButton.querySelector('span');
            iconContainer.innerHTML = lucide.icons.menu.toSvg({ class: 'w-7 h-7' });
            lucide.createIcons();
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
    // Pastikan icon dibuat di awal juga
    lucide.createIcons(); 
    
    initializeSlider();
    initializeTestimonialSlider();
    setupMobileMenu();
    setupScrollAnimation();
});
