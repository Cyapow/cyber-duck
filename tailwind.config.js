module.exports = {
  purge: [
    './resources/**/*.html',
    './resources/**/*.vue',
    './resources/**/*.jsx',
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto'],
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/custom-forms')],
}
