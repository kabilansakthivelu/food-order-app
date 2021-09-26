module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
         'image': "url('https://a-static.besthdwallpaper.com/western-food-hamburger-french-fries-and-variety-of-vegetable-in-one-table-wallpaper-3840x2400-60595_9.jpg')",
        },
      width: {
         '1/7': '12.5%',
       },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      textColor: ['active'],
    },
  },
  plugins: [],
}
