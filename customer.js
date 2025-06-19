function cekTarif() {
  const berat = parseFloat(document.querySelector('[name="berat_kg"]').value);
  const panjang = parseFloat(document.querySelector('[name="panjang_cm"]').value);
  const lebar = parseFloat(document.querySelector('[name="lebar_cm"]').value);
  const tinggi = parseFloat(document.querySelector('[name="tinggi_cm"]').value);
  const layanan = document.querySelector('[name="layanan"]').value;
  const referral = document.querySelector('[name="referral"]').value;

  if (isNaN(berat) || isNaN(panjang) || isNaN(lebar) || isNaN(tinggi)) {
    alert("Lengkapi semua data dimensi dan berat barang!");
    return;
  }

  const volume = (panjang * lebar * tinggi) / 6000;
  let tarif = 0;

  if (layanan === "Reguler") {
    if (berat <= 50) {
      tarif = 125000;
    } else if (berat <= 70) {
      tarif = 125000 + (berat - 50) * 2200;
    } else if (berat <= 99) {
      tarif = 125000 + (berat - 50) * 2500;
    } else if (berat <= 264) {
      tarif = berat * 1700;
    } else {
      tarif = 450000; // tarif carter
    }
  } else {
    tarif = 450000; // layanan Prioritas = carter
  }

  if (referral === "Ya") {
    let potongan = tarif * 0.05;
    if (potongan > 50000) potongan = 50000;
    tarif -= potongan;
  }

  const hasil = `
    <strong>Volume:</strong> ${volume.toFixed(2)} kg<br>
    <strong>Layanan:</strong> ${layanan}<br>
    <strong>Tarif:</strong> Rp ${tarif.toLocaleString("id-ID")}
  `;

  // tampilkan popup konfirmasi
  const konfirmasi = document.createElement("div");
  konfirmasi.innerHTML = `
    <dialog open class="modal">
      <form method="dialog" class="modal-box text-left">
        <h3 class="font-bold text-lg mb-2">Ringkasan Tarif</h3>
        <p class="text-sm mb-4">${hasil}</p>
        <div class="modal-action">
          <button class="btn" onclick="document.querySelector('dialog').remove()">Tutup</button>
          <button class="btn btn-success" onclick="document.getElementById('submitBtn').click()">Lanjut Kirim</button>
        </div>
      </form>
    </dialog>
  `;
  document.body.appendChild(konfirmasi);
}
