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
        grey: {
          light: "#8e8e8e",
          DEFAULT: "#3b3b3b",
          dark: "#1D1D1B"
        },
        creme: "#fff7e7",
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        ternary: 'var(--color-ternary)',

        "heading-1-color": 'var(--color-heading-1)',
        "heading-2-color": 'var(--color-heading-2)',
        "heading-3-color": 'var(--color-heading-3)',
        "heading-4-color": 'var(--color-heading-4)',

        "body-large-color": 'var(--color-body-large)',
        "body-color": 'var(--color-body)',
        "body-small-color": 'var(--color-small)',

        "border-color": 'var(--color-border)',
        "link-color": 'var(--color-link)',
        "link-hover-color": 'var(--color-link-hover)',
        "background-color": 'var(--color-background)',

        "tag-border-color": 'var(--color-tag-border)',
        "tag-text-color": 'var(--color-tag-text)',

        "button-background-color": 'var(--color-button-background)',
        "button-background-hover-color": 'var(--color-button-background-hover)',
        "button-border-color": 'var(--color-button-border)',
        "button-border-hover-color": 'var(--color-button-border-hover)',
        "button-text-color": 'var(--color-button-text)',
        "button-text-hover-color": 'var(--color-button-text-hover)',
    },
    fontSize: {
      'heading-1': ['var(--size-heading-1)', { lineHeight: 'var(--line-height-heading-1)', fontWeight: 'var(--font-weight-heading-1)'}],
      'heading-2': ['var(--size-heading-2)', { lineHeight: 'var(--line-height-heading-2)', fontWeight: 'var(--font-weight-heading-2)'}],
      'heading-3': ['var(--size-heading-3)', { lineHeight: 'var(--line-height-heading-3)', fontWeight: 'var(--font-weight-heading-3)'}],
      'heading-4': ['var(--size-heading-4)', { lineHeight: 'var(--line-height-heading-4)', fontWeight: 'var(--font-weight-heading-4)'}],
      'body-xl': ['24px', { lineHeight: '150%' }],
      'body-lg': ['20px', { lineHeight: '150%' }],
      'body-md': ['18px', { lineHeight: '150%' }],
      'body-sm': ['15px', { lineHeight: '150%' }],
      'body-xs': ['12px', { lineHeight: '150%' }],

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

