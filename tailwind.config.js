/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#1266F1"
      }
    },
  },
  plugins: [
    require('tailwindcss-3d')
  ],
}