/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    screens: {
      // レスポンシブのオーバーライド
      md:'600px',
      lg: '965px',
      xl: '1280px',
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#2563eb',
          secondary: '#f6d860',
          accent: '#37cdbe',
          neutral: '#3d4451',
          'base-100': '#ffffff',
        },
      },
    ],
  },
  plugins: [require('daisyui'), require('@tailwindcss/line-clamp')],
}
