/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F57D0D',
          light: '#FDEDDB',
        },
        secondary: {
          DEFAULT: '',
          light: '',
          dark: '',
        },
        text: {
          light: '#A3A3A3',
          dark: '#282828',
        },
      },
      fontFamily: {
        orienta: ['orienta'],
        agbalumo: ['Agbalumo'],
      },
    },
  },
  plugins: [],
};
