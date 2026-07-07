/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cf: {
          navy: '#0f172a',
          blue: '#0284c7',
          cyan: '#38bdf8',
        },
      },
      boxShadow: {
        soft: '0 24px 80px rgba(2, 8, 23, 0.35)',
      },
    },
  },
  plugins: [],
};
