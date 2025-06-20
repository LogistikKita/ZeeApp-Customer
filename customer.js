// === KONFIGURASI SUPABASE ===
const supabaseUrl = 'https://mrghlcedtafomwnznywf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // pastikan diganti jika disingkat
const tableName = 'Data_Barang';

// === FUNGSI HITUNG TARIF ===
function hitungTarif(berat, layanan) {
  berat = parseFloat(berat);
  if (layanan === 'Prioritas') return 450000;
  if (berat <= 50) return 125000;
  else if (berat <= 70) return 125000 + (berat - 50) * 2200;
  else if (berat < 100) return 125000 + (berat - 50) * 2500;
  else if (berat <= 264) return berat * 1700;
  else return 450000;
}

// === FUNGSI GENERATE NOMOR SURAT ===
async function generateSuratJalan() {
  const today = new Date();
  const dateStr = today.toLocaleDateString('id-ID').split('/').join('-');

  const { data } = await fetch(`${supabaseUrl}/rest/v1/${tableName}?select=nomor_surat_jalan`, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`
    }
  }).then(res => res.json());

  const nextNum = data ? data.length + 1 : 1;
  const padded = String(nextNum).padStart(4, '0');
  return `SJ-${dateStr}-${padded}`;
}

// === FUNGSI CEK TARIF (MENAMPILKAN POPUP) ===
function cekTarif() {
  const form = document.getElementById('formPengiriman');
  const formData = new FormData(form);

  const berat = parseFloat(formData.get('berat_kg'));
  const panjang = parseFloat(formData.get('panjang_cm'));
  const lebar = parseFloat(formData.get('lebar_cm'));
  const tinggi = parseFloat(formData.get('tinggi_cm'));
  const volume = panjang * lebar * tinggi;
  const layanan = formData.get('layanan');
  const tarif = hitungTarif(berat, layanan);

  const preview = `
    <div>
      <p><strong>Nama:</strong> ${formData.get('nama_customer')}</p>
      <p><strong>No. HP:</strong> ${formData.get('nomor_hp_customer')}</p>
      <p><strong>Asal:</strong> ${formData.get('asal_kirim')}</p>
      <p><strong>Tujuan:</strong> ${formData.get('tujuan_kirim')}</p>
      <p><strong>Barang:</strong> ${formData.get('nama_barang')}</p>
      <p><strong>Berat:</strong> ${berat} kg</p>
      <p><strong>Volume:</strong> ${volume} cm³</p>
      <p><strong>Layanan:</strong> ${layanan}</p>
      <hr class="my-2" />
      <p class="text-lg"><strong>Total Tarif:</strong> Rp ${tarif.toLocaleString('id-ID')}</p>
    </div>
  `;

  document.getElementById('popupContent').innerHTML = preview;
  document.getElementById('popupTarif').showModal();
}

// === TOMBOL OK PADA POPUP ===
function tutupPopup() {
  document.getElementById('popupTarif').close();
  document.getElementById('btnSetuju').classList.remove('hidden');
}

// === FUNGSI KIRIM DATA KE SUPABASE ===
async function submitForm() {
  const form = document.getElementById('formPengiriman');
  const formData = new FormData(form);

  const nomorSurat = await generateSuratJalan();
  const tanggalMasuk = new Date().toISOString();

  const berat = parseFloat(formData.get('berat_kg'));
  const panjang = parseFloat(formData.get('panjang_cm'));
  const lebar = parseFloat(formData.get('lebar_cm'));
  const tinggi = parseFloat(formData.get('tinggi_cm'));
  const volume = panjang * lebar * tinggi;
  const layanan = formData.get('layanan');
  const tarif = hitungTarif(berat, layanan);

  const dataToSend = {
    nomor_surat_jalan: nomorSurat,
    tanggal_masuk: tanggalMasuk,
    nama_customer: formData.get('nama_customer'),
    nomor_hp_customer: formData.get('nomor_hp_customer'),
    asal_kirim: formData.get('asal_kirim'),
    tujuan_kirim: formData.get('tujuan_kirim'),
    nama_barang: formData.get('nama_barang'),
    berat_kg: berat,
    jumlah_koli: parseInt(formData.get('jumlah_koli')),
    panjang_cm: panjang,
    lebar_cm: lebar,
    tinggi_cm: tinggi,
    volume_cm3: volume,
    jenis_armada: formData.get('jenis_armada'),
    layanan: layanan,
    referral: formData.get('referral'),
    nama_petugas: formData.get('nama_petugas'),
    tarif_pengiriman: tarif,
    biaya_bbm: 0,
    biaya_driver: 0,
    biaya_sewa_armada: 0,
    profit_kotor: tarif,
    status_kirim: 'pending'
  };

  const res = await fetch(`${supabaseUrl}/rest/v1/${tableName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`
    },
    body: JSON.stringify(dataToSend)
  });

  if (res.ok) {
    alert('✅ Data berhasil dikirim!');
    window.location.reload();
  } else {
    alert('❌ Gagal mengirim data.');
  }
}
