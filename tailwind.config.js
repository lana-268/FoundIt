/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#10233f',
        cream: '#fbfaf6',
        brand: {
          50: '#eef6ff',
          100: '#d9ebff',
          500: '#2878e8',
          600: '#1764cf',
          700: '#1450a5'
        }
      },
      boxShadow: {
        card: '0 14px 38px rgba(16, 35, 63, 0.08)'
      }
    }
  },
  plugins: []
};
