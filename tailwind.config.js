/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      clash: ["Clash"],
    },
    extend: {
      colors: {
        ruby: "#B9090B",
      },
    },
  },
  plugins: [],
};
