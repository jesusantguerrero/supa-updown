module.exports = {
  mode: 'jit',
  purge: [
    './index.html', 
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/atmosphere-ui/**/*.{vue,js}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        24: 'repeat(24, minmax(0, 1fr))',
        30: 'repeat(30, minmax(0, 1fr))',
        60: 'repeat(60, minmax(0, 1fr))',
        90: 'repeat(90, minmax(0, 1fr))',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
