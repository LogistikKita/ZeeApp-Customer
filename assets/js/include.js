// Load header & footer otomatis
document.addEventListener("DOMContentLoaded", async () => {
  const header = document.getElementById("header");
  const footer = document.getElementById("footer");

  if (header) {
    header.innerHTML = `
      <header>
        <div class="logo-area">
          <a href="index.html" class="logo-link">
            <img src="assets/logo/Logistik-Kita.png" alt="Logo Logistik Kita" />
          </a>
          <a href="index.html" class="logo-link"><h1>LOGISTIK KITA</h1></a>
        </div>
        <nav>
          <a href="index.html">Beranda</a>
          <a href="layanan.html">Layanan</a>
          <a href="tentang.html">Tentang</a>
          <a href="kontak.html">Kontak</a>
        </nav>
        <div class="hamburger" id="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>
    `;
  }

  if (footer) {
    footer.innerHTML = `
      <footer style="text-align:center; padding:20px; background:#3d413c; color:white;">
        <p>&copy; 2025 Logistik Kita. All rights reserved.</p>
      </footer>
    `;
  }

  // Setelah header dimuat, aktifkan fungsi hamburger
  const hamburger = document.getElementById("hamburger");
  const nav = document.querySelector("nav");

  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      nav.classList.toggle("active");
    });
  }
});
