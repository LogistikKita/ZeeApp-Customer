// /assets-admin/js/data_pengiriman.js

const SUPABASE_URL = 'https://mrghlcedtafomwnznywf.supabase.co';
const SUPABASE_API_KEY = 'eyJhbGciOi...'; // (gunakan yang sudah disimpan aman)
const TABLE_NAME = 'Data_Barang';

async function fetchDataPengiriman(bulan, tahun) {
  const startDate = `${tahun}-${String(bulan).padStart(2, '0')}-01`;
  const endDate = `${tahun}-${String(bulan).padStart(2, '0')}-31`;

  const res = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE_NAME}?tanggal_masuk=gte.${startDate}&tanggal_masuk=lte.${endDate}&order=tanggal_masuk.desc`, {
    headers: {
      apikey: SUPABASE_API_KEY,
      Authorization: `Bearer ${SUPABASE_API_KEY}`,
    }
  });

  const data = await res.json();
  renderTable(data);
}

function renderTable(data) {
  const container = document.getElementById('tableContainer');
  if (data.length === 0) {
    container.innerHTML = '<p class="text-center text-gray-500">Tidak ada data untuk bulan ini.</p>';
    return;
  }

  let table = `
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead class="bg-red-600 text-white">
          <tr>
            <th class="py-2 px-4 text-left">Tanggal</th>
            <th class="py-2 px-4 text-left">Customer</th>
            <th class="py-2 px-4 text-left">Tujuan</th>
            <th class="py-2 px-4 text-left">Barang</th>
            <th class="py-2 px-4 text-left">Tarif</th>
          </tr>
        </thead>
        <tbody class="text-gray-700">`;

  data.forEach(row => {
    table += `
      <tr class="border-t">
        <td class="py-2 px-4">${row.tanggal_masuk}</td>
        <td class="py-2 px-4">${row.nama_customer}</td>
        <td class="py-2 px-4">${row.tujuan_kirim}</td>
        <td class="py-2 px-4">${row.nama_barang}</td>
        <td class="py-2 px-4">Rp${parseInt(row.tarif_pengiriman || 0).toLocaleString('id-ID')}</td>
      </tr>`;
  });

  table += `</tbody></table></div>`;
  container.innerHTML = table;
}
