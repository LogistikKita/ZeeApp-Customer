document.addEventListener("DOMContentLoaded", function () {
  // --- Logika Burger Menu ---
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  if (hamburger && navLinks) { 
    hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("active");
      hamburger.classList.toggle("active"); // Mengaktifkan animasi hamburger
    });

    // Tutup menu ketika link di klik
    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active"); 
        hamburger.classList.remove("active"); // Menutup animasi hamburger
      });
    });
  }

  // --- Logika Dark Mode ---
  const toggleButton = document.getElementById("dark-mode-toggle");
  
  // 1. Cek preferensi yang tersimpan atau sistem
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme === 'dark' || (!currentTheme && prefersDark)) {
    document.body.classList.add('dark-mode');
    if (toggleButton) toggleButton.textContent = '🌙';
  } else {
    if (toggleButton) toggleButton.textContent = '☀️';
  }

  // 2. Listener untuk mengaktifkan toggle
  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      
      // Simpan preferensi
      if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        toggleButton.textContent = '🌙';
      } else {
        localStorage.setItem('theme', 'light');
        toggleButton.textContent = '☀️';
      }
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
