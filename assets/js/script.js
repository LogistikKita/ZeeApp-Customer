// Script untuk hamburger & mobile menu
document.addEventListener("click", (e) => {
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (!menuBtn || !mobileMenu) return;

  if (menuBtn.contains(e.target)) {
    menuBtn.classList.toggle("active");
    mobileMenu.classList.toggle("show");
  } else if (!mobileMenu.contains(e.target)) {
    menuBtn.classList.remove("active");
    mobileMenu.classList.remove("show");
  }
});
