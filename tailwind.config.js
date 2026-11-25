/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: { 950: '#07080c', 900: '#0b0d13', 800: '#12151e', 700: '#1b1f2b' },
        mint: { 300: '#6ee7b7', 400: '#34d399', 500: '#10b981' },
        iris: { 300: '#c4b5fd', 400: '#a78bfa', 500: '#8b5cf6' },
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        spinSlow: { to: { transform: 'rotate(360deg)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        blink: { '0%,100%': { opacity: 1 }, '50%': { opacity: 0 } },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'spin-slow': 'spinSlow 12s linear infinite',
        float: 'float 5s ease-in-out infinite',
        blink: 'blink 1s step-end infinite',
      },
    },
  },
  plugins: [],
}
