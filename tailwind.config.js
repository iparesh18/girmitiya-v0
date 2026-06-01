/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#7f1d1d',
        cream: '#fff7e6',
        parchment: '#f8ead0',
        light: '#fff7e6',
        dark: '#241811',
        darker: '#17110c',
        maroon: '#7f1d1d',
        saffron: '#d97706',
        gold: '#b88a2d',
        earth: '#5f3b24',
        leaf: '#2f6b4f',
        ink: '#241811'
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        sans: ['Manrope', 'ui-sans-serif', 'system-ui'],
        body: ['Manrope', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        premium: '0 24px 70px rgba(95, 59, 36, 0.16)',
        glow: '0 18px 44px rgba(217, 119, 6, 0.22)'
      },
      backgroundImage: {
        'cultural-pattern':
          'radial-gradient(circle at 1px 1px, rgba(127,29,29,.16) 1px, transparent 0)'
      }
    }
  },
  plugins: []
};
