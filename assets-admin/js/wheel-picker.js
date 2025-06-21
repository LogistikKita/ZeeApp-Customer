// /assets-admin/js/wheel-picker.js
document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.getElementById('openWheelPicker');
  const modal = document.getElementById('wheelPickerModal');
  const selectBtn = document.getElementById('selectWheelButton');

  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

  const monthWheel = document.getElementById('monthWheel');
  const yearWheel = document.getElementById('yearWheel');

  function populateWheel(container, data) {
    container.innerHTML = '';
    data.forEach(item => {
      const div = document.createElement('div');
      div.textContent = item;
      container.appendChild(div);
    });
  }

  populateWheel(monthWheel, months);
  populateWheel(yearWheel, years);

  openBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
  });

  selectBtn.addEventListener('click', () => {
    const selectedMonth = months[Math.round(monthWheel.scrollTop / 40)];
    const selectedYear = years[Math.round(yearWheel.scrollTop / 40)];

    modal.classList.add('hidden');

    const bulanIndex = months.indexOf(selectedMonth) + 1;
    const yearStr = selectedYear.toString();
    fetchDataPengiriman(bulanIndex, yearStr);
  });
});
