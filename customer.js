// customer.js (dengan console.log lengkap untuk debug)

const supabaseUrl = 'https://mrghlcedtafomwnznywf.supabase.co'; const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...vCLC9w8sT0-4uMLFt9c-3BsFeLVco68ajtsu2ZQUiWs'; const tableName = 'Data_Barang';

// Generate Nomor Surat Jalan async function generateSuratJalan() { const today = new Date(); const dateStr = today.toLocaleDateString('id-ID').split('/').join('-');

try { const res = await fetch(${supabaseUrl}/rest/v1/${tableName}?select=nomor_surat_jalan, { headers: { apikey: supabaseKey, Authorization: Bearer ${supabaseKey} } }); const data = await res.json(); const nextNum = data.length + 1; const padded = String(nextNum).padStart(4, '0'); const nomor = SJ-${dateStr}-${padded}; console.log('Nomor Surat Jalan:', nomor); return nomor; } catch (err) { console.error('Gagal generate nomor surat jalan:', err); return 'ERROR'; } }

function hitungTarif(berat, layanan) { berat = parseFloat(berat); if (layanan === 'Prioritas') return 450000; if (berat <= 50) return 125000; else if (berat <= 70) return 125000 + (berat - 50) * 2200; else if (berat < 100) return 125000 + (berat - 50) * 2500; else if (berat <= 264) return berat * 1700; else return 450000; }

// TOMBOL CEK TARIF async function cekTarif() { console.log('Cek Tarif diklik'); const form = document.getElementById('formPengiriman'); const formData = new FormData(form);

const panjang = parseFloat(formData.get('panjang_cm')); const lebar = parseFloat(formData.get('lebar_cm')); const tinggi = parseFloat(formData.get('tinggi_cm')); const berat = parseFloat(formData.get('berat_kg')); const layanan = formData.get('layanan');

const volume = panjang * lebar * tinggi; const tarif = hitungTarif(berat, layanan);

console.log('Berat:', berat); console.log('Volume:', volume); console.log('Tarif:', tarif);

const popupContent =  <div> <p><strong>Nama:</strong> ${formData.get('nama_customer')}</p> <p><strong>No. HP:</strong> ${formData.get('nomor_hp_customer')}</p> <p><strong>Asal:</strong> ${formData.get('asal_kirim')}</p> <p><strong>Tujuan:</strong> ${formData.get('tujuan_kirim')}</p> <p><strong>Barang:</strong> ${formData.get('nama_barang')}</p> <p><strong>Berat:</strong> ${berat} kg</p> <p><strong>Volume:</strong> ${volume} cm³</p> <p><strong>Layanan:</strong> ${layanan}</p> <p class="mt-2 font-bold text-red-600">Total Tarif: Rp ${tarif.toLocaleString('id-ID')}</p> </div>;

document.getElementById('popupContent').innerHTML = popupContent; document.getElementById('popupTarif').showModal(); }

function tutupPopup() { console.log('Popup ditutup, tombol Setuju muncul'); document.getElementById('btnSetuju').classList.remove('hidden'); }

async function submitForm() { console.log('Submit Form diklik'); const form = document.getElementById('formPengiriman'); const formData = new FormData(form);

const nomorSurat = await generateSuratJalan(); const tanggalMasuk = new Date().toISOString();

const panjang = parseFloat(formData.get('panjang_cm')); const lebar = parseFloat(formData.get('lebar_cm')); const tinggi = parseFloat(formData.get('tinggi_cm')); const volume = panjang * lebar * tinggi; const berat = parseFloat(formData.get('berat_kg')); const layanan = formData.get('layanan'); const tarif = hitungTarif(berat, layanan);

const dataToSend = { nomor_surat_jalan: nomorSurat, tanggal_masuk: tanggalMasuk, nama_customer: formData.get('nama_customer'), nomor_hp_customer: formData.get('nomor_hp_customer'), asal_kirim: formData.get('asal_kirim'), tujuan_kirim: formData.get('tujuan_kirim'), nama_barang: formData.get('nama_barang'), berat_kg: berat, jumlah_koli: parseInt(formData.get('jumlah_koli')), panjang_cm: panjang, lebar_cm: lebar, tinggi_cm: tinggi, volume_cm3: volume, jenis_armada: formData.get('jenis_armada'), layanan: layanan, referral: formData.get('referral'), nama_petugas: formData.get('nama_petugas'), tarif_pengiriman: tarif, biaya_bbm: 0, biaya_driver: 0, biaya_sewa_armada: 0, profit_kotor: tarif, status_kirim: 'pending' };

console.log('Data akan dikirim:', dataToSend);

try { const res = await fetch(${supabaseUrl}/rest/v1/${tableName}, { method: 'POST', headers: { apikey: supabaseKey, Authorization: Bearer ${supabaseKey}, 'Content-Type': 'application/json' }, body: JSON.stringify(dataToSend) }); const result = await res.json(); console.log('Response Supabase:', result); alert('✅ Data berhasil dikirim!'); window.location.reload(); } catch (err) { console.error('Gagal kirim ke Supabase:', err); alert('❌ Gagal kirim data'); } }

