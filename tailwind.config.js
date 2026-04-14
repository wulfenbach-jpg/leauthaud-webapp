/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          50: '#f4f7f4',
          100: '#e4ebe4',
          200: '#cbdad0',
          300: '#a6bfb0',
          400: '#7f9e8d',
          500: '#60816f', // Olive green primary
          600: '#4a6757',
          700: '#3d5347',
          800: '#33433b',
          900: '#2b3831',
          950: '#161f1b',
        }
      }
    },
  },
  plugins: [],
}
