// Semua interaksi navbar di sini
function initNavbar() {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");

  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("show");
    document.body.classList.toggle("menu-open");
  });

  document.addEventListener("click", (e) => {
    if (
      !e.target.closest(".navbar") &&
      mobileMenu.classList.contains("show")
    ) {
      hamburger.classList.remove("active");
      mobileMenu.classList.remove("show");
      document.body.classList.remove("menu-open");
    }
  });
}
