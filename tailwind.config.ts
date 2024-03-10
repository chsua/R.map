import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        bottomUp: {
          '100%': { transform: 'none' },
          '0%': { transform: 'translateY(100%)' },
        },
        bottomDown: {
          '0%': { transform: 'none' },
          '100%': { transform: 'translateY(100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        bottomUp: 'bottomUp 0.35s ease-in-out forwards',
        bottomDown: 'bottomDown 0.35s ease-in-out forwards',
        fadeIn: 'fadeIn 0.3s ease-in-out forwards',
        fadeOut: 'fadeOut 0.3s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};
export default config;
