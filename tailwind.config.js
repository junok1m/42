/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
  fontFamily: {
    serif: ['Cormorant Garamond', 'serif'],
    display: ['Playfair Display', 'serif'],
    sans: ['Inter', 'sans-serif'],
  },
},
  },
  plugins: [],
}
