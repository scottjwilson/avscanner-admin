module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        brand: ["Karla"],
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
};
