/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FF6A3D",
          hover: "#C4592E",
          soft: "#F2B15C",
        },
        beige: {
          base: "#F7F1E7",
          surface: "#EFE4D3",
          hover: "#E4D6BE",
          border: "#DDD0BA",
        },
        ink: {
          primary: "#2B241C",
          secondary: "#6E6153",
          tertiary: "#948572",
        }
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
