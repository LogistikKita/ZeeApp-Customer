// ===== MOBILE MENU TOGGLE =====
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('active');
  mobileMenu.classList.toggle('show');
});

// Optional: Close menu saat klik di luar
document.addEventListener('click', (e) => {
  if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
    menuBtn.classList.remove('active');
    mobileMenu.classList.remove('show');
  }
});
