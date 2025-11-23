/** @type {import('tailwindcss').Config} */
export default {
  // Penting: Konfigurasi ini memberitahu Tailwind di mana mencari class (di file-file JSX)
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Mengaktifkan dark mode via class 'dark' di tag HTML
  theme: {
    extend: {
      // Di sini nanti kita bisa mendefinisikan warna brand Logistik Kita
      colors: {
        'primary': '#FF5733', // Contoh warna utama (sesuaikan dengan brand kamu)
        'accent': '#FFC300', // Contoh warna aksen
      }
    },
  },
  plugins: [],
}
