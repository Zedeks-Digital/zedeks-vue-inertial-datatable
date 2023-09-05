/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
      "./src/**/*.{html,js,vue}"
  ],
  theme: {
    extend: {
      colors:{
        "coordy-primary":"#",
        "coordy-secondary":"#",
        "coordy-accent":"#",
      }
    },
  },
  plugins: [],
}
