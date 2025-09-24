/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        secondary: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
          950: '#500724',
        },
        accent: {
          50: '#fef7ff',
          100: '#fceeff',
          200: '#f8ddff',
          300: '#f2bbff',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
          950: '#4a044e',
        },
        gradient: {
          from: '#ef4444',
          via: '#ec4899',
          to: '#d946ef',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #ef4444 0%, #ec4899 50%, #d946ef 100%)',
        'card-gradient': 'linear-gradient(145deg, #fef2f2 0%, #fdf2f8 100%)',
        'dark-card-gradient': 'linear-gradient(145deg, #1f1f1f 0%, #2d1b2d 100%)',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
        },
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'gradient-y': {
          '0%, 100%': {
            transform: 'translateY(-50%)',
          },
          '50%': {
            transform: 'translateY(50%)',
          },
        },
        'gradient-x': {
          '0%, 100%': {
            transform: 'translateX(-50%)',
          },
          '50%': {
            transform: 'translateX(50%)',
          },
        },
        'gradient-xy': {
          '0%, 100%': {
            transform: 'translate(-50%, -50%)',
          },
          '25%': {
            transform: 'translate(50%, -50%)',
          },
          '50%': {
            transform: 'translate(50%, 50%)',
          },
          '75%': {
            transform: 'translate(-50%, 50%)',
          },
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
        'glow': {
          '0%': {
            boxShadow: '0 0 5px #ef4444, 0 0 10px #ef4444, 0 0 15px #ef4444',
          },
          '100%': {
            boxShadow: '0 0 10px #ef4444, 0 0 20px #ef4444, 0 0 30px #ef4444',
          },
        },
      },
    },
  },
  plugins: [],
}
