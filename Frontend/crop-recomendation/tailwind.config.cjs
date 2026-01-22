/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'farm-green': '#2E7D32',
        'farm-dark': '#1B5E20',
        'farm-light': '#4CAF50',
        'soil-brown': '#8D6E63',
        'sun-yellow': '#FFB300',
        'sky-blue': '#4FC3F7',
      },
      fontFamily: {
        'roboto-slab': ['Roboto Slab', 'serif'],
        'open-sans': ['Open Sans', 'sans-serif'],
      },
      backgroundImage: {
        'farm-pattern': "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')",
        'leaf-pattern': "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')",
      }
    },
  },
  plugins: [],
}