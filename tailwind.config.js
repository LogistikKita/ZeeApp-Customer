/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Mengaktifkan dark mode via class
  theme: {
    extend: {
      colors: {
        primary: '#10b981', // Emerald-500
        dark: '#0f172a',    // Slate-900
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}


