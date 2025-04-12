// Tawilwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary': {
          '50': '#f0f9ff',
          '100': '#e0f2fe',
          '500': '#3b82f6',
          '600': '#2563eb',
          '700': '#1d4ed8',
        },
        'secondary': {
          '500': '#8b5cf6',
          '600': '#7c3aed',
        }
      },
      boxShadow: {
        'soft': '0 8px 32px rgba(0,0,0,0.05)',
        'hard': '0 4px 24px rgba(0,0,0,0.1)'
      },
    },
  },
  plugins: [],
}
