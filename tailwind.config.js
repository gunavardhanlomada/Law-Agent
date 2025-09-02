/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src//*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        backgroundImage: {
          'diagonal-gradient': 'linear-gradient(135deg, #0C1721,  #406584)',
        },
        keyframes: {
          shine: {
            '0%': { backgroundPosition: '100%' },
            '100%': { backgroundPosition: '-100%' },
          },
        },
        animation: {
          shine: 'shine 5s linear infinite',
        },
      },
    },
    plugins: [],
  }