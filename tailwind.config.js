module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {

    extend: {
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '132': '33rem',
        '144': '36rem',
        '240': '60rem',
        '172': '43rem',
        '192': '48rem',
      },
      lineHeight: {
        '12': '3rem',
      }
    },
    backgroundColor: theme => ({
      ...theme('colors'),
      'biho': '#33b4de',
      'bili': '#00a1d6'
    }),
    borderColor: theme => ({
      ...theme('colors'),
      DEFAULT: theme('colors.gray.300', 'currentColor'),
      'biho': '#33b4de',
    })
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    }
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
}
