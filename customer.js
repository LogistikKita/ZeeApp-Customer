// scripts/customer.js

async function cekTarif() {
  const form = document.getElementById('formPengiriman');
  const formData = new FormData(form);
  const data = {};

  formData.forEach((value, key) => {
    data[key] = value;
  });

  const p = parseFloat(data.panjang_cm);
  const l = parseFloat(data.lebar_cm);
  const t = parseFloat(data.tinggi_cm);
  const berat = parseFloat(data.berat_kg);
  const volume = p * l * t;

  let tarif = 0;
  if (data.layanan === "Reguler") {
    if (berat <= 50) tarif = 125000;
    else if (berat <= 70) tarif = 125000 + (berat - 50) * 2200;
    else if (berat <= 264) tarif = berat * 1700;
    else tarif = 450000;
  } else {
    tarif = 450000;
  }

  data.volume_cm3 = volume;
  data.tarif_pengiriman = tarif;
  data.biaya_bbm = 0;
  data.biaya_driver = 0;
  data.biaya_sewa_armada = 0;
  data.profit_kotor = 0;
  data.status_kirim = "pending";

  window.globalFormData = data;

  alert(`📦 Ringkasan:\nNama: ${data.nama_customer}\nTujuan: ${data.tujuan_kirim}\nBerat: ${berat} kg\nVolume: ${volume} cm³\nTarif: Rp ${tarif.toLocaleString('id-ID')}\n\nKlik 'Customer Setuju & Kirim' untuk lanjut.`);
  document.getElementById("submitBtn").classList.remove("hidden");
}

async function submitForm() {
  if (!window.globalFormData) return alert("⚠️ Silakan cek tarif dulu.");

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${SUPABASE_TABLE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_API_KEY,
        "Authorization": `Bearer ${SUPABASE_API_KEY}`
      },
      body: JSON.stringify(window.globalFormData)
    });

    if (response.ok) {
      alert("✅ Data berhasil dikirim ke database.");
      document.getElementById("formPengiriman").reset();
      document.getElementById("submitBtn").classList.add("hidden");
    } else {
      const errText = await response.text();
      throw new Error(errText);
    }
  } catch (error) {
    alert("❌ Gagal mengirim data:\n" + error.message);
  }
}
