// Memuat header dan footer otomatis
document.addEventListener("DOMContentLoaded", () => {
  const loadPartials = async () => {
    const header = await fetch("assets/partials/header.html").then(res => res.text());
    document.getElementById("header").innerHTML = header;

    const footer = await fetch("assets/partials/footer.html").then(res => res.text());
    document.getElementById("footer").innerHTML = footer;
  };

  loadPartials().then(() => {
    const script = document.createElement("script");
    script.src = "assets/js/script.js";
    document.body.appendChild(script);
  });
});
