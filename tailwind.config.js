/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: "#993265",
        azure: "#009edb",
        white: '#ffffff',
        gray: {
          light: "#8e8e8e",
          DEFAULT: "#3b3b3b"
        },
        creme: "#fff7e7"
    },
      fontFamily: {
        sans: ["Source Sans 3", 'Arial', 'sans-serif'],
        libre: ['"Abhaya Libre"', "Arial"]
      }
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      }
    }
  },
  plugins: [],
}

