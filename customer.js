// customer.js

// Format tanggal & jam sekarang function getCurrentDateTime() { const now = new Date(); const date = now.toISOString().split('T')[0]; const time = now.toTimeString().split(' ')[0]; return { date, time }; }

// Format nomor surat jalan async function generateSuratJalan() { const today = new Date(); const tanggal = today.toLocaleDateString('id-ID').replaceAll('/', '-'); const { data, error } = await supabase.from('Data_Barang').select('nomor_surat_jalan', { count: 'exact' }); const urutan = (data?.length || 0) + 1; return SJ-${tanggal}-${String(urutan).padStart(4, '0')}; }

// Hitung volume function hitungVolume(p, l, t) { return p * l * t; }

// Hitung tarif otomatis function hitungTarif(berat, layanan) { if (layanan === 'Prioritas') return 450000;

if (berat <= 50) return 125000; if (berat <= 70) return 125000 + (berat - 50) * 2200; if (berat <= 99) return 125000 + (berat - 50) * 2500; if (berat <= 264) return berat * 1700;

return 450000; // Carter }

// Tampilkan ringkasan sebelum submit async function cekTarif() { const form = document.forms['formPengiriman']; const berat = parseFloat(form['berat_kg'].value); const panjang = parseInt(form['panjang_cm'].value); const lebar = parseInt(form['lebar_cm'].value); const tinggi = parseInt(form['tinggi_cm'].value); const volume = hitungVolume(panjang, lebar, tinggi); const layanan = form['layanan'].value; const tarif = hitungTarif(berat, layanan);

// Isi konten ringkasan document.getElementById('ringkasanKonten').innerHTML = <p><strong>Nama:</strong> ${form['nama_customer'].value}</p> <p><strong>Nomor HP:</strong> ${form['nomor_hp_customer'].value}</p> <p><strong>Asal:</strong> ${form['asal_kirim'].value}</p> <p><strong>Tujuan:</strong> ${form['tujuan_kirim'].value}</p> <p><strong>Barang:</strong> ${form['nama_barang'].value}</p> <p><strong>Berat:</strong> ${berat} kg</p> <p><strong>Volume:</strong> ${volume} cm³</p> <p><strong>Layanan:</strong> ${layanan}</p> <p><strong>Tarif:</strong> Rp${tarif.toLocaleString('id-ID')}</p>;

document.getElementById('modalRingkasan').classList.remove('hidden'); }

// Tutup popup modal function closeModal() { document.getElementById('modalRingkasan').classList.add('hidden'); }

// Submit ke Supabase async function submitForm() { const form = document.forms['formPengiriman']; const { date, time } = getCurrentDateTime(); const nomorSurat = await generateSuratJalan(); const panjang = parseInt(form['panjang_cm'].value); const lebar = parseInt(form['lebar_cm'].value); const tinggi = parseInt(form['tinggi_cm'].value); const volume = hitungVolume(panjang, lebar, tinggi); const berat = parseFloat(form['berat_kg'].value); const layanan = form['layanan'].value; const tarif = hitungTarif(berat, layanan);

const { error } = await supabase.from('Data_Barang').insert([ { nomor_surat_jalan: nomorSurat, tanggal_masuk: date, nama_customer: form['nama_customer'].value, nomor_hp_customer: form['nomor_hp_customer'].value, asal_kirim: form['asal_kirim'].value, tujuan_kirim: form['tujuan_kirim'].value, nama_barang: form['nama_barang'].value, berat_kg: berat, jumlah_koli: parseInt(form['jumlah_koli'].value), panjang_cm: panjang, lebar_cm: lebar, tinggi_cm: tinggi, volume_cm3: volume, jenis_armada: form['jenis_armada'].value, layanan, referral: form['referral'].value, nama_petugas: form['nama_petugas'].value, tarif_pengiriman: tarif, biaya_bbm: 0, biaya_driver: 0, biaya_sewa_armada: 0, profit_kotor: tarif, status_kirim: 'pending' } ]);

if (error) { alert('Gagal kirim data: ' + error.message); } else { alert('Data berhasil dikirim!'); form.reset(); closeModal(); } }

