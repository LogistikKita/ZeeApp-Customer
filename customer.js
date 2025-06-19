// customer.js

async function cekTarif() { const form = document.getElementById("formPengiriman"); const data = Object.fromEntries(new FormData(form));

const berat = parseFloat(data.berat_kg); const panjang = parseFloat(data.panjang_cm); const lebar = parseFloat(data.lebar_cm); const tinggi = parseFloat(data.tinggi_cm); const layanan = data.layanan;

const volume = (panjang * lebar * tinggi) / 6000; let tarif = 0;

if (layanan === "Reguler") { if (berat <= 50) tarif = 125000; else if (berat <= 70) tarif = 125000 + (berat - 50) * 2200; else if (berat < 100) tarif = 125000 + (berat - 50) * 2500; else if (berat <= 264) tarif = berat * 1700; else tarif = 450000; } else { tarif = 450000; }

if (data.referral === "Ya") { let potongan = tarif * 0.05; if (potongan > 50000) potongan = 50000; tarif -= potongan; }

// Simpan volume dan tarif ke global sementara window.resultData = { ...data, volume_cm3: panjang * lebar * tinggi, volume_m3: volume.toFixed(3), tarif_pengiriman: Math.round(tarif) };

// Tampilkan preview data const preview = <div class="text-left space-y-2"> <h3 class="font-bold text-lg mb-2 text-center">📦 Detail Pengiriman</h3> <p><strong>Nama Customer:</strong> ${data.nama_customer}</p> <p><strong>Tujuan:</strong> ${data.tujuan_kirim}</p> <p><strong>Nama Barang:</strong> ${data.nama_barang}</p> <p><strong>Berat:</strong> ${berat} kg</p> <p><strong>Volume:</strong> ${volume.toFixed(3)} m³</p> <p><strong>Layanan:</strong> ${layanan}</p> <p><strong>Tarif:</strong> Rp ${tarif.toLocaleString()}</p> <p class="text-sm italic text-gray-600">Klik "Kirim" jika data sudah sesuai.</p> </div>;

Swal.fire({ title: 'Konfirmasi Pengiriman', html: preview, confirmButtonText: '✅ Kirim Sekarang', showCancelButton: true, cancelButtonText: '❌ Batalkan' }).then((res) => { if (res.isConfirmed) submitForm(); }); }

async function submitForm() { const data = window.resultData;

const now = new Date(); const tanggal = now.toISOString().split("T")[0]; const waktu = now.toTimeString().split(" ")[0];

const nomorTanggal = ${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getFullYear()).slice(2)};

const res = await fetch(${SUPABASE_URL}/rest/v1/Data_Barang, { method: 'POST', headers: { apikey: SUPABASE_KEY, Authorization: Bearer ${SUPABASE_KEY}, 'Content-Type': 'application/json', Prefer: 'return=minimal' }, body: JSON.stringify({ nomor_surat_jalan: SJ-${nomorTanggal}-${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}, tanggal_masuk: ${tanggal}T${waktu}, ...data, berat_kg: parseFloat(data.berat_kg), jumlah_koli: parseInt(data.jumlah_koli), panjang_cm: parseInt(data.panjang_cm), lebar_cm: parseInt(data.lebar_cm), tinggi_cm: parseInt(data.tinggi_cm), volume_cm3: parseInt(data.volume_cm3), tarif_pengiriman: parseInt(data.tarif_pengiriman), biaya_bbm: 0, biaya_driver: 0, biaya_sewa_armada: 0, profit_kotor: parseInt(data.tarif_pengiriman), status_kirim: 'pending' }) });

if (res.ok) { Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Data pengiriman telah disimpan.' }); document.getElementById("formPengiriman").reset(); } else { Swal.fire({ icon: 'error', title: 'Gagal!', text: 'Data gagal dikirim ke Supabase.' }); } }

