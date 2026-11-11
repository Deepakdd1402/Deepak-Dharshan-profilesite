import type { Config } from 'tailwindcss';

/**
 * Design tokens borrowed from the Salesforce Lightning Design System (SLDS):
 * brand blue #0176D3 / #1B96FF / #014486, grays #F3F2F2 → #DDDBDA, success
 * green #2E844A. Layout patterns (record header, Path chevrons, icon rail)
 * come from Salesforce and Zoho CRM.
 */
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#EEF4FF',
          100: '#D8E6FE',
          400: '#1B96FF',
          500: '#0176D3',
          600: '#0B5CAB',
          700: '#014486',
          900: '#032D60',
        },
        sf: {
          success: '#2E844A',
          warning: '#DD7A01',
          error: '#BA0517',
          g1: '#FFFFFF',
          g2: '#FAFAF9',
          g3: '#F3F2F2',
          g4: '#ECEBEA',
          g5: '#DDDBDA',
          weak: '#706E6B',
          ink: '#181818',
        },
      },
      screens: {
        md: '916px',
      },
      boxShadow: {
        widget:
          '0 1px 2px rgba(16,24,40,.06), 0 10px 30px -12px rgba(16,24,40,.18)',
        window:
          '0 0 0 .5px rgba(0,0,0,.25), 0 22px 60px -12px rgba(16,24,40,.35)',
      },
    },
  },
  plugins: [],
};

export default config;
