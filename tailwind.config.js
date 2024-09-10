/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: 16,
    },
    fontFamily: {
      roboto: "'Roboto', sans-serif",
    },
    colors: {
      primary: "#06b6d4",
      secondary: "#010101",
      white: "#ffffff",
      danger: "#f00",
    },
    extend: {},
  },
  plugins: [],
};
