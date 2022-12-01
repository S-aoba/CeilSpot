/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'fade-in-fwd': 'fade-in-fwd 0.3s cubic-bezier(0.390, 0.575, 0.565, 1.000)   both',
        'shadow-pop-bl': 'shadow-pop-bl 0.3s cubic-bezier(0.470, 0.000, 0.745, 0.715)   both',
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
        'shadow-pop-bl': {
          '0%': {
            'box-shadow':
              '0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e',
            transform: 'translateX(0) translateY(0)',
          },
          to: {
            'box-shadow':
              '-1px 1px #3e3e3e, -2px 2px #3e3e3e, -3px 3px #3e3e3e, -4px 4px #3e3e3e, -5px 5px #3e3e3e, -6px 6px #3e3e3e, -7px 7px #3e3e3e, -8px 8px #3e3e3e',
            transform: 'translateX(8px) translateY(-8px)',
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
