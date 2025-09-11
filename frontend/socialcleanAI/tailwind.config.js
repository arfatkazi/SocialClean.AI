/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // must be "class"
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-dark": "rgb(22, 31, 48)", // <-- your custom color
      },
    },
  },
  plugins: [],
};
