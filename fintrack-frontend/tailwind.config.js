/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a56db',
        success: '#057a55',
        danger: '#e02424',
        warning: '#ff5a1f',
        background: '#f9fafb',
        cardBg: '#ffffff',
        textPrimary: '#111827',
        textSecondary: '#6b7280',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
}
