/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cf: {
          navy: 'rgb(var(--cf-navy-rgb) / <alpha-value>)',
          blue: 'rgb(var(--cf-blue-rgb) / <alpha-value>)',
          'blue-dark': 'rgb(var(--cf-blue-dark-rgb) / <alpha-value>)',
          black: 'rgb(var(--cf-black-rgb) / <alpha-value>)',
          background: 'rgb(var(--cf-background-rgb) / <alpha-value>)',
          offwhite: 'rgb(var(--cf-offwhite-rgb) / <alpha-value>)',
          soft: 'rgb(var(--cf-soft-rgb) / <alpha-value>)',
          text: 'rgb(var(--cf-text-rgb) / <alpha-value>)',
          muted: 'rgb(var(--cf-muted-rgb) / <alpha-value>)',
          border: 'rgb(var(--cf-border-rgb) / <alpha-value>)',
          'on-dark': 'rgb(var(--cf-on-dark-rgb) / <alpha-value>)',
        },
      },
      boxShadow: {
        soft: '0 24px 80px rgb(14 32 52 / 0.14)', // sombra em azul escuro
      },
      transitionTimingFunction: {
        cf: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
