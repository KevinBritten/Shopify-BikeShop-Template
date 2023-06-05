/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  //TODO: use only add base
  theme: {
    extend: {
      colors: {
        orange: "var(--orange)",
        compliment: "var(--compliment)",
        "light-bg": "var(--light-bg)",
      },
      fontSize: {
        h1: "2.25rem", // 34px
        h2: "1.25rem", // 20px
        h3: "0.75rem", // 12px
      },
      lineHeight: {
        h1: "2.5rem",
      },
      fontFamily: {
        header: ["Work Sans", "sans-serif"],
      },
      textTransform: {
        uppercase: "uppercase",
      },
      fontWeight: {
        bold: "800",
      },
    },
  },
  variants: {},
  plugins: [
    //TODO: add base using media queries
    function ({ addBase }) {
      addBase({
        h1: {
          fontFamily: "Work Sans, sans-serif",
          fontSize: "2.125rem", // equivalent to 34px
          lineHeight: "2.5rem",
          color: "var(--orange)",
          fontWeight: "800",
        },
        h2: {
          fontFamily: "Work Sans, sans-serif",
          fontSize: "1.5rem", // equivalent to 20px,
          lineHeight: "2rem",
          fontWeight: "800",
        },
        h3: {
          fontFamily: "Work Sans, sans-serif",
          fontSize: "0.75rem", // equivalent to 12px
          color: "var(--compliment)",

          textTransform: "uppercase",
        },
      })
    },
  ],
}
