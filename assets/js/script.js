document.addEventListener("DOMContentLoaded", function () {
  // --- Logika Burger Menu ---
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  if (hamburger && navLinks) { 
    hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("active");
      hamburger.classList.toggle("active"); // Mengaktifkan animasi hamburger
    });

    // Tutup menu ketika link di klik (untuk navigasi one-page scroll)
    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active"); 
        hamburger.classList.remove("active"); // Menutup animasi hamburger juga
      });
    });
  }

  // --- Logika Animasi Scroll Fade In (Intersection Observer) ---
  const faders = document.querySelectorAll(".scroll-fade-in");

  const appearOptions = {
    threshold: 0.3, // Item akan muncul ketika 30% terlihat
    rootMargin: "0px 0px -50px 0px" 
  };

  const appearOnScroll = new IntersectionObserver(function (
    entries,
    appearOnScroll
  ) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add("is-visible");
        appearOnScroll.unobserve(entry.target); 
      }
    });
  },
  appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });
});
