/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f1f7f1',
          100: '#ddeedd',
          200: '#bddcbf',
          300: '#91c397',
          400: '#5fa269',
          500: '#3e8450',
          600: '#2e6a3d',
          700: '#265432',
          800: '#20432a',
          900: '#1c3825',
          950: '#0d2013',
        },
        sage: {
          50: '#f7f8f3',
          100: '#eef0e3',
          200: '#dcdFC4',
          300: '#c3c99c',
          400: '#a7b075',
          500: '#8d9658',
          600: '#717a47',
          700: '#575f39',
          800: '#464c31',
          900: '#3a4029',
        },
        earth: {
          50: '#fbf6f0',
          100: '#f3e6d6',
          200: '#e6cbab',
          300: '#d5a878',
          400: '#c68750',
          500: '#b86f3a',
          600: '#a25a2f',
          700: '#844628',
          800: '#6d3a26',
          900: '#5a3122',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 4px 24px -8px rgba(32, 67, 42, 0.18)',
        card: '0 8px 32px -12px rgba(32, 67, 42, 0.22)',
        lift: '0 16px 48px -16px rgba(32, 67, 42, 0.32)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-up': 'fadeUp 0.6s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
