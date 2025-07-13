/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#BA487F',
        primaryLight: '#e0a4c1',
        primaryDark: '#8a2b5a',
        primaryLighter: '#f0d4e1',
        primaryDarker: '#6b1a3f',
        accent: '#E1A8C7',
        accentLight: '#F2D1E0',
        accentDark: '#C78AA8',
        neutral: {
          50: '#faf9fa',
          100: '#f4f2f4',
          200: '#e8e4e8',
          300: '#d3ccd3',
          400: '#b5a8b5',
          500: '#978a97',
          600: '#7a6d7a',
          700: '#615661',
          800: '#4a414a',
          900: '#332d33',
        },
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};