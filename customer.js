// Supabase config
const supabaseUrl = 'https://mrghlcedtafomwnznywf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // dipersingkat
const tableName = 'Data_Barang';

async function cekTarif() {
  const form = document.getElementById('formPengiriman');
  const data = Object.fromEntries(new FormData(form));

  // Hitung volume
  const volume = parseInt(data.panjang_cm) * parseInt(data.lebar_cm) * parseInt(data.tinggi_cm);
  const berat = parseFloat(data.berat_kg);

  // Hitung tarif berdasarkan layanan
  let tarif = 0;

  if (data.layanan === 'Reguler') {
    if (berat <= 50) {
      tarif = 125000;
    } else if (berat <= 70) {
      tarif = 125000 + (berat - 50) * 2200;
    } else if (berat <= 99) {
      tarif = 125000 + (berat - 50) * 2500;
    } else if (berat <= 264) {
      tarif = 1700 * berat;
    } else {
      tarif = 450000; // Carter
    }
  } else if (data.layanan === 'Prioritas') {
    tarif = 450000; // Langsung carter
  }

  // Komisi referral
  if (data.referral === 'Ya') {
    let komisi = tarif * 0.05;
    if (komisi > 50000) komisi = 50000;
    tarif -= komisi;
  }

  // Tampilkan tombol submit
  document.getElementById('submitBtn').classList.remove('hidden');

  // Simpan data global
  window.globalData = {
    ...data,
    volume_cm3: volume,
    tarif_pengiriman: Math.round(tarif),
    status_kirim: 'pending'
  };

  alert(`📦 Tarif Pengiriman\n\nVolume: ${volume} cm³\nTarif: Rp ${tarif.toFixed(0)}\n\nKlik tombol 'Customer Setuju & Kirim' jika setuju.`);
}

async function submitForm() {
  const nomor = generateSuratJalan();
  const tanggal = new Date().toISOString().split('T')[0];

  const finalData = {
    nomor_surat_jalan: nomor,
    tanggal_masuk: tanggal,
    ...window.globalData,
    biaya_bbm: 0,
    biaya_driver: 0,
    biaya_sewa_armada: 0,
    profit_kotor: window.globalData.tarif_pengiriman
  };

  const { data, error } = await fetch(`${supabaseUrl}/rest/v1/${tableName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      Prefer: 'return=minimal'
    },
    body: JSON.stringify(finalData)
  }).then(res => res.json());

  if (error) {
    alert('❌ Gagal kirim data. Coba lagi!');
    console.error(error);
  } else {
    alert('✅ Data berhasil dikirim ke Supabase!');
    document.getElementById('formPengiriman').reset();
    document.getElementById('submitBtn').classList.add('hidden');
  }
}

function generateSuratJalan() {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, '0');
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const yy = String(now.getFullYear()).slice(2);
  const jam = now.getHours().toString().padStart(2, '0') + now.getMinutes().toString().padStart(2, '0');
  return `LK/SJ/${jam}/${dd}${mm}${yy}`;
}
