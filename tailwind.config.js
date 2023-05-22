/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('../public/bgr.png')",
        "hero-pattern-1": "url('../public/Ellipse.png')",
      },
      screens: {
        sm: "640px",
        // => @media (min-width: 576px) { ... }

        md: "1024px",
        // => @media (min-width: 960px) { ... }

        lg: "1024px",
        // => @media (min-width: 1440px) { ... }
      },

      animation: {
        "appear-slow": "beat ease-in-out 0.3s",
        "appear-fast": "beat ease-in 0.4s",
        "appear-slow1": "beat1 ease-in 0.4s",
        "appear-slow2": "beat2 ease-in 0.8s",
        "height-slow": "height ease-in 0.3s",
        "height-slow1": "height ease-in 0.3s",
        "flash-slow": "flash  1s infinite",

      },

      keyframes: {
        height: {
          "0%": { height: "0" },
          "100%": { height: "100%" },
        },
        width: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
        beat: {
          "0%": { opacity: "0", transform: "scale(0)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        flash: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        beat1: {
          "0%": { opacity: "0", transform: "scale(0)" },
          "100%": { opacity: "1", transform: "scale(6.5)" },
        },
        beat2: {
          "0%": { opacity: "0", transform: "scale(0)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },

      boxShadow: {
        bong: "0px 0px 14px -4px rgba(0, 0, 0, 0.10)",
        bong1: "0px 0px 14px -4px #33B1CB",
        bong2: "inset 0px 4px 10px #33B1CB",
      },

      cursor: {
        point: "url(../public/pointing.svg), pointer",
      },

      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: {
          100: "#CCEBF2",
          500: "#009dbe",
        },
        ink: {
          100: "#6f767e",
          500: "#111315",
          300: "#272b30",
        },
        green: {
          100: "#F7FEF8",
          200: "#DCFADE",
          300: "#A9F5AB",
          400: "#4ED960",
          500: "#02BD3A",
        },
        red: {
          100: "#FFF7F5",
          200: "#FFE7E1",
          300: "#ffac9f",
          400: "#EF6851",
          500: "#DD0F05",
        },
        blue: {
          100: "#F2F9FF",
          200: "#E1EFFF",
          300: "#A2CBFF",
          400: "#509AFF",
          500: "#0065FF",
        },
        orange: {
          100: "#FFF9F5",
          200: "#FFF2E2",
          300: "#FFD0A5",
          400: "#FF9A54",
          500: "#FF6006",
        },
        white: {
          200: "#efefef",
          300: "#f4f4f4",
          500: "#ffffff",
        },
        ink: {
          100: "#6F767E",
        },
      },
    },
  },
  plugins: [],
};
