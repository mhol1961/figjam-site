/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FDF6EC',
        'warm-white': '#FEFBF4',
        burgundy: {
          DEFAULT: '#6B1D2A',
          light: '#8B2E3B',
        },
        gold: {
          DEFAULT: '#C4953A',
          light: '#D4A94C',
        },
        charcoal: '#2C2C2C',
        'warm-gray': '#6B6560',
        'light-gray': '#E8E2DA',
        sage: '#8B9A7B',
        fig: '#4A2040',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Cormorant Garamond', 'serif'],
        sans: ['Josefin Sans', 'sans-serif'],
      },
      fontSize: {
        'hero': 'clamp(42px, 7vw, 82px)',
        'section': 'clamp(32px, 4vw, 48px)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
