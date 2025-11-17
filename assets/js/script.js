// assets/js/script.js

// =======================================================
// 1. FUNGSI UTAMA UNTUK INJEKSI HTML DAN INISIALISASI
// =======================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Injeksi Header dan Footer (Jika file terpisah)
    // Jika Anda ingin header/footer ada di index.html, hapus 2 baris ini
    loadHTML('header.html', 'header-placeholder')
        .then(() => {
            initializeThemeToggle();
            initializeMobileMenu(); 
        });

    loadHTML('footer.html', 'footer-placeholder');

    // 2. Inisialisasi fungsi lain
    initializeScrollFunctions();
    initializeChatbot();
    initializeScrollAnimation();
    
    // 3. Menghilangkan Preloader (Setelah semua aset dimuat)
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('hidden-fade');
            setTimeout(() => {
                preloader.style.display = 'none';
                document.body.classList.remove('overflow-x-hidden', 'hidden');
            }, 600); 
        } else {
            document.body.classList.remove('overflow-x-hidden', 'hidden');
        }
    });
    
    // 4. FALLBACK KRITIS (3 DETIK) - PENTING UNTUK MENGATASI MASALAH ANDA
    setTimeout(() => {
        if (document.body.classList.contains('hidden')) {
             console.warn("FALLBACK: Script gagal loading konten atau load terlalu lama (3s). Menghapus kelas 'hidden' pada body secara paksa. Cek F12 Console untuk error 404.");
             document.body.classList.remove('overflow-x-hidden', 'hidden');
        }
    }, 3000); 
});

/**
 * Memuat file HTML eksternal ke dalam placeholder dengan 2x coba path.
 */
function loadHTML(url, elementId) {
    const placeholder = document.getElementById(elementId);
    if (!placeholder) return Promise.resolve();

    return fetch(url)
        .then(response => {
            if (!response.ok) {
                // Coba path kedua: di folder 'partials/'
                console.warn(`[FETCH FAILED] ${url} di root. Mencoba path: partials/${url}`);
                return fetch(`partials/${url}`)
                    .then(r2 => {
                        if (!r2.ok) throw new Error(`404: File ${url} tidak ditemukan di root atau /partials/`);
                        return r2.text();
                    });
            }
            return response.text();
        })
        .then(html => {
            placeholder.innerHTML = html;
        })
        .catch(error => {
            console.error(`ERROR KRITIS loadHTML (${url}):`, error);
            placeholder.innerHTML = `<p style="color: red; padding: 10px; border: 1px dashed red;">[Gagal memuat ${url}. Cek Console (F12) untuk detail error.]</p>`;
        });
}

// =======================================================
// 2. FUNGSI HAMBURGER MENU (FIX)
// =======================================================

function initializeMobileMenu() {
    // Mengambil elemen setelah header.html di-inject
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    if (menuButton && mobileMenu && menuIcon && closeIcon) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            menuIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');
        });
    }
}


// =======================================================
// 3. FUNGSI THEME TOGGLE (DARK/LIGHT MODE)
// =======================================================
// (Sama seperti sebelumnya, bergantung pada elemen di header.html)
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    const html = document.documentElement;

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
// ... (initializeScrollFunctions, initializeChatbot, initializeScrollAnimation sama seperti sebelumnya) ...
