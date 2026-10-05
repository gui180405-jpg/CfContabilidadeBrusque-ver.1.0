/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cf: {
          navy: '#131F39',
          blue: '#005F93',
          black: '#000000',
          background: '#F5F4F1',
          muted: '#6B7280',
          border: '#E2E6EC',
          'on-dark': '#F5F4F1',
        },
      },
      boxShadow: {
        soft: '0 24px 80px rgba(19, 31, 57, 0.20)',
      },
    },
  },
  plugins: [],
};
