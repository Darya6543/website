import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#f5efe2',
        'banner-cream': '#faf6e8',
        'border-tan': '#f5e6c4',
        ink: '#2a251f',
        'soft-ink': '#3a3528',
        moss: '#3d5a2c',
        sage: '#5b6b3a',
        berry: '#7a2942',
        rust: '#9a4b2c',
        tan: '#a86b2c',
        ochre: '#b88a2c',
        olive: '#7a7a2c',
      },
      fontFamily: {
        instrument: ['var(--font-instrument)', 'serif'],
        fraunces: ['var(--font-fraunces)', 'serif'],
        caveat: ['var(--font-caveat)', 'cursive'],
        mono: ['var(--font-dm-mono)', 'monospace'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
