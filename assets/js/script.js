document.addEventListener('DOMContentLoaded', () => {
    
    const body = document.body;
    const preloader = document.getElementById('preloader');
    
    // 1. Inisialisasi: Header, Menu, dan Theme (Element sudah ada karena SSI)
    initializeThemeToggle();
    initializeMobileMenu(); 
    
    // 2. Inisialisasi fungsi lain
    initializeScrollFunctions();
    initializeChatbot(); // Panggil fungsi Chatbot yang diperbarui
    initializeScrollAnimation();
    
    // 3. Menghilangkan Preloader
    if (preloader) {
        preloader.classList.add('hidden-fade');
        
        setTimeout(() => {
            preloader.style.display = 'none';
            body.classList.remove('overflow-x-hidden');
        }, 600); 
    } else {
        body.classList.remove('overflow-x-hidden');
    }
});

function initializeMobileMenu() {
    // ... (Logika Menu Mobile tetap sama) ...
}

function initializeThemeToggle() {
    // ... (Logika Theme Toggle tetap sama) ...
}

function initializeChatbot() {
    const chatButton = document.getElementById('gemini-chatbot-button');
    const chatModal = document.getElementById('gemini-chat-modal');
    const closeButton = document.getElementById('close-chat-button');
    
    if (chatButton && chatModal && closeButton) {
        
        // PENTING: Memastikan modal tersembunyi sejak awal (override jika ada bug)
        chatModal.classList.add('hidden'); 

        chatButton.addEventListener('click', () => {
            // Jika tersembunyi, hapus 'hidden', lalu beri jeda singkat untuk transisi 'active'
            if (chatModal.classList.contains('hidden')) {
                chatModal.classList.remove('hidden');
                setTimeout(() => chatModal.classList.add('active'), 10); 
            } else {
                // Jika aktif, hapus 'active', lalu tambahkan 'hidden' setelah transisi selesai
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

function initializeScrollFunctions() {
    // ... (Logika Scroll tetap sama) ...
}

function initializeScrollAnimation() {
    // ... (Logika Animasi tetap sama) ...
}
