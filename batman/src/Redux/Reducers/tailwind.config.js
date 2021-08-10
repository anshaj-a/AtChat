module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: {
        100: '#cee6ff',
        200: '#9dceff',
        300: '#6cb5ff',
        400: '#3b9dff',
        500: '#0a84ff',
        600: '#086acc',
        700: '#064f99',
        800: '#043566',
        900: '#021a33',
      },
      dark: {
        100: '#A8A8AD',
        200: '#313131',
        300: '#404040',
        400: '#1A1A1A',
      },
      white: '#FFF',
    },

    fontFamily: {
      primary: ['Montserrat'],
      body: ['Open Sans'],
    },

    screens: {
      '2xl': { max: '1535px' },
      // => @media (max-width: 1535px) { ... }

      xl: { max: '1279px' },
      // => @media (max-width: 1279px) { ... }

      lg: { max: '1023px' },
      // => @media (max-width: 1023px) { ... }

      md: { max: '767px' },
      // => @media (max-width: 767px) { ... }

      sm: { max: '639px' },
      // => @media (max-width: 639px) { ... }
    },
  },
  plugins: [],
};
