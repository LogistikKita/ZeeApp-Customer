// data-pengiriman.js
document.addEventListener("DOMContentLoaded", () => {
  const bulanPicker = new WheelPicker("bulan-picker", [...Array(12)].map((_, i) => (i + 1).toString().padStart(2, "0")));
  const tahunPicker = new WheelPicker("tahun-picker", ["2024", "2025", "2026"]);
  document.getElementById("filter-button").addEventListener("click", fetchData);
  fetchData(); // load awal
});

async function fetchData() {
  const bulan = document.querySelector("#bulan-picker .selected")?.textContent;
  const tahun = document.querySelector("#tahun-picker .selected")?.textContent;

  const { data, error } = await supabase
    .from("Data_Barang")
    .select("*")
    .ilike("tanggal_masuk", `${tahun}-${bulan}-%`);

  if (error) {
    console.error("Error:", error.message);
    return;
  }

  const tbody = document.querySelector("#data-table tbody");
  tbody.innerHTML = "";

  data.forEach(row => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.tanggal_masuk}</td>
      <td>${row.nomor_surat_jalan}</td>
      <td>${row.nama_customer}</td>
      <td>${row.asal_kirim}</td>
      <td>${row.tujuan_kirim}</td>
      <td>${row.nama_barang}</td>
      <td>Rp${Number(row.tarif_pengiriman).toLocaleString()}</td>
      <td>${row.status_kirim}</td>
    `;
    tbody.appendChild(tr);
  });
}
