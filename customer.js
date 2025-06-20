// customer.js - Versi Lengkap

// Konfigurasi Supabase
const supabaseUrl = 'https://mrghlcedtafomwnznywf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // disingkat demi keamanan
const tableName = 'Data_Barang';

// Fungsi untuk generate nomor surat jalan otomatis
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

// Fungsi hitung tarif berdasarkan berat dan layanan
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
async function cekTarif() {
  const form = document.getElementById('formPengiriman');
  const formData = new FormData(form);

  const nama = formData.get('nama_customer');
  const hp = formData.get('nomor_hp_customer');
  const asal = formData.get('asal_kirim');
  const tujuan = formData.get('tujuan_kirim');
  const barang = formData.get('nama_barang');
  const berat = parseFloat(formData.get('berat_kg'));
  const panjang = parseFloat(formData.get('panjang_cm'));
  const lebar = parseFloat(formData.get('lebar_cm'));
  const tinggi = parseFloat(formData.get('tinggi_cm'));
  const layanan = formData.get('layanan');

  const volume = panjang * lebar * tinggi;
  const tarif = hitungTarif(berat, layanan);

  const dialog = document.createElement('dialog');
  dialog.classList.add('modal');
  dialog.innerHTML = `
    <form method="dialog" class="modal-box text-left">
      <h3 class="font-bold text-lg mb-2 text-red-600">\ud83d\udce6 Konfirmasi Data Pengiriman</h3>
      <p><strong>Nama:</strong> ${nama}</p>
      <p><strong>No. HP:</strong> ${hp}</p>
      <p><strong>Asal:</strong> ${asal}</p>
      <p><strong>Tujuan:</strong> ${tujuan}</p>
      <p><strong>Barang:</strong> ${barang}</p>
      <p><strong>Berat:</strong> ${berat} kg</p>
      <p><strong>Volume:</strong> ${volume.toLocaleString('id-ID')} cm\u00b3</p>
      <p><strong>Layanan:</strong> ${layanan}</p>
      <hr class="my-3" />
      <p class="text-lg font-semibold text-green-600">Total Tarif: Rp ${tarif.toLocaleString('id-ID')}</p>

      <div class="modal-action">
        <button class="btn btn-success" onclick="submitForm()">\u2705 Setuju & Kirim</button>
        <button class="btn" onclick="this.closest('dialog').remove()">\u274c Batal</button>
      </div>
    </form>
  `;

  document.body.appendChild(dialog);
  dialog.showModal();
}

// Fungsi untuk submit data ke Supabase
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
