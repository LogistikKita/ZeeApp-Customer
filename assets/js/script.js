// assets/js/script.js

// =======================================================
// 1. FUNGSI UTAMA UNTUK INJEKSI HTML DAN INISIALISASI
// =======================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Injeksi Header dan Footer (Menggantikan placeholder)
    loadHTML('header.html', 'header-placeholder')
        .then(() => {
            // INISIALISASI SETELAH HEADER DIMUAT
            initializeThemeToggle();
            // FIX MASALAH HAMBURGER MENU
            initializeMobileMenu(); 
        });

    loadHTML('footer.html', 'footer-placeholder');

    // 2. Inisialisasi fungsi lain
    initializeScrollFunctions();
    initializeChatbot();
    initializeScrollAnimation();
    
    // 3. Menghilangkan Preloader setelah semua dimuat
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('hidden-fade');
            // Hapus setelah transisi
            setTimeout(() => {
                preloader.style.display = 'none';
                document.body.classList.remove('overflow-x-hidden', 'hidden');
            }, 600); 
        } else {
            document.body.classList.remove('overflow-x-hidden', 'hidden');
        }
    });
});

/**
 * Memuat file HTML eksternal ke dalam placeholder.
 * @param {string} url - Path ke file HTML.
 * @param {string} elementId - ID dari elemen placeholder.
 * @returns {Promise<void>}
 */
function loadHTML(url, elementId) {
    const placeholder = document.getElementById(elementId);
    if (placeholder) {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Gagal memuat ${url}: ${response.statusText}`);
                }
                return response.text();
            })
            .then(html => {
                placeholder.innerHTML = html;
            })
            .catch(error => {
                console.error(`Error memuat ${url}:`, error);
                placeholder.innerHTML = `<p style="color: red;">Gagal memuat ${url}</p>`;
            });
    }
    return Promise.resolve();
}

// =======================================================
// 2. FIX: FUNGSI HAMBURGER MENU
// =======================================================

function initializeMobileMenu() {
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    if (menuButton && mobileMenu && menuIcon && closeIcon) {
        menuButton.addEventListener('click', () => {
            // Toggle menu visibility
            mobileMenu.classList.toggle('hidden');
            
            // Toggle icons (hamburger <-> close)
            menuIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');
        });
    }
}


// =======================================================
// 3. FUNGSI THEME TOGGLE (DARK/LIGHT MODE)
// =======================================================

function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    const html = document.documentElement;

    // Load saved theme or prefer system theme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        html.classList.add('dark');
        if (sunIcon && moonIcon) {
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        }
    } else {
        html.classList.remove('dark');
        if (sunIcon && moonIcon) {
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            html.classList.toggle('dark');
            const isDark = html.classList.contains('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            if (sunIcon && moonIcon) {
                sunIcon.classList.toggle('hidden', !isDark);
                moonIcon.classList.toggle('hidden', isDark);
            }
        });
    }
}

// =======================================================
// 4. FUNGSI SCROLL UP/DOWN & VISIBILITY
// =======================================================

function initializeScrollFunctions() {
    const scrollUp = document.getElementById('scroll-up');
    const scrollDown = document.getElementById('scroll-down');
    
    // Tombol Scroll Down
    if (scrollDown) {
        scrollDown.addEventListener('click', () => {
            window.scrollBy({ top: window.innerHeight / 2, behavior: 'smooth' });
        });
    }

    // Tampilkan/Sembunyikan Scroll Up
    window.addEventListener('scroll', () => {
        if (scrollUp) {
            if (window.scrollY > 300) {
                scrollUp.classList.remove('opacity-0', 'pointer-events-none');
            } else {
                scrollUp.classList.add('opacity-0', 'pointer-events-none');
            }
        }
    });

    // Fungsi Scroll Up
    if (scrollUp) {
        scrollUp.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// =======================================================
// 5. FUNGSI CHATBOT GEMINI
// =======================================================

function initializeChatbot() {
    const chatButton = document.getElementById('gemini-chatbot-button');
    const chatModal = document.getElementById('gemini-chat-modal');
    const closeButton = document.getElementById('close-chat-button');
    // const chatInput = document.getElementById('chat-input-field'); // Akan digunakan di tahap Supabase

    if (chatButton && chatModal && closeButton) {
        chatButton.addEventListener('click', () => {
            chatModal.classList.toggle('active');
            chatModal.style.display = chatModal.classList.contains('active') ? 'flex' : 'none';
        });

        closeButton.addEventListener('click', () => {
            chatModal.classList.remove('active');
            chatModal.style.display = 'none';
        });
    }
}

// =======================================================
// 6. FUNGSI ANIMASI (Akan digunakan pada halaman lain)
// =======================================================

function initializeScrollAnimation() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }, parseFloat(delay) * 1000);
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1 
    });

    elements.forEach(el => observer.observe(el));
}
