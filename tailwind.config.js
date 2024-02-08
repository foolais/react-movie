/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(245,197,24)",
        secondary: "rgb(18,18,18)",
        tertiary: "rgb(200,200,200)",
      },
    },
  },
  plugins: [],
};
