module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00E6A8",
        accent: "#7C5CFF",
        darkbg: "#071124",
      },
      fontFamily: {
        mono: ["Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
