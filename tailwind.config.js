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
      backgroundImage: {
        gradient: "linear-gradient(0deg, #171717FF 20%, #17171700 100%);",
        "gradient-small":
          "linear-gradient(0deg, #171717FF 10%, #17171700 50%);",
        "gradient-slider":
          "linear-gradient(270deg, #171717FF 0%, #17171700 100%);",
      },
    },
  },
  plugins: [],
};
