document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("toggleBtn");
  const logoText = document.getElementById("logoText");

  // Default kondisi tertutup
  sidebar.classList.add("closed");

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("closed");
  });
});
