/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "verde-principal": "#72aa00",
        "verde-dos": "#181d27",
        "Gris": "#d1d1d1",
        "cafe": "#7d6e66",
        "cafe-oscuro": "#2c201c",
        "verde": "#72aa29",
        "gris-claro": "#f7f7f7",
        "gris-oscuro": "#999999",
      },
      height: {
        "1/8": "12.5%",
        "2/8": "25%",
        "3/8": "37.5%",
        "4/8": "50%",
        "5/8": "62.5%",
        "6/8": "75%",
        "7/8": "87.5%",
        "8/8": "100%",
      },
    },
  },
  plugins: [],
};
