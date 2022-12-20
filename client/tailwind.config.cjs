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
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          info:"#2563eb"
        },
      },
    ],
  },
  plugins: [require('daisyui'), require('@tailwindcss/line-clamp')],
}
