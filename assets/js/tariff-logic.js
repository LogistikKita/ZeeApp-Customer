document.addEventListener('DOMContentLoaded', () => {
    
    // --- DATA ARMADA STATIS ---
    const ARMADA_RATES = {
        'pickup6': {
            name: 'Pickup (6 Jam)', sewa_rate: 100000, driver_rate: 100000, period: 6, max_weight: 1300, 
            fuel_consumption_km_l: 9, fuel_price_per_l: 10000, 
            meal_driver_rate: 20000, meal_tkbm_rate: 15000, 
            ppn_rate: 0.011, pph_rate: 0.02, margin_rate: 0.20, specs: 'Max Berat: 1.3 Ton | Volume: ~2.5 CBM',
        },
        'pickup12': {
            name: 'Pickup (12 Jam)', sewa_rate: 150000, driver_rate: 150000, period: 12, max_weight: 1300, 
            fuel_consumption_km_l: 9, fuel_price_per_l: 10000, 
            meal_driver_rate: 20000, meal_tkbm_rate: 15000, 
            ppn_rate: 0.011, pph_rate: 0.02, margin_rate: 0.20, specs: 'Max Berat: 1.3 Ton | Volume: ~2.5 CBM',
        },
        'pickup24': {
            name: 'Pickup (24 Jam)', sewa_rate: 200000, driver_rate: 180000, period: 24, max_weight: 1300, 
            fuel_consumption_km_l: 9, fuel_price_per_l: 10000, 
            meal_driver_rate: 20000, meal_tkbm_rate: 15000, 
            ppn_rate: 0.011, pph_rate: 0.02, margin_rate: 0.20, specs: 'Max Berat: 1.3 Ton | Volume: ~2.5 CBM',
        }
    };

    // FUNGSI HELPER UNTUK FORMAT RUPIAH
    const formatter = new Intl.NumberFormat('id-ID', { 
        style: 'currency', currency: 'IDR', minimumFractionDigits: 0 
    });

    // VARIABEL GLOBAL UNTUK HITUNGAN LOKASI DINAMIS
    let muatCount = 1;
    let bongkarCount = 1;

    // ----------------------------------------------------
    // 1. FITUR DINAMIS: ARMADA SPEC DISPLAY
    // ----------------------------------------------------
    document.getElementById('armadaSelect').addEventListener('change', function() {
        const selectedArmadaKey = this.value;
        const rates = ARMADA_RATES[selectedArmadaKey];
        const specsElement = document.getElementById('armadaSpecs');

        if (rates) {
            specsElement.innerHTML = `
                <span class="text-danger fw-bold">Armada Aktif: ${rates.name}</span><br>
                <span class="small text-muted">${rates.specs} | Maks. Waktu Kerja: ${rates.period} Jam</span>
            `;
        } else {
            specsElement.textContent = '';
        }
    });
    
    // ----------------------------------------------------
    // 2. FITUR DINAMIS: ADD/REMOVE LOCATION
    // ----------------------------------------------------
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
                <input type="text" class="form-control location-${type.toLowerCase()}-name" placeholder="Alamat ${type} ${newCount}" required>
            </div>
            <div class="col-md-3">
                <input type="number" class="form-control location-${type.toLowerCase()}-distance" placeholder="Jarak (Km) Next" min="1" required>
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
        
        // Update the counter
        if (type === 'Muat') {
            muatCount--;
            // Perbarui placeholder
            document.querySelectorAll('#locationMuatContainer .location-muat-name').forEach((input, index) => {
                 input.placeholder = `Nama Perusahaan/Alamat Muat ${index + 1}`;
            });
        } else {
            bongkarCount--;
            // Perbarui placeholder
             document.querySelectorAll('#locationBongkarContainer .location-bongkar-name').forEach((input, index) => {
                 input.placeholder = `Nama Perusahaan/Alamat Bongkar ${index + 1}`;
            });
        }
    }

    // FUNGSI INTI PERHITUNGAN
    function calculateTariff(rates, totalDistance, chargeableWeight, totalWorkingTime, tkbmCost) {
        const costSewa = rates.sewa_rate;
        const costDriver = rates.driver_rate;
        // Asumsi makan driver 1x jika <= 8 jam, 2x jika > 8 jam
        const costDriverMeal = (totalWorkingTime <= 8) ? rates.meal_driver_rate : rates.meal_driver_rate * 2; 
        
        const litersNeeded = totalDistance / rates.fuel_consumption_km_l;
        const costFuel = litersNeeded * rates.fuel_price_per_l;
        
        let costTkbm = 0;
        let operationalCost = costSewa + costDriver + costDriverMeal + costFuel;
        
        if (tkbmCost > 0) {
            const numTkbm = 2; // Asumsi 2 orang TKBM
            // Asumsi makan tkbm 1x jika <= 8 jam, 2x jika > 8 jam
            const costTkbmMeal = (totalWorkingTime <= 8) ? rates.meal_tkbm_rate : rates.meal_tkbm_rate * 2;
            costTkbm = (tkbmCost + costTkbmMeal) * numTkbm;
        }

        const totalCogs = operationalCost + costTkbm;
        const costMargin = totalCogs * rates.margin_rate;
        const grossPriceBeforeTax = totalCogs + costMargin;
        
        const costPpn = grossPriceBeforeTax * rates.ppn_rate;
        const costPph = grossPriceBeforeTax * rates.pph_rate;
        
        const finalPrice = grossPriceBeforeTax + costPpn + costPph;
        
        return {
            totalCogs, costMargin, grossPriceBeforeTax, costPpn, costPph, finalPrice, costTkbm, operationalCost
        };
    }

    // --- LOGIKA UTAMA SUBMIT FORM ---
    document.getElementById('deliveryForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 1. Ambil Data Form & Validasi
        const selectedArmadaKey = document.getElementById('armadaSelect').value;
        const rates = ARMADA_RATES[selectedArmadaKey];
        
        if (!rates) {
            alert("Mohon pilih jenis Armada terlebih dahulu.");
            return;
        }

        const weight = parseFloat(document.getElementById('totalWeight').value);
        const length = parseFloat(document.getElementById('length').value);
        const width = parseFloat(document.getElementById('width').value);
        const height = parseFloat(document.getElementById('height').value);
        const distanceStart = parseFloat(document.getElementById('distanceStart').value);
        const returnToGarage = document.getElementById('returnToGarageCheck').checked;
        const tkbmCost = parseFloat(document.getElementById('tkbmCostSelect').value);
        
        // 2. Kumpulkan Jarak
        let totalTripDistance = distanceStart;
        document.querySelectorAll('.location-muat-distance, .location-bongkar-distance').forEach(input => {
            totalTripDistance += parseFloat(input.value) || 0;
        });

        if (returnToGarage) {
            // Asumsi jarak kembali ke garasi sama dengan jarak tempuh dari muat terakhir
            // Jarak yang ditambahkan adalah jarak dari bongkar terakhir ke garasi
            // Karena kita hanya menyimpan jarak NEXT, kita asumsikan jarak dari bongkar terakhir ke garasi sama dengan jarak START (Garasi ke Muat 1)
            totalTripDistance += distanceStart; 
        }

        // 3. Berat Tertagih & Validasi Kapasitas
        // CBM (Cubic Meter) = P x L x T / 1.000.000
        // Berat Volume = CBM * 4000 (standard cargo)
        const volumeWeight = (length * width * height) / 4000;
        const chargeableWeight = Math.max(weight, volumeWeight);
        
        if (chargeableWeight > rates.max_weight) {
             alert(`⚠️ PERINGATAN KAPASITAS! Berat Tertagih (${chargeableWeight.toFixed(1)} Kg) melebihi kapasitas Armada ${rates.name} (${rates.max_weight} Kg).`);
        }

        // 4. Waktu Kerja Total
        const avgSpeed = 50; 
        const drivingTime = totalTripDistance / avgSpeed;
        const totalLocations = document.querySelectorAll('.location-muat-item').length + document.querySelectorAll('.location-bongkar-item').length;
        const loadingTime = totalLocations * 0.5; // Asumsi 30 menit per titik
        const restTime = Math.floor(drivingTime / 4) * 1.0; // Asumsi istirahat 1 jam setiap 4 jam mengemudi
        const totalWorkingTime = drivingTime + loadingTime + restTime;

        // 5. Hitung Tarif
        const tariffResults = calculateTariff(rates, totalTripDistance, chargeableWeight, totalWorkingTime, tkbmCost);
        
        // 6. Tampilkan Hasil
        displayFinalResults(tariffResults, totalTripDistance, chargeableWeight, totalWorkingTime);
    });
    
    // FUNGSI TAMPILKAN HASIL AKHIR
    function displayFinalResults(data, totalDistance, chargeableWeight, totalWorkingTime) {
        
        // Update data di area hasil
        document.getElementById('outputDistance').textContent = `${totalDistance.toFixed(0)} Km`;
        document.getElementById('outputTime').textContent = `${totalWorkingTime.toFixed(2)} Jam`;
        document.getElementById('outputChargeableWeight').textContent = `${chargeableWeight.toFixed(1)} Kg`;
        
        document.getElementById('outputCogs').textContent = formatter.format(data.totalCogs);
        document.getElementById('outputOperationalCost').textContent = formatter.format(data.operationalCost);
        document.getElementById('outputTkbmCost').textContent = formatter.format(data.costTkbm);
        
        document.getElementById('outputGrossPrice').textContent = formatter.format(data.grossPriceBeforeTax);
        document.getElementById('outputMargin').textContent = formatter.format(data.costMargin);
        document.getElementById('outputTaxes').textContent = formatter.format(data.costPpn + data.costPph);
        document.getElementById('outputFinalPrice').textContent = formatter.format(data.finalPrice);

        // Tampilkan area hasil dan scroll ke sana
        const resultArea = document.getElementById('resultArea');
        resultArea.classList.remove('d-none');
        resultArea.scrollIntoView({ behavior: 'smooth' });
    }
});
