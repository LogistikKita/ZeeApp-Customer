// register-mitra.js

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('mitraForm');
    const radioIndividu = document.getElementById('mitraIndividu');
    const radioPerusahaan = document.getElementById('mitraPerusahaan');
    const formIndividu = document.getElementById('formIndividu');
    const formPerusahaan = document.getElementById('formPerusahaan');

    // --- 1. Logika Tampilan Kondisional ---
    function toggleFormVisibility() {
        if (radioIndividu.checked) {
            formIndividu.style.display = 'block';
            formPerusahaan.style.display = 'none';
        } else if (radioPerusahaan.checked) {
            formIndividu.style.display = 'none';
            formPerusahaan.style.display = 'block';
        } else {
            formIndividu.style.display = 'none';
            formPerusahaan.style.display = 'none';
        }
    }

    // Panggil saat halaman dimuat
    toggleFormVisibility(); 
    radioIndividu.addEventListener('change', toggleFormVisibility);
    radioPerusahaan.addEventListener('change', toggleFormVisibility);

    // --- 2. Logika Validasi Formulir ---
    form.addEventListener('submit', function(e) {
        e.preventDefault(); 
        
        const jenisMitra = document.querySelector('input[name="jenis_mitra"]:checked');
        let isValid = true;
        let missingFields = [];

        // Hapus semua kelas error sebelumnya (untuk reset tampilan)
        document.querySelectorAll('.form-group').forEach(group => group.classList.remove('error'));


        // Pastikan jenis mitra sudah dipilih
        if (!jenisMitra) {
            missingFields.push("Jenis Pendaftaran");
            isValid = false;
        }

        // Fungsi bantuan untuk validasi field dan menambahkan kelas error
        const validateField = (elementId, labelText) => {
            const element = document.getElementById(elementId);
            const group = element ? element.closest('.form-group') : null;

            if (element && element.closest('.form-section').style.display === 'block') {
                let isMissing = false;

                if (element.type === 'file') {
                    if (element.files.length === 0) {
                        isMissing = true;
                    }
                } else if (!element.value.trim() || element.value === "") { // Termasuk <select>
                    isMissing = true;
                }

                if (isMissing) {
                    missingFields.push(labelText);
                    if (group) group.classList.add('error'); // Tambahkan kelas error
                    return false;
                }
            }
            return true;
        };
        
        // Validasi untuk Mitra Individu
        if (jenisMitra && jenisMitra.value === 'individu') {
            validateField('namaLengkap', 'Nama Lengkap');
            validateField('noTelpIndividu', 'Nomor Telepon');
            validateField('simUpload', 'Foto SIM'); 
            validateField('ktpUpload', 'Foto KTP');
            validateField('skckUpload', 'SKCK Terbaru');
            validateField('jenisKendaraan', 'Jenis Kendaraan Operasional');
            validateField('platNomor', 'Nomor Plat Kendaraan');
        } 
        
        // Validasi untuk Mitra Perusahaan
        else if (jenisMitra && jenisMitra.value === 'perusahaan') {
            validateField('namaPerusahaan', 'Nama Badan Usaha');
            validateField('npwpUpload', 'NPWP Perusahaan');
            validateField('nibUpload', 'NIB');
            validateField('picNama', 'Nama PIC Operasional');
            validateField('picTelp', 'Nomor Telepon PIC');
            validateField('jumlahArmada', 'Total Jumlah Armada');
        }

        // --- Tampilkan Hasil Validasi ---
        if (missingFields.length > 0) {
            isValid = false;
            let alertMessage = "🚨 Pendaftaran Gagal. Mohon lengkapi data berikut:\n\n";
            alertMessage += missingFields.map(field => ` - ${field}`).join('\n');
            alert(alertMessage);
        }

        // Jika valid, lanjutkan proses (simulasi berhasil)
        if (isValid) {
            alert("✅ Pendaftaran Berhasil! Data Anda telah kami terima dan akan segera divalidasi oleh tim kami. Terima kasih.");
            // Di lingkungan nyata, kirim data ke server di sini
            form.reset();
            toggleFormVisibility(); 
        }
    });
});
