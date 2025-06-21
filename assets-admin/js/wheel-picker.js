// File: wheel-picker.js
document.addEventListener("DOMContentLoaded", () => {
  const filterBtn = document.getElementById("filterBtn");
  const pickerModal = document.getElementById("pickerModal");
  const btnApply = document.getElementById("btnApplyPicker");
  const btnClose = document.getElementById("btnClosePicker");
  const monthWheel = document.getElementById("monthWheel");
  const yearWheel = document.getElementById("yearWheel");

  const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  months.forEach((month, index) => {
    const item = document.createElement("div");
    item.textContent = month;
    item.dataset.value = index + 1;
    monthWheel.appendChild(item);
  });

  years.forEach(year => {
    const item = document.createElement("div");
    item.textContent = year;
    item.dataset.value = year;
    yearWheel.appendChild(item);
  });

  filterBtn.addEventListener("click", () => {
    pickerModal.style.display = "flex";
  });

  btnClose.addEventListener("click", () => {
    pickerModal.style.display = "none";
  });

  btnApply.addEventListener("click", () => {
    const selectedMonth = monthWheel.querySelector("div:nth-child(6)");
    const selectedYear = yearWheel.querySelector("div:nth-child(6)");

    if (selectedMonth && selectedYear) {
      const bulan = selectedMonth.dataset.value;
      const tahun = selectedYear.dataset.value;

      // Panggil Supabase atau tampilkan data lokal
      console.log("Tampilkan data untuk bulan:", bulan, "tahun:", tahun);
    }

    pickerModal.style.display = "none";
  });
});
