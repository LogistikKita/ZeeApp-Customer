document.addEventListener("DOMContentLoaded", async () => {
  const header = document.getElementById("header");
  const footer = document.getElementById("footer");

  // Inject Header
  if (header) {
    header.innerHTML = `
      <header>
        <div class="logo-area">
          <a href="index.html">
            <img src="assets/logo/Logistik-Kita.png" alt="Logo Logistik Kita" />
          </a>
          <a href="index.html" style="text-decoration:none;"><h1>LOGISTIK KITA</h1></a>
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

  // Inject Footer
  if (footer) {
    footer.innerHTML = `
      <footer>
        <p>&copy; 2025 Logistik Kita. All rights reserved.</p>
      </footer>
    `;
  }

  // === Burger Menu Logic ===
  setTimeout(() => {
    const hamburger = document.getElementById("hamburger");
    const nav = document.querySelector("nav");

    if (hamburger && nav) {
      hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        nav.classList.toggle("active");
      });
    }
  }, 100);
});
