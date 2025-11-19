// assets/js/armada.js

// Pastikan file ini hanya dimuat di armada.html

// =======================================================
// A. DATA ARMADA (Statis)
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
// B. LOGIKA MODAL ARMADA (Spesifik)
// =======================================================

const armadaModal = document.getElementById('armada-modal');
const modalTitle = document.getElementById('modal-category-title');
const modalBody = document.getElementById('modal-body-details');
const closeArmadaModal = document.getElementById('close-armada-modal');

/**
 * Menampilkan detail armada dalam modal berdasarkan ID kategori.
 */
window.showArmadaDetail = function(categoryId) {
    const data = ARMADA_DATA[categoryId];
    if (!data) return;

    modalTitle.textContent = data.title;
    
    // Membangun konten HTML (Menggunakan kelas CSS global yang sudah didefinisikan)
    let htmlContent = `
        <p class="text-lg text-[var(--color-text-secondary)] mb-6 font-medium">${data.description}</p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    `;

    data.units.forEach(unit => {
        htmlContent += `
            <div class="p-4 border border-[var(--color-bg-light)] rounded-lg shadow-md transition duration-300 bg-[var(--color-light)] dark:bg-gray-700">
                <img src="assets/img/${unit.img}" alt="${unit.name}" class="rounded-lg mb-4 w-full h-40 object-cover" loading="lazy">
                <h4 class="text-xl font-bold primary-text mb-3">${unit.name}</h4>
                <ul class="space-y-1 text-sm text-[var(--color-text-secondary)]">
                    <li class="flex justify-between"><span>Berat Maks.:</span> <strong class="primary-text">${unit.maxLoad}</strong></li>
                    <li class="flex justify-between"><span>Kubikasi Maks.:</span> <strong>${unit.cbm}</strong></li>
                    <li class="flex justify-between"><span>Dimensi (PxLxT):</span> <strong>${unit.dimensions}</strong></li>
                </ul>
            </div>
        `;
    });

    htmlContent += `</div>`;
    modalBody.innerHTML = htmlContent;

    // Tampilkan Modal
    armadaModal.classList.remove('hidden');
    armadaModal.classList.add('flex');
    document.body.classList.add('overflow-hidden'); // Mencegah scroll pada body

    armadaModal.addEventListener('click', closeArmadaModalHandler);
};

function hideArmadaModal() {
    armadaModal.classList.add('hidden');
    armadaModal.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
    armadaModal.removeEventListener('click', closeArmadaModalHandler);
}

function closeArmadaModalHandler(event) {
    if (event.target === armadaModal) {
        hideArmadaModal();
    }
}

// Tambahkan event listener saat file ini dimuat (hanya di armada.html)
document.addEventListener('DOMContentLoaded', () => {
    if (closeArmadaModal) {
        closeArmadaModal.addEventListener('click', hideArmadaModal);
    }
});