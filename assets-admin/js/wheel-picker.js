// wheel-picker.js
class WheelPicker {
  constructor(id, items) {
    this.container = document.getElementById(id);
    this.items = items;
    this.selectedIndex = 0;
    this.render();
    this.container.addEventListener("wheel", this.scroll.bind(this));
  }

  render() {
    this.container.innerHTML = "";
    this.items.forEach((item, i) => {
      const div = document.createElement("div");
      div.textContent = item;
      if (i === this.selectedIndex) div.classList.add("selected");
      this.container.appendChild(div);
    });
  }

  scroll(e) {
    e.preventDefault();
    this.selectedIndex = (this.selectedIndex + (e.deltaY > 0 ? 1 : -1) + this.items.length) % this.items.length;
    this.render();
  }
}
