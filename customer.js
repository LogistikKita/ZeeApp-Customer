// customer.js FINAL VERSI DENGAN POPUP KONFIRMASI

// Ambil config Supabase
const supabaseUrl = SUPABASE_URL;
const supabaseKey = SUPABASE_KEY;
const table = "Data_Barang";
const db = supabase.createClient(supabaseUrl, supabaseKey);

let globalData = {}; // Untuk menyimpan sementara data form

function cekTarif() {
  const form = document.getElementById("formPengiriman");
  const formData = new FormData(form);

  // Ambil nilai
  const berat = parseFloat(formData.get("berat_kg")) || 0;
  const panjang = parseFloat(formData.get("panjang_cm")) || 0;
  const lebar = parseFloat(formData.get("lebar_cm")) || 0;
  const tinggi = parseFloat(formData.get("tinggi_cm")) || 0;
  const layanan = formData.get("layanan");

  const volume = (panjang * lebar * tinggi);

  let tarif = 0;
  if (layanan === "Prioritas") {
    tarif = 450000;
  } else {
    if (berat <= 50) tarif = 125000;
    else if (berat <= 70) tarif = 125000 + (berat - 50) * 2200;
    else if (berat <= 99) tarif = 125000 + (berat - 50) * 2500;
    else if (berat <= 264) tarif = berat * 1700;
    else tarif = 450000; // Carter
  }

  const popup = document.getElementById("popup");
  const popupContent = document.getElementById("popupContent");
  popupContent.innerHTML = `
    <p><strong>Nama:</strong> ${formData.get("nama_customer")}</p>
    <p><strong>Nomor HP:</strong> ${formData.get("nomor_hp_customer")}</p>
    <p><strong>Asal:</strong> ${formData.get("asal_kirim")}</p>
    <p><strong>Tujuan:</strong> ${formData.get("tujuan_kirim")}</p>
    <p><strong>Barang:</strong> ${formData.get("nama_barang")}</p>
    <p><strong>Berat:</strong> ${berat} kg</p>
    <p><strong>Volume:</strong> ${volume.toLocaleString()} cm³</p>
    <p><strong>Layanan:</strong> ${layanan}</p>
    <p><strong>Estimasi Tarif:</strong> Rp ${tarif.toLocaleString()}</p>
  `;

  popup.classList.remove("hidden");

  globalData = Object.fromEntries(formData);
  globalData.volume_cm3 = volume;
  globalData.tarif_pengiriman = Math.round(tarif);
}

function tutupPopup() {
  document.getElementById("popup").classList.add("hidden");
}

function lanjutKirim() {
  document.getElementById("popup").classList.add("hidden");
  document.getElementById("submitBtn").classList.remove("hidden");
}

async function submitForm() {
  // Tambah nomor_surat_jalan
  const now = new Date();
  const tanggalSurat = now.toLocaleDateString("id-ID").replaceAll("/", "-");
  const waktu = now.toLocaleTimeString("id-ID");
  const { count } = await db.from(table).select("*", { count: "exact" });
  const nomorUrut = String(count + 1).padStart(4, "0");
  globalData.nomor_surat_jalan = `SJ-${tanggalSurat}-${nomorUrut}`;
  globalData.tanggal_masuk = now.toISOString().split("T")[0];
  globalData.status_kirim = "pending";

  const { error } = await db.from(table).insert([globalData]);

  if (error) {
    alert("Gagal kirim data: " + error.message);
  } else {
    alert("Data berhasil dikirim!");
    document.getElementById("formPengiriman").reset();
    document.getElementById("submitBtn").classList.add("hidden");
  }
}
