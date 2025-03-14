/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      title: ["Nourd", "system-ui"],
      text: ["Aileron", "system-ui"],
    },
    colors: {
      white : "#fff",
      black : "#12114a",
      blue: {
        50: "#ebf2ff",
        100: "#dbe6ff",
        200: "#bed0ff",
        300: "#97b0ff",
        400: "#6d83ff",
        500: "#4b57ff",
        600: "#2f2cff",
        700: "#2520e2",
        800: "#1f1db6",
        900: "#20218f",
        950: "#12114a",
      },
      yellow: {
        50: "#fffee7",
        100: "#ffffc1",
        200: "#fffa86",
        300: "#ffef41",
        400: "#ffdf0d",
        500: "#ffd000",
        600: "#d19800",
        700: "#a66d02",
        800: "#89540a",
        900: "#74450f",
        950: "#442404",
      },
      grey: {
        50: "#f4f5f9",
        100: "#ebeef4",
        200: "#dbdfea",
        300: "#c4cadd",
        400: "#abb2ce",
        500: "#9699be",
        600: "#7f80ac",
        700: "#64648c",
        800: "#59597a",
        900: "#4c4e63",
        950: "#2c2c3a",
      },
      green: {
        50: "#ecfdf5",
        100: "#d1fae5",
        200: "#a7f3d0",
        300: "#6ee7b7",
        400: "#34d399",
        500: "#10b981",
        600: "#059669",
        700: "#047857",
        800: "#065f46",
        900: "#064e3b",
        950: "#022c22",
      },
      red: {
        50: "#fef2f2",
        100: "#fee2e2",
        200: "#fecaca",
        300: "#fca5a5",
        400: "#f87171",
        500: "#ef4444",
        600: "#dc2626",
        700: "#b91c1c",
        800: "#991b1b",
        900: "#7f1d1d",
        950: "#450a0a",
      },
    },
    extend: {},
  },
  plugins: [],
};