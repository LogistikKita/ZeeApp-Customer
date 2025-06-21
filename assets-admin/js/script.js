// script.js
document.addEventListener("DOMContentLoaded", async () => {
  const table = document.getElementById("dataTabel");

  if (table) {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select("*")
      .order("tanggal_masuk", { ascending: false })
      .limit(5);

    if (error) {
      console.error("❌ Gagal fetch:", error.message);
      table.innerHTML = "<tr><td colspan='4'>Gagal memuat data</td></tr>";
    } else {
      table.innerHTML = data
        .map(
          (item) => `
        <tr>
          <td>${item.nomor_surat_jalan}</td>
          <td>${item.nama_customer}</td>
          <td>${item.tujuan_kirim}</td>
          <td>${item.status_kirim}</td>
        </tr>`
        )
        .join("");
    }
  }
});
