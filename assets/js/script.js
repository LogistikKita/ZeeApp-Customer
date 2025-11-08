// ====== NAVBAR MOBILE MENU ======
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active");
  mobileMenu.classList.toggle("show");
  document.body.classList.toggle("menu-open");
});

// ====== NAVBAR SCROLL EFFECT ======
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 30) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
