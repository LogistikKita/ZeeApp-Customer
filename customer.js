// Supabase Config
const supabaseUrl = 'https://mrghlcedtafomwnznywf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // disingkat
const tableName = 'Data_Barang';

// Fungsi hitung tarif
function hitungTarif(berat, layanan) {
  berat = parseFloat(berat);
  if (layanan === 'Prioritas') return 450000;

  if (berat <= 50) return 125000;
  else if (berat <= 70) return 125000 + (berat - 50) * 2200;
  else if (berat < 100) return 125000 + (berat - 50) * 2500;
  else if (berat <= 264) return berat * 1700;
  else return 450000;
}

// Tombol Cek Tarif
function cekTarif() {
  console.log("✅ cekTarif() dipanggil");

  const form = document.getElementById('formPengiriman');
  const formData = new FormData(form);

  const berat = parseFloat(formData.get('berat_kg'));
  const panjang = parseFloat(formData.get('panjang_cm'));
  const lebar = parseFloat(formData.get('lebar_cm'));
  const tinggi = parseFloat(formData.get('tinggi_cm'));
  const volume = panjang * lebar * tinggi;
  const layanan = formData.get('layanan');
  const tarif = hitungTarif(berat, layanan);

  console.log("📦 Data form:", {
    nama: formData.get('nama_customer'),
    berat,
    volume,
    layanan,
    tarif
  });

  const popup = `
    <p><strong>Nama:</strong> ${formData.get('nama_customer')}</p>
    <p><strong>No. HP:</strong> ${formData.get('nomor_hp_customer')}</p>
    <p><strong>Asal:</strong> ${formData.get('asal_kirim')}</p>
    <p><strong>Tujuan:</strong> ${formData.get('tujuan_kirim')}</p>
    <p><strong>Barang:</strong> ${formData.get('nama_barang')}</p>
    <p><strong>Berat:</strong> ${berat} kg</p>
    <p><strong>Volume:</strong> ${volume} cm³</p>
    <p><strong>Layanan:</strong> ${layanan}</p>
    <hr class="my-2" />
    <p><strong>Total Tarif:</strong> Rp ${tarif.toLocaleString('id-ID')}</p>
  `;

  const popupDialog = document.getElementById('popupTarif');
  const popupContent = document.getElementById('popupContent');

  if (popupDialog && popupContent) {
    popupContent.innerHTML = popup;
    popupDialog.showModal();
    console.log("✅ Popup berhasil ditampilkan");
  } else {
    console.error("❌ Elemen dialog tidak ditemukan");
  }

  // Simpan data sementara
  window.dataSiapKirim = {
    berat_kg: berat,
    volume_cm3: volume,
    tarif_pengiriman: tarif,
    semuaData: formData
  };
}

// Tutup popup → Tampilkan tombol setuju
function tutupPopup() {
  const btnSetuju = document.getElementById('btnSetuju');
  if (btnSetuju) btnSetuju.classList.remove('hidden');
  console.log("✅ Tombol 'Customer Setuju' ditampilkan");
}

// Submit ke Supabase
async function submitForm() {
  console.log("🚀 Mulai submitForm()");
  const formData = window.dataSiapKirim?.semuaData;
  if (!formData) {
    alert("⚠️ Silakan cek tarif dulu sebelum kirim!");
    return;
  }

  const today = new Date();
  const dateStr = today.toLocaleDateString('id-ID').split('/').join('-');
  const timeStr = today.toTimeString().split(' ')[0];
  const timestamp = today.toISOString();

  // Generate nomor surat jalan
  const { data: allRows } = await fetch(`${supabaseUrl}/rest/v1/${tableName}?select=nomor_surat_jalan`, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`
    }
  }).then(res => res.json());

  const nomorUrut = allRows ? allRows.length + 1 : 1;
  const nomorSurat = `SJ-${dateStr}-${String(nomorUrut).padStart(4, '0')}`;

  const dataToSend = {
    nomor_surat_jalan: nomorSurat,
    tanggal_masuk: timestamp,
    nama_customer: formData.get('nama_customer'),
    nomor_hp_customer: formData.get('nomor_hp_customer'),
    asal_kirim: formData.get('asal_kirim'),
    tujuan_kirim: formData.get('tujuan_kirim'),
    nama_barang: formData.get('nama_barang'),
    berat_kg: parseFloat(formData.get('berat_kg')),
    jumlah_koli: parseInt(formData.get('jumlah_koli')),
    panjang_cm: parseInt(formData.get('panjang_cm')),
    lebar_cm: parseInt(formData.get('lebar_cm')),
    tinggi_cm: parseInt(formData.get('tinggi_cm')),
    volume_cm3: window.dataSiapKirim.volume_cm3,
    jenis_armada: formData.get('jenis_armada'),
    layanan: formData.get('layanan'),
    referral: formData.get('referral'),
    nama_petugas: formData.get('nama_petugas'),
    tarif_pengiriman: window.dataSiapKirim.tarif_pengiriman,
    biaya_bbm: 0,
    biaya_driver: 0,
    biaya_sewa_armada: 0,
    profit_kotor: window.dataSiapKirim.tarif_pengiriman,
    status_kirim: 'pending'
  };

  console.log("📦 Data yang dikirim:", dataToSend);

  const { data, error } = await fetch(`${supabaseUrl}/rest/v1/${tableName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`
    },
    body: JSON.stringify(dataToSend)
  }).then(res => res.json());

  if (error) {
    console.error("❌ Gagal kirim ke Supabase:", error);
    alert("❌ Gagal kirim data!");
  } else {
    alert("✅ Data berhasil dikirim!");
    window.location.reload();
  }
}
