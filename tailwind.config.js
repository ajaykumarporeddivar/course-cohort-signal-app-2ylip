/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'brand-50': '#f8fafc',
        'brand-100': '#f1f5f9',
        'brand-500': '#3b82f6', // A vibrant blue for primary actions
        'brand-600': '#2563eb', // Darker blue for hover states
        'accent-500': '#10b981', // A green for positive actions/success
        'danger-500': '#ef4444', // Red for at-risk learners/warnings
        'warning-500': '#f59e0b', // Orange for moderate risks
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}