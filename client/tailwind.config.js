module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue': {
          100: '#EDF6FE',
          200: '#E5F1FF',
          300: '#B8DAFF',
          400: '#70A9FC',
          500: '#3374D5',
          600: '#162D6D',
          700: '#717788',
          900: '#343D55',
          1000: '#0D1B40',
        },
        'gray': {
          300: '#F7F7F7',
          400: '#F4F4F4',
          500: '#dcdbd7',
          600: '#C2C5CC',
          700: '#b8b8b8',
          800: '#A4A4A4',
          900: '#999EAA',
        }
      },
    }
  },
  plugins: [],
}
