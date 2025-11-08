// Memuat header dan footer otomatis ke setiap halaman
document.addEventListener("DOMContentLoaded", () => {
  const loadHTML = async (id, file) => {
    const el = document.getElementById(id);
    if (el) {
      const res = await fetch(file);
      const html = await res.text();
      el.innerHTML = html;
    }
  };

  loadHTML("header", "assets/partials/header.html");
  loadHTML("footer", "assets/partials/footer.html");
});
