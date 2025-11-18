// assets/js/script.js

// =======================================================
// A. DATA ARMADA (JSON-like structure)
// =======================================================

const ARMADA_DATA = {
    pickup: {
        title: "Mobil Pickup (1 - 1,5 Ton)",
        units: [
            { name: "Pickup Bak Terbuka", img: "armada-pickup-bak.jpg", maxLoad: "1 - 1,5 Ton", cbm: "2 - 4 CBM", dimensions: "250 x 150 x 40 cm" },
            { name: "Pickup Box Tertutup", img: "armada-pickup-box.jpg", maxLoad: "± 1 Ton", cbm: "4 - 6 CBM", dimensions: "300 x 150 x 150 cm" }
        ],
        description: "Ideal untuk pengiriman dalam kota, barang retail kecil, atau barang yang membutuhkan kecepatan dan kelincahan tinggi."
    },
    cdd: {
        title: "Truk CDD (Colt Diesel Double / 5 - 6 Ton)",
        units: [
            { name: "CDD Bak Terbuka", img: "armada-cdd-bak.jpg", maxLoad: "5 - 6 Ton", cbm: "26 CBM", dimensions: "450 x 200 x 200 cm" },
            { name: "CDD Box Tertutup", img: "armada-cdd-box.jpg", maxLoad: "± 5 Ton", cbm: "24 - 26 CBM", dimensions: "450 x 200 x 200 cm" }
        ],
        description: "Pilihan paling umum untuk pengiriman antarkota, barang manufaktur, bahan bangunan ringan, dan kargo berukuran menengah."
    },
    fuso: {
        title: "Truk Fuso (8 - 16 Ton)",
        units: [
            { name: "Fuso Bak Terbuka", img: "armada-fuso-bak.jpg", maxLoad: "8 - 10 Ton", cbm: "25 CBM", dimensions: "700 x 240 x 100 cm" },
            { name: "Fuso Box Tertutup", img: "armada-fuso-box.jpg", maxLoad: "8 - 10 Ton", cbm: "40 CBM", dimensions: "700 x 240 x 240 cm" },
            { name: "Fuso Long Bak Terbuka", img: "armada-fuso-long.jpg", maxLoad: "± 16 Ton", cbm: "30 - 45 CBM", dimensions: "800 x 240 x 150 cm" }
        ],
        description: "Digunakan untuk kargo berat dan volume besar, cocok untuk pengiriman hasil bumi, mesin, atau distribusi regional yang intensif."
    },
    tronton: {
        title: "Truk Tronton (15 - 20 Ton)",
        units: [
            { name: "Tronton Bak Terbuka", img: "armada-tronton-bak.jpg", maxLoad: "15 - 20 Ton", cbm: "50 CBM", dimensions: "950 x 240 x 240 cm" },
            { name: "Tronton WingBox", img: "armada-tronton-wingbox.jpg", maxLoad: "15 - 20 Ton", cbm: "45 - 50 CBM", dimensions: "960 x 250 x 250 cm" },
            { name: "Tronton Loss Bak", img: "armada-tronton-loss.jpg", maxLoad: "15 - 20 Ton", cbm: "Variatif", dimensions: "950 x 240 x - cm" }
        ],
        description: "Armada kelas berat untuk pengiriman proyek, barang curah, dan kargo industri yang membutuhkan daya angkut maksimal."
    },
    trailer: {
        title: "Truk Trailer (20 - 30 Ton)",
        units: [
            { name: "Trailer Container 20ft", img: "armada-trailer-20ft.jpg", maxLoad: "20 - 22 Ton", cbm: "33 CBM", dimensions: "590 x 235 x 239 cm" },
            { name: "Trailer Container 40ft", img: "armada-trailer-40ft.jpg", maxLoad: "25 - 28 Ton", cbm: "67 CBM", dimensions: "1200 x 235 x 239 cm" },
            { name: "Trailer Flatbed", img: "armada-trailer-flatbed.jpg", maxLoad: "25 - 30 Ton", cbm: "Variatif", dimensions: "1200 x 250 x - cm" }
        ],
        description: "Solusi logistik super berat, terutama untuk pengangkutan kontainer, alat berat, atau kargo super dimensi lainnya."
    }
};

// =======================================================
// B. LOGIKA MODAL ARMADA (Paling Penting)
// =======================================================

const armadaModal = document.getElementById('armada-modal');
const modalTitle = document.getElementById('modal-category-title');
const modalBody = document.getElementById('modal-body-details');
const closeArmadaModal = document.getElementById('close-armada-modal');

/**
 * Menampilkan detail armada dalam modal berdasarkan ID kategori.
 * @param {string} categoryId - Kunci dari ARMADA_DATA (e.g., 'pickup').
 */
