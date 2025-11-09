document.addEventListener('DOMContentLoaded', () => {
    
    // --- DATA ARMADA STATIS (Meniru Supabase armada_rates) ---
    const ARMADA_RATES = {
        'pickup6': {
            sewa_rate: 100000, driver_rate: 100000, period: 6, max_weight: 1300, 
            fuel_consumption_km_l: 9, fuel_price_per_l: 10000, 
            meal_driver_rate: 20000, meal_tkbm_rate: 15000, 
            ppn_rate: 0.011, pph_rate: 0.02, margin_rate: 0.20,
        },
        'pickup12': {
            sewa_rate: 150000, driver_rate: 150000, period: 12, max_weight: 1300, 
            fuel_consumption_km_l: 9, fuel_price_per_l: 10000, 
            meal_driver_rate: 20000, meal_tkbm_rate: 15000, 
            ppn_rate: 0.011, pph_rate: 0.02, margin_rate: 0.20
        },
        'pickup24': {
            sewa_rate: 200000, driver_rate: 180000, period: 24, max_weight: 1300, 
            fuel_consumption_km_l: 9, fuel_price_per_l: 10000, 
            meal_driver_rate: 20000, meal_tkbm_rate: 15000, 
            ppn_rate: 0.011, pph_rate: 0.02, margin_rate: 0.20
        }
    };

    // FUNGSI HELPER UNTUK FORMAT RUPIAH
    const formatter = new Intl.NumberFormat('id-ID', { 
        style: 'currency', currency: 'IDR', minimumFractionDigits: 0 
    });

    // FUNGSI TAMBAH/HAPUS LOKASI
    let muatCount = 1;
    let bongkarCount = 1;
    
    window.addLocation = function(type) {
        let containerId = (type === 'Muat') ? 'locationMuatContainer' : 'locationBongkarContainer';
        let container = document.getElementById(containerId);
        let currentCount = (type === 'Muat') ? muatCount : bongkarCount;

        if (currentCount >= 3) {
            alert(`Maksimal 3 Lokasi ${type}.`);
            return;
        }

        let newCount = currentCount + 1;
        const newRow = document.createElement('div');
        newRow.className = `row g-3 mb-2 location-${type.toLowerCase()}-item`;
        newRow.innerHTML = `
            <div class="col-md-8">
                <input type="text" class="form-control location-${type.toLowerCase()}-name" placeholder="Nama Perusahaan/Alamat ${type} ${newCount}" required>
            </div>
            <div class="col-md-3">
                <input type="number" class="form-control location-${type.toLowerCase()}-distance" placeholder="Jarak (Km) ke Titik Selanjutnya" min="1" required>
            </div>
            <div class="col-md-1 d-flex align-items-center">
                <button type="button" class="btn btn-sm btn-outline-danger" onclick="removeLocation(this, '${type}')"><i class="fas fa-minus"></i></button>
            </div>
        `;
        container.appendChild(newRow);

        if (type === 'Muat') {
            muatCount = newCount;
        } else {
            bongkarCount = newCount;
        }
    }

    window.removeLocation = function(button, type) {
        let row = button.closest('.row');
        row.remove();
        if (type === 'Muat') {
            muatCount--;
        } else {
            bongkarCount--;
        }
    }

    // --- LOGIKA PERHITUNGAN UTAMA ---
    document.getElementById('deliveryForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const selectedArmadaKey = document.getElementById('armadaSelect').value;
        if (!selectedArmadaKey || !ARMADA_RATES[selectedArmadaKey]) {
            alert("Mohon pilih jenis Armada yang valid.");
            return;
        }

        const rates = ARMADA_RATES[selectedArmadaKey];
        const weight = parseFloat(document.getElementById('totalWeight').value);
        const length = parseFloat(document.getElementById('length').value);
        const width = parseFloat(document.getElementById('width').value);
        const height = parseFloat(document.getElementById('height').value);
        const distanceStart = parseFloat(document.getElementById('distanceStart').value);
        const tkbmCost = parseFloat(document.getElementById('tkbmCostSelect').value);
        
        // --- 1. Kumpulkan Jarak Total ---
        let totalDistance = distanceStart;
        
        document.querySelectorAll('.location-muat-distance, .location-bongkar-distance').forEach(input => {
            totalDistance += parseFloat(input.value) || 0;
        });
        
        // --- 2. Berat Tertagih ---
        // Menggunakan 4000 untuk hitungan darat/laut
        const volumeWeight = (length * width * height) / 4000;
        const chargeableWeight = Math.max(weight, volumeWeight);
        
        // Validasi Kapasitas Armada
        if (chargeableWeight > rates.max_weight) {
             alert(`PERINGATAN: Berat Tertagih (${chargeableWeight.toFixed(1)} Kg) melebihi kapasitas Armada Pickup (${rates.max_weight} Kg). Pilih armada yang lebih besar.`);
             // Lanjutkan perhitungan untuk menampilkan biaya, tapi beri peringatan
        }

        // --- 3. Waktu Kerja Total ---
        const avgSpeed = 50; // Asumsi 50 km/jam
        const drivingTime = totalDistance / avgSpeed;
        const loadingTime = 1.0; // 1 jam bongkar-muat
        
        // Waktu Istirahat: 1 jam setiap 4 jam mengemudi
        const restTime = Math.floor(drivingTime / 4) * 1.0; 
        
        const totalWorkingTime = drivingTime + loadingTime + restTime;

        // --- 4. Perhitungan Biaya Langsung (COGS) ---
        
        // A. Biaya Tetap
        const costSewa = rates.sewa_rate;
        const costDriver = rates.driver_rate;
        // Uang makan driver: Asumsi 1x jika total waktu kerja <= 8 jam, 2x jika > 8 jam
        const costDriverMeal = (totalWorkingTime <= 8) ? rates.meal_driver_rate : rates.meal_driver_rate * 2; 
        
        // B. Biaya BBM
        const litersNeeded = totalDistance / rates.fuel_consumption_km_l;
        const costFuel = litersNeeded * rates.fuel_price_per_l;

        // C. Biaya TKBM
        let costTkbm = 0;
        if (tkbmCost > 0) {
            const numTkbm = 2; // Asumsi 2 orang TKBM
            // Uang makan TKBM
            const costTkbmMeal = (totalWorkingTime <= 8) ? rates.meal_tkbm_rate : rates.meal_tkbm_rate * 2;
            costTkbm = (tkbmCost + costTkbmMeal) * numTkbm;
        }

        const totalCogs = costSewa + costDriver + costDriverMeal + costFuel + costTkbm;

        // --- 5. Perhitungan Harga Jual Final ---
        const costMargin = totalCogs * rates.margin_rate;
        const grossPriceBeforeTax = totalCogs + costMargin;
        
        const costPpn = grossPriceBeforeTax * rates.ppn_rate;
        const costPph = grossPriceBeforeTax * rates.pph_rate;
        
        const finalPrice = grossPriceBeforeTax + costPpn + costPph;
        
        // --- 6. Tampilkan Hasil ---
        document.getElementById('outputDistance').textContent = `${totalDistance.toFixed(0)} Km`;
        document.getElementById('outputTime').textContent = `${totalWorkingTime.toFixed(2)} Jam (${drivingTime.toFixed(2)} Jam Mengemudi + ${loadingTime.toFixed(2)} Jam Bongkar Muat + ${restTime.toFixed(2)} Jam Istirahat)`;
        document.getElementById('outputChargeableWeight').textContent = `${chargeableWeight.toFixed(1)} Kg (Volume: ${volumeWeight.toFixed(1)} Kg)`;
        document.getElementById('outputCogs').textContent = formatter.format(totalCogs);
        
        document.getElementById('outputMargin').textContent = `${formatter.format(costMargin)} (${(rates.margin_rate * 100)}%)`;
        document.getElementById('outputGrossPrice').textContent = formatter.format(grossPriceBeforeTax);
        document.getElementById('outputFinalPrice').textContent = formatter.format(finalPrice);
        
        document.getElementById('resultArea').classList.remove('d-none');
        document.getElementById('resultArea').scrollIntoView({ behavior: 'smooth' });
    });
});
