/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#AD2118',
          brown: '#451400',
          gold: '#C69214',
          cream: '#F4F2EB',
          gray: '#F5F5F5'
        }
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
        display: ['"Trade Gothic Next"', 'sans-serif'],
      }
    }
  },
  plugins: [],
}
