/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(245,197,24)",
        secondary: "rgba(18,18,18)",
        textPrimary: "rgb(100,100,100)",
      },
    },
  },
  plugins: [],
};
