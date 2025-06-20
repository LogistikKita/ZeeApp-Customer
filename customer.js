async function submitForm() {
  const form = document.getElementById('formPengiriman');
  const formData = new FormData(form);

  const today = new Date();
  const tanggal = today.toISOString();
  const dateStr = today.toLocaleDateString('id-ID').split('/').join('-');

  // Ambil semua nomor surat jalan untuk menghitung urutan
  const res = await fetch(`${supabaseUrl}/rest/v1/${tableName}?select=nomor_surat_jalan`, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`
    }
  });
  const data = await res.json();
  const nextNum = data.length + 1;
  const nomor_surat = `SJ-${dateStr}-${String(nextNum).padStart(4, '0')}`;

  const berat = parseFloat(formData.get('berat_kg'));
  const panjang = parseFloat(formData.get('panjang_cm'));
  const lebar = parseFloat(formData.get('lebar_cm'));
  const tinggi = parseFloat(formData.get('tinggi_cm'));
  const volume = panjang * lebar * tinggi;
  const layanan = formData.get('layanan');

  // Hitung tarif
  let tarif = 0;
  if (layanan === 'Prioritas') {
    tarif = 450000;
  } else {
    if (berat <= 50) tarif = 125000;
    else if (berat <= 70) tarif = 125000 + (berat - 50) * 2200;
    else if (berat < 100) tarif = 125000 + (berat - 50) * 2500;
    else if (berat <= 264) tarif = berat * 1700;
    else tarif = 450000;
  }

  const payload = {
    nomor_surat_jalan: nomor_surat,
    tanggal_masuk: tanggal,
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
    status_kirim: "pending"
  };

  // Kirim ke Supabase
  const result = await fetch(`${supabaseUrl}/rest/v1/${tableName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`
    },
    body: JSON.stringify(payload)
  });

  if (result.ok) {
    alert('✅ Data berhasil dikirim ke Logistik Kita. Terima kasih!');
    window.location.reload();
  } else {
    alert('❌ Gagal mengirim data. Coba lagi nanti ya.');
    console.error(await result.text());
  }
}
