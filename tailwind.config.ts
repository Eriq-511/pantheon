import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        teal: {
          light:   '#CCFBF1',
          DEFAULT: '#0D9488',
          dark:    '#0F766E',
          deep:    '#134E4A',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          muted:   '#F8FAFC',
          alt:     '#F1F5F9',
        },
        border:  '#CBD5E1',
        text: {
          primary: '#0F172A',
          muted:   '#64748B',
        },
        admin: {
          sidebar: '#0F172A',
          bg:      '#F8FAFC',
          card:    '#FFFFFF',
        },
        status: {
          published: '#10B981',
          draft:     '#F59E0B',
          danger:    '#EF4444',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px 0 rgb(0 0 0 / 0.08)',
        nav:  '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      },
    },
  },
  plugins: [],
};

export default config;
