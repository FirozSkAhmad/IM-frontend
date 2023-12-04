/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./Components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'blue-1366D9': '#1366D9',
        'grey-500': 'rgba(240, 241, 243, 1)',
        'grey-E3E3E3': "#E3E3E3",
      },
      colors: {
        'grey': '#383E49',
        'blue': '#1570EF'
      }
    },
  },
  plugins: [],
}

