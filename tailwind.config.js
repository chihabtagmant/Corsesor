/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        animation: {
          'scroll-right': 'scroll-right 20s linear infinite',
        },
        keyframes: {
          'scroll-right': {
            '0%': { transform: 'translateX(-50%)' },
            '100%': { transform: 'translateX(0%)' },
          },
        },
      },
    },
    plugins: [],
  }