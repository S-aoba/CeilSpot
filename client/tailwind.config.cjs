/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'fade-in-fwd': 'fade-in-fwd 0.3s cubic-bezier(0.390, 0.575, 0.565, 1.000) both',
      },
      keyframes: {
        'fade-in-fwd': {
          '0%': {
            transform: 'translateZ(-1px)',
            opacity: '0',
          },
          to: {
            transform: 'translateZ(0)',
            opacity: '1',
          },
        },
      },
    },
    screens: {
      // レスポンシブのオーバーライド
      md: '600px',
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
          warning: '#ef4444',
        },
      },
    ],
  },
  plugins: [require('daisyui'), require('@tailwindcss/line-clamp')],
}
