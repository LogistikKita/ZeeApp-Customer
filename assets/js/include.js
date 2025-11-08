// Memuat header dan footer otomatis lalu panggil init setelah selesai
document.addEventListener("DOMContentLoaded", async () => {
  async function loadHTML(id, file) {
    const el = document.getElementById(id);
    if (el) {
      const res = await fetch(`assets/partials/${file}`);
      if (res.ok) el.innerHTML = await res.text();
    }
  }

  await loadHTML("header", "header.html");
  await loadHTML("footer", "footer.html");

  // Setelah elemen dimuat baru aktifkan interaksi
  if (typeof initNavbar === "function") initNavbar();
});
