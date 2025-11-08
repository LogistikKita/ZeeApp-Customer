// ==== SCRIPT UNTUK MENU HAMBURGER ====
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // cegah klik dari tertutup overlay
      menuBtn.classList.toggle("active");
      mobileMenu.classList.toggle("show");
    });

    // Klik di luar menu menutup menu
    document.addEventListener("click", (e) => {
      if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
        menuBtn.classList.remove("active");
        mobileMenu.classList.remove("show");
      }
    });
  }
});