window.showArmadaDetail = function(categoryId) {
    const data = ARMADA_DATA[categoryId];
    if (!data) return;

    // 1. Update Title
    modalTitle.textContent = data.title;
    
    // 2. Build HTML Content
    let htmlContent = `
        <p class="text-lg text-gray-700 dark:text-gray-300 mb-6 font-medium">${data.description}</p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    `;

    data.units.forEach(unit => {
        htmlContent += `
            <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md hover:shadow-xl transition duration-300 dark:bg-gray-700">
                <img src="assets/img/${unit.img}" alt="${unit.name}" class="rounded-lg mb-4 w-full h-40 object-cover" loading="lazy">
                <h4 class="text-xl font-bold primary-text mb-3">${unit.name}</h4>
                <ul class="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li class="flex justify-between"><span>Berat Maks.:</span> <strong class="text-red-600 dark:text-red-400">${unit.maxLoad}</strong></li>
                    <li class="flex justify-between"><span>Kubikasi Maks.:</span> <strong>${unit.cbm}</strong></li>
                    <li class="flex justify-between"><span>Dimensi (PxLxT):</span> <strong>${unit.dimensions}</strong></li>
                </ul>
            </div>
        `;
    });

    htmlContent += `</div>`;
    modalBody.innerHTML = htmlContent;

    // 3. Show Modal
    armadaModal.classList.remove('hidden');
    armadaModal.classList.add('flex');
    document.body.classList.add('overflow-hidden'); // Mencegah scrolling body di belakang modal

    // Add listener to close via backdrop click
    armadaModal.addEventListener('click', closeArmadaModalHandler);
};

function hideArmadaModal() {
    armadaModal.classList.add('hidden');
    armadaModal.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
    armadaModal.removeEventListener('click', closeArmadaModalHandler);
}

function closeArmadaModalHandler(event) {
    // Tutup jika klik dilakukan pada backdrop (bukan di dalam konten modal)
    if (event.target === armadaModal) {
        hideArmadaModal();
    }
}

// Event listener untuk tombol close di dalam modal
if (closeArmadaModal) {
    closeArmadaModal.addEventListener('click', hideArmadaModal);
}


// =======================================================
// C. LOGIKA CLIENT-SIDE INCLUDE & INITIALIZATION
// (Diambil dari solusi Netlify sebelumnya)
// =======================================================

async function includeHTML() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');
    
    if (headerPlaceholder) {
        try {
            const response = await fetch('partials/header.html');
            if (response.ok) {
                headerPlaceholder.innerHTML = await response.text();
            } else {
                headerPlaceholder.innerHTML = '<p style="color:red;">Error loading header.</p>';
            }
        } catch (error) {
             console.error('Fetch error loading header:', error);
        }
    }
    
    if (footerPlaceholder) {
        try {
            const response = await fetch('partials/footer.html');
            if (response.ok) {
                footerPlaceholder.innerHTML = await response.text();
            } else {
                footerPlaceholder.innerHTML = '<p style="color:red;">Error loading footer.</p>';
            }
        } catch (error) {
             console.error('Fetch error loading footer:', error);
        }
    }
}


// =======================================================
// D. INIT UTAMA
// =======================================================

document.addEventListener('DOMContentLoaded', async () => {
    
    await includeHTML(); // Panggil Include sebelum inisialisasi menu
    
    const body = document.body;
    const preloader = document.getElementById('preloader');
    
    // 1. Inisialisasi: Header, Menu, dan Theme (Element sudah ada karena Include)
    initializeThemeToggle();
    initializeMobileMenu(); 
    
    // 2. Inisialisasi fungsi lain
    initializeScrollFunctions();
    initializeChatbot(); 
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


// ... (Fungsi initializeMobileMenu, initializeThemeToggle, initializeChatbot, 
// initializeScrollFunctions, initializeScrollAnimation TIDAK BERUBAH dari sebelumnya) ...

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

function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    const isDark = localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

    function setDark(isDark) {
        if (isDark) {
            document.documentElement.classList.add('dark');
            moonIcon.classList.add('hidden');
            sunIcon.classList.remove('hidden');
        } else {
            document.documentElement.classList.remove('dark');
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        }
    }

    // Set initial theme
    setDark(isDark);
    localStorage.theme = isDark ? 'dark' : 'light';

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = localStorage.theme;
            if (currentTheme === 'dark') {
                localStorage.theme = 'light';
                setDark(false);
            } else {
                localStorage.theme = 'dark';
                setDark(true);
            }
        });
    }
}

function initializeChatbot() {
    const chatButton = document.getElementById('gemini-chatbot-button');
    const chatModal = document.getElementById('gemini-chat-modal');
    const closeButton = document.getElementById('close-chat-button');
    
    if (chatButton && chatModal && closeButton) {
        
        chatModal.classList.add('hidden'); 

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

function initializeScrollFunctions() {
    const scrollUp = document.getElementById('scroll-up');
    const scrollDown = document.getElementById('scroll-down');
    
    const toggleScrollButtons = () => {
        if (!scrollUp || !scrollDown) return;

        const scrollY = window.scrollY;
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollY / totalHeight) * 100;

        // Tampilkan Up jika sudah scroll lebih dari 20%
        if (scrollPercent > 20) {
            scrollUp.classList.remove('opacity-0', 'pointer-events-none');
        } else {
            scrollUp.classList.add('opacity-0', 'pointer-events-none');
        }

        // Sembunyikan Down jika sudah di bawah atau mendekati bawah
        if (scrollPercent > 90) {
            scrollDown.classList.add('opacity-0', 'pointer-events-none');
        } else {
            scrollDown.classList.remove('opacity-0', 'pointer-events-none');
        }
    };

    window.addEventListener('scroll', toggleScrollButtons);
    
    // Initial check
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
