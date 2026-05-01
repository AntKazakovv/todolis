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
          surface: '#111511',
          border: '#2a3a2a',
          borderLight: '#3a4a3a',
          text: '#8a9a8a',
          textBright: '#aabaaa',
          accent: '#4a7a4a',
          accentBright: '#5a9a5a',
        }
      },
      fontFamily: {
        mono: ['Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
