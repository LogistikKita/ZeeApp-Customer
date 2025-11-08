// Inisialisasi ikon
lucide.createIcons();

// Gambar slider
const images = [
  "assets/armada/armada-1.jpg",
  "assets/armada/armada-2.jpg",
  "assets/armada/armada-3.jpg",
];

const slider = document.getElementById("image-slider");

images.forEach((src, index) => {
  const img = document.createElement("img");
  img.src = src;
  img.className = "slider-image" + (index === 0 ? " active" : "");
  slider.appendChild(img);
});

let current = 0;
setInterval(() => {
  const slides = document.querySelectorAll(".slider-image");
  slides[current].classList.remove("active");
  current = (current + 1) % slides.length;
  slides[current].classList.add("active");
}, 4000);

// Animasi saat scroll
const elements = document.querySelectorAll(".animate-on-scroll");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
});
elements.forEach(el => observer.observe(el));

// Menu mobile
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});