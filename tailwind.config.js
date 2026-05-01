/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hacker: {
          bg: '#0a0e0a',
          surface: 'rgb(24 31 24)',
          border: '#47945b',
          // botder: 'rgb(62 109 62)',
          borderLight: '#3a4a3a',
          text: '#8a9a8a',
          textBright: '#aabaaa',
          accent: '#cc3333',
          accentBright: '#5a9a5a',
          accentRed: '#cc3333',
          accentBlue: 'rgb(65 69 203)',
        }
      },
      fontFamily: {
        mono: ['Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
