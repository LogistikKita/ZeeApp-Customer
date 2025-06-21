document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const mobileToggle = document.getElementById("mobileToggle");

  // Tutup sidebar default
  sidebar.classList.add("closed");

  mobileToggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    sidebar.classList.toggle("closed");
  });
});
