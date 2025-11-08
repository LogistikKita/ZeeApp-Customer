document.addEventListener("DOMContentLoaded", function () {
  // Ambil elemen
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  // Pastikan elemen ada sebelum menjalankan listener
  if (hamburger && navLinks) { 
    // Logika Toggle Menu Burger
    hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("active");
    });

    // Tutup menu ketika link di klik (untuk navigasi one-page scroll)
    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        // Hapus kelas 'active' untuk menutup menu mobile
        navLinks.classList.remove("active"); 
      });
    });
  }
});

// Catatan: File include.js tidak digunakan lagi karena struktur header sudah dikonsolidasikan.
