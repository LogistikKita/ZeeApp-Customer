document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const overlay = document.getElementById("overlay");
  const navbar = document.querySelector(".navbar");

  // Efek navbar saat scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Toggle menu + overlay
  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    mobileMenu.classList.toggle("show");
    overlay.classList.toggle("show");
  });

  // Tutup saat overlay diklik
  overlay.addEventListener("click", () => {
    menuBtn.classList.remove("active");
    mobileMenu.classList.remove("show");
    overlay.classList.remove("show");
  });
});
