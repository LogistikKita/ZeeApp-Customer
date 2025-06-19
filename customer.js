// customer.js

// Supabase Config
const supabaseUrl = 'https://mrghlcedtafomwnznywf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // Disingkat demi keamanan
const tableName = 'Data_Barang';

// Generate Nomor Surat Jalan
async function generateSuratJalan() {
  const today = new Date();
  const dateStr = today.toLocaleDateString('id-ID').split('/').join('-');

  const { data, error } = await fetch(`${supabaseUrl}/rest/v1/${tableName}?select=nomor_surat_jalan`, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`
    }
  }).then(res => res.json());

  const nextNum = data ? data.length + 1 : 1;
  const padded = String(nextNum).padStart(4, '0');
  return `SJ-${dateStr}-${padded}`;
}

// Hitung Tarif
function hitungTarif(berat, layanan) {
  berat = parseFloat(berat);
  if (layanan === 'Prioritas') return 450000;

  if (berat <= 50) return 125000;
  else if (berat <= 70) return 125000 + (berat - 50) * 2200;
  else if (berat < 100) return 125000 + (berat - 50) * 2500;
  else if (berat <= 264) return berat * 1700;
  else return 450000; // carter
}

// Tombol Cek Tarif
async function cekTarif() {
  const form = document.getElementById('formPengiriman');
  const formData = new FormData(form);
  
  const berat = formData.get('berat_kg');
  const panjang = parseFloat(formData.get('panjang_cm'));
  const lebar = parseFloat(formData.get('lebar_cm'));
  const tinggi = parseFloat(formData.get('tinggi_cm'));
  const volume = panjang * lebar * tinggi;
  const layanan = formData.get('layanan');

  const tarif = hitungTarif(berat, layanan);

  const popup = `
    <div class="text-left">
      <strong>Data Kiriman</strong><br>
      Nama: ${formData.get('nama_customer')}<br>
      No. HP: ${formData.get('nomor_hp_customer')}<br>
      Asal: ${formData.get('asal_kirim')}<br>
      Tujuan: ${formData.get('tujuan_kirim')}<br>
      Barang: ${formData.get('nama_barang')}<br>
      Berat: ${berat} kg<br>
      Volume: ${volume} cm³<br>
      Layanan: ${layanan}<br>
      <hr class='my-2'>
      <strong>Total Tarif: Rp ${tarif.toLocaleString('id-ID')}</strong>
    </div>
  `;

  // Tampilkan Popup
  const dialog = document.createElement('dialog');
  dialog.classList.add('modal');
  dialog.innerHTML = `
    <form method="dialog" class="modal-box">
      ${popup}
      <div class="modal-action">
        <button class="btn btn-success" onclick="submitForm()">Setuju & Kirim</button>
        <button class="btn" onclick="this.closest('dialog').remove()">Batal</button>
      </div>
    </form>
  `;
  document.body.appendChild(dialog);
  dialog.showModal();
}

// Submit ke Supabase
async function submitForm() {
  const form = document.getElementById('formPengiriman');
  const formData = new FormData(form);

  const nomorSurat = await generateSuratJalan();
  const today = new Date().toISOString();

  const volume = parseFloat(formData.get('panjang_cm')) * parseFloat(formData.get('lebar_cm')) * parseFloat(formData.get('tinggi_cm'));
  const berat = parseFloat(formData.get('berat_kg'));
  const layanan = formData.get('layanan');
  const tarif = hitungTarif(berat, layanan);

  const dataToSend = {
    nomor_surat_jalan: nomorSurat,
    tanggal_masuk: today,
    nama_customer: formData.get('nama_customer'),
    nomor_hp_customer: formData.get('nomor_hp_customer'),
    asal_kirim: formData.get('asal_kirim'),
    tujuan_kirim: formData.get('tujuan_kirim'),
    nama_barang: formData.get('nama_barang'),
    berat_kg: berat,
    jumlah_koli: parseInt(formData.get('jumlah_koli')),
    panjang_cm: parseInt(formData.get('panjang_cm')),
    lebar_cm: parseInt(formData.get('lebar_cm')),
    tinggi_cm: parseInt(formData.get('tinggi_cm')),
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

  const { data, error } = await fetch(`${supabaseUrl}/rest/v1/${tableName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`
    },
    body: JSON.stringify(dataToSend)
  }).then(res => res.json());

  alert('✅ Data berhasil dikirim! Terima kasih.');
  window.location.reload();
}
