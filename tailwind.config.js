/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/*.ejs", "./public/*.css"],
  theme: {
    extend: {
      fontFamily: {
        "Source": ["Source Sans 3", "sans-serif"],

      },
      colors: {
        'custom-blue': '#082f49', // Add your custom color here
      },
    
    },
  },
  plugins: [],
}



