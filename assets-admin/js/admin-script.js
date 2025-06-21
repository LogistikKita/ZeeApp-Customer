document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("toggleSidebar");
  const toggleLabel = document.getElementById("toggleLabel");
  const labels = sidebar.querySelectorAll(".label");
  const logoText = document.getElementById("logoText");

  toggleBtn.addEventListener("click", function () {
    if (sidebar.classList.contains("w-64")) {
      sidebar.classList.remove("w-64");
      sidebar.classList.add("w-20");
      labels.forEach(label => label.classList.add("hidden"));
      logoText.classList.add("hidden");
      toggleLabel.innerText = "Buka Menu";
    } else {
      sidebar.classList.remove("w-20");
      sidebar.classList.add("w-64");
      labels.forEach(label => label.classList.remove("hidden"));
      logoText.classList.remove("hidden");
      toggleLabel.innerText = "Tutup Menu";
    }
  });
});
