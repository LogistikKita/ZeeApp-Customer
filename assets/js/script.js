document.addEventListener('DOMContentLoaded', () => {
    
    const body = document.body;
    const preloader = document.getElementById('preloader');
    
    // 1. Inisialisasi: Header, Menu, dan Theme (Element sudah ada karena SSI)
    initializeThemeToggle();
    initializeMobileMenu(); 
    
    // 2. Inisialisasi fungsi lain
    initializeScrollFunctions();
    initializeChatbot();
    initializeScrollAnimation();
    
    // 3. Menghilangkan Preloader: Cepat, karena konten sudah disisipkan oleh server
    if (preloader) {
        preloader.classList.add('hidden-fade');
        
        // Kita berikan sedikit waktu untuk animasi fade
        setTimeout(() => {
            preloader.style.display = 'none';
            // Menghilangkan overflow setelah preloader benar-benar hilang
            body.classList.remove('overflow-x-hidden');
        }, 600); 
    } else {
        body.classList.remove('overflow-x-hidden');
    }
});

// =======================================================
// FUNGSI loadHTML TELAH DIHAPUS, DIGANTIKAN OLEH SSI
// =======================================================

// ... (Fungsi initializeMobileMenu, initializeThemeToggle, initializeScrollFunctions, 
// initializeChatbot, dan initializeScrollAnimation tetap sama seperti yang Anda kirim) ...
