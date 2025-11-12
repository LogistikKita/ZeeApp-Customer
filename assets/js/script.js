// assets/js/script.js

// ===========================================
// X. Fungsionalitas HTML Include (untuk Header/Footer)
// ===========================================

let componentsLoaded = 0;
const totalComponents = 2; // header.html dan footer.html

function includeHTML(elementId, filePath) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                console.error(`Gagal memuat file ${filePath}: Status ${response.status}`);
                componentsLoaded++; 
                return ''; 
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
        .finally(() => {
            componentsLoaded++;
            if (componentsLoaded >= totalComponents) {
                hidePreloader();
            }
        })
        .catch(error => {
            console.error(error);
        });
}

// ===========================================
// Y. Fungsionalitas PRELOADER
// ===========================================

function hidePreloader() {
    const preloader = document.getElementById('preloader');
    const body = document.body;

    // 1. Tampilkan body
    body.classList.remove('hidden');

    // 2. Transisikan preloader untuk menghilang
    if (preloader) {
        setTimeout(() => {
             preloader.classList.add('hidden-fade');
        }, 50); 
       
        // Hapus preloader dari DOM setelah selesai transisi
        setTimeout(() => {
            preloader.remove();
        }, 700); 
    }
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
// 3. Fungsionalitas TOMBOL SCROLL NAVIGASI
// ===========================================
function setupScrollNavigation() {
    const scrollUpButton = document.getElementById('scroll-up');
    const scrollDownButton = document.getElementById('scroll-down');

    if (!scrollUpButton || !scrollDownButton) return;

    const toggleScrollUpButton = () => {
        if (window.scrollY > 300) { 
            scrollUpButton.classList.remove('opacity-0', 'pointer-events-none');
            scrollUpButton.classList.add('opacity-100');
        } else {
            scrollUpButton.classList.remove('opacity-100');
            scrollUpButton.classList.add('opacity-0', 'pointer-events-none');
        }
        
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const scrollBottom = Math.ceil(window.scrollY + clientHeight);

        if (scrollBottom >= scrollHeight - 50) { 
             scrollDownButton.classList.add('opacity-0', 'pointer-events-none');
        } else {
             scrollDownButton.classList.remove('opacity-0', 'pointer-events-none');
        }
    };

    window.addEventListener('scroll', toggleScrollUpButton);

    scrollUpButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    scrollDownButton.addEventListener('click', () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });

    toggleScrollUpButton();
}


// ===========================================
// 4. SETUP CHATBOT GEMINI POPUP
// ===========================================
function setupGeminiChatbot() {
    const chatButton = document.getElementById('gemini-chatbot-button');
    const chatModal = document.getElementById('gemini-chat-modal');
    const closeButton = document.getElementById('close-chat-button');
    const chatInputField = document.getElementById('chat-input-field');

    if (!chatButton || !chatModal || !closeButton) return;

    const toggleChat = () => {
        chatModal.classList.toggle('active');
        if (chatModal.classList.contains('active')) {
            chatInputField.focus();
        }
    };

    chatButton.addEventListener('click', toggleChat);
    closeButton.addEventListener('click', toggleChat);

    chatModal.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    chatInputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && chatInputField.value.trim() !== '') {
            console.log("Pesan dikirim: " + chatInputField.value);
            chatInputField.value = '';
        }
    });
}


// ===========================================
// 8. Inisialisasi Utama
// ===========================================
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 8.1 MEMUAT HEADER & FOOTER DARI FILE TERPISAH ---
    includeHTML('header-placeholder', 'header.html');
    includeHTML('footer-placeholder', 'footer.html');

    // Fungsionalitas Global Lainnya
    setupScrollNavigation(); 
    setupGeminiChatbot(); 
    
    // Fungsionalitas Khusus Halaman Depan (Placeholder)
    const heroSlider = document.getElementById('image-slider'); 
    if (heroSlider) {
        // initializeSlider();
        // initializeTestimonialSlider(); 
    }
    
    // Animasi Scroll
    setupScrollAnimation();
});


// (Tambahkan fungsi-fungsi lain yang ada di file Anda di sini, jika ada)
// ... initializeSlider, initializeTestimonialSlider, setupScrollAnimation ...
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
