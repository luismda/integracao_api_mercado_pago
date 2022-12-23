/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx'
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          900: '#121214',
          800: '#202024',
          700: '#181820',
          400: '#7C7C8A'
        }
      },

      fontFamily: {
        sans: 'Roboto, sans-serif'
      }
    },
  },
  plugins: [],
}
