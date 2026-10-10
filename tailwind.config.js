/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#050D1A',
          black: '#02060D',
          surface: '#091528',
          card: '#0D1E36',
        },
        cyan: {
          DEFAULT: '#00E5F2',
          bright: '#38EFFF',
          deep: '#00B8D9',
          subtle: 'rgba(0, 229, 242, 0.12)',
          border: 'rgba(0, 229, 242, 0.35)',
        },
        editorial: {
          bg: '#F4F6F9',
          surface: '#FFFFFF',
          text: '#0F172A',
          muted: '#475569',
          border: '#E2E8F0',
          accent: '#0284C7',
        },
        amber: {
          warning: '#F59E0B',
        },
        aviation: {
          blue: '#0284C7',
        },
      },
      fontFamily: {
        brand: ['Sora', 'Space Grotesk', 'sans-serif'],
        nav: ['Sora', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        body: ['DM Sans', 'Inter', 'sans-serif'],
        mono: ['IBM Plex Mono', 'JetBrains Mono', 'monospace'],
      },
      maxWidth: {
        site: '1240px',
        narrow: '840px',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
      },
    },
  },
  plugins: [],
};
