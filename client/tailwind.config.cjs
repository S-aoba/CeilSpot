/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    screens: {
      // レスポンシブのオーバーライド
      lg: '965px',
      xl: '1280px',
    },
  },
  plugins: [require('daisyui'), require('@tailwindcss/line-clamp')],
}
