/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: "var(--orange)",
        compliment: "var(--compliment)",
      },
      fontSize: {
        h1: "2.125rem", // 34px
        h2: "1.25rem", // 20px
        h3: "0.75rem", // 12px
      },
      fontFamily: {
        header: ["Work Sans", "sans-serif"],
      },
      textTransform: {
        uppercase: "uppercase",
      },
    },
  },
  variants: {},
  plugins: [
    function ({ addBase, config }) {
      addBase({
        h1: {
          fontFamily: "Work Sans, sans-serif",
          fontSize: "2.125rem", // equivalent to 34px
          color: "var(--orange)",
        },
        h2: {
          fontFamily: "Work Sans, sans-serif",
          fontSize: "1.25rem", // equivalent to 20px
          color: "var(--compliment)",
        },
        h3: {
          fontFamily: "Work Sans, sans-serif",
          fontSize: "0.75rem", // equivalent to 12px
          textTransform: "uppercase",
        },
      })
    },
  ],
}
