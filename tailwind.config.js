/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        body: ["Inter", "sans-serif"],
        subHead: ["Fira Sans", "san-serif"],
        heading: ["Chakra Petch", "san-serif"],
        mono: ["DM Mono", "san-serif"],
      },
      colors: {
        primary: "#D5B263",
        primaryDark: "#997d3d",
        primaryLight: "#e3ca91",
        color1: "#8967b3",
        color2: "#1f4072",
        darkColor: "#212529",
        darkColorLight: "#343a40",
        lightColor: "#e5e5e5",
        lightColor2: "#f8f9fa"
      },
    },
  },
  plugins: [],
};
