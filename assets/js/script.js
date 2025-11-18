// assets/js/script.js

// =======================================================
// A. LOGIKA UTILITY UMUM & DOM
// =======================================================

function initializeThemeToggle() {
    const html = document.documentElement;
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    function setDark(isDark) {
        if (isDark) {
            html.classList.add('dark');
            if (sunIcon && moonIcon) {
                moonIcon.classList.add('hidden');
                sunIcon.classList.remove('hidden');
            }
        } else {
            html.classList.remove('dark');
            if (sunIcon && moonIcon) {
                sunIcon.classList.add('hidden');
                moonIcon.classList.remove('hidden');
            }
        }
    }

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setDark(isDark);
    localStorage.theme = isDark ? 'dark' : 'light';

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = localStorage.theme;
            isDark = currentTheme !== 'dark';
            localStorage.theme = isDark ? 'dark' : 'light';
            setDark(isDark);
        });
    }
}

function initializeMobileMenu() {
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            menuIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');
        });
    }
}

function initializeScrollFunctions() {
    const scrollUp = document.getElementById('scroll-up');
    const scrollDown = document.getElementById('scroll-down');
    
    const toggleScrollButtons = () => {
        if (!scrollUp || !scrollDown) return;

        const scrollY = window.scrollY;
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollY / totalHeight) * 100;

        // Tampilkan Scroll Up jika sudah di scroll ke bawah 20%
        if (scrollPercent > 20) {
            scrollUp.classList.remove('opacity-0', 'pointer-events-none');
        } else {
            scrollUp.classList.add('opacity-0', 'pointer-events-none');
        }

        // Sembunyikan Scroll Down jika sudah mencapai 90%
        if (scrollPercent > 90) {
            scrollDown.classList.add('opacity-0', 'pointer-events-none');
        } else {
            scrollDown.classList.remove('opacity-0', 'pointer-events-none');
        }
    };

    window.addEventListener('scroll', toggleScrollButtons);
    toggleScrollButtons(); 

    if (scrollUp) {
        scrollUp.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    if (scrollDown) {
        scrollDown.addEventListener('click', () => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        });
    }
}

function initializeScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || '0';
                entry.target.style.animationDelay = `${delay}s`;
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
}

function initializeChatbot() {
    const chatButton = document.getElementById('gemini-chatbot-button');
    const chatModal = document.getElementById('gemini-chat-modal');
    const closeButton = document.getElementById('close-chat-button');
    
    if (chatButton && chatModal && closeButton) {
        chatButton.addEventListener('click', () => {
            if (chatModal.classList.contains('hidden')) {
                chatModal.classList.remove('hidden');
                setTimeout(() => chatModal.classList.add('active'), 10); 
            } else {
                chatModal.classList.remove('active');
                setTimeout(() => chatModal.classList.add('hidden'), 350); 
            }
        });

        closeButton.addEventListener('click', () => {
            chatModal.classList.remove('active');
            setTimeout(() => chatModal.classList.add('hidden'), 350);
        });
    }
}

// =======================================================
// B. LOGIKA CLIENT-SIDE INCLUDE & INIT
// =======================================================

async function includeHTML() {
    // Fungsi untuk memuat header dan footer dari file partials
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');
    
    if (headerPlaceholder) {
        try {
            const response = await fetch('partials/header.html');
            if (response.ok) headerPlaceholder.innerHTML = await response.text();
        } catch (error) { console.error('Error loading header:', error); }
    }
    
    if (footerPlaceholder) {
        try {
            const response = await fetch('partials/footer.html');
            if (response.ok) footerPlaceholder.innerHTML = await response.text();
        } catch (error) { console.error('Error loading footer:', error); }
    }
}

function initializePreloader() {
    const body = document.body;
    const preloader = document.getElementById('preloader');
    
    if (preloader) {
        preloader.classList.add('hidden-fade');
        
        setTimeout(() => {
            preloader.style.display = 'none';
            body.classList.remove('overflow-x-hidden', 'hidden'); 
        }, 600); 
    } else {
        body.classList.remove('overflow-x-hidden', 'hidden');
    }
}


// =======================================================
// C. INIT UTAMA
// =======================================================

document.addEventListener('DOMContentLoaded', async () => {
    
    // 1. Load Header & Footer
    await includeHTML(); 
    
    // 2. Inisialisasi Fungsi Global
    initializeThemeToggle();
    initializeMobileMenu(); 
    initializeScrollFunctions();
    initializeChatbot(); 
    initializeScrollAnimation();
    
    // 3. Hilangkan Preloader
    initializePreloader();
});
