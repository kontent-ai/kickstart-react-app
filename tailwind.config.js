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
        creme: "#fff7e7",
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        ternary: 'var(--color-ternary)',

        "heading-1-color": 'var(--color-heading)',
        "heading-2-color": 'var(--color-heading)',
        "heading-3-color": 'var(--color-heading)',

        "body-large-color": 'var(--color-body-large)',
        "body-color": 'var(--color-body)',
        "body-small-color": 'var(--color-small)',

        "border-color": 'var(--color-border)',
        "link-color": 'var(--color-link)',
        "link-hover-color": 'var(--color-link-hover)',
        "background-color": 'var(--color-background)',

        "button-background-color": 'var(--color-button-background)',
        "button-background-hover-color": 'var(--color-button-background-hover)',
        "button-border-color": 'var(--color-button-border)',
        "button-border-hover-color": 'var(--color-button-border-hover)',
        "button-text-color": 'var(--color-button-text)',
        "button-text-hover-color": 'var(--color-button-text-hover)',
    },
    fontSize: {
      'heading-1': ['94px', { lineHeight: '84%', fontWeight: '800', fontFamily: 'Abhaya Libre' }],
      'heading-2': ['48px', { lineHeight: '84%', fontWeight: '800', fontFamily: 'Abhaya Libre' }],
      'heading-3': ['32px', { lineHeight: '84%', fontWeight: '800', fontFamily: 'Abhaya Libre' }],
      'body-large': ['1.125rem', { lineHeight: '1.75rem' }],
      'body': ['20px', { lineHeight: '150%', fontFamily: 'Source Sans 3', color: '#3b3b3b' }],
      'small': ['0.875rem', { lineHeight: '1.25rem' }],
    },
      fontFamily: {
        sans: ['"Source Sans 3"', 'Arial', 'sans-serif'],
        libre: ['"Abhaya Libre"', "Arial"]
      }
    },
    container: {
      center: true,
    }
  },
  plugins: [],
}

