/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.html"],
  theme: {
    extend: {
      fontFamily: {
        "Source": ["Source Sans 3", "sans-serif"],

      },
      backgroundImage: {
        'image1': "url('../src/main.jpg')",
        'image2': "url('../src/dhamtour.png')",
        'image3': "url('../src/main1.jpg')",
      },
    },
  },
  plugins: [],
}

