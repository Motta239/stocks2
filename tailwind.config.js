/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      sm: "950px",
      // => @media (min-width: 576px) { ... }

      md: "1024px",
      // => @media (min-width: 768px) { ... }

      lg: "1200px",
      // => @media (min-width: 992px) { ... }
    },
  },
  plugins: [require("daisyui")],
};
