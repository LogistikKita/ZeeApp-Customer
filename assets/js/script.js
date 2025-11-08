// script.js – kontrol navigasi & efek hamburger
document.addEventListener("click", (event) => {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");

  // Pastikan elemen sudah dimuat
  if (!hamburger || !mobileMenu) return;

  // Klik tombol hamburger
  if (event.target.closest("#hamburger")) {
    hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("show");

    // Efek latar belakang transparan
    document.body.classList.toggle("menu-open");
  }

  // Klik di luar menu → tutup
  if (!event.target.closest(".navbar") && mobileMenu.classList.contains("show")) {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("show");
    document.body.classList.remove("menu-open");
  }
});
