// include.js – Memuat header & footer otomatis
document.addEventListener("DOMContentLoaded", async () => {
  async function loadHTML(id, file) {
    const element = document.getElementById(id);
    if (element) {
      const response = await fetch(`assets/partials/${file}`);
      if (response.ok) {
        element.innerHTML = await response.text();
      }
    }
  }

  await loadHTML("header", "header.html");
  await loadHTML("footer", "footer.html");
});
