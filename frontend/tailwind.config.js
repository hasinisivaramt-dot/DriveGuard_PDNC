/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        maroon: {
          50: "#fbf2f4",
          100: "#f3dde3",
          200: "#e3b3c0",
          300: "#cd7f96",
          400: "#b04d6b",
          500: "#8f2f4d",
          600: "#7a1129",
          700: "#650e22",
          800: "#520d1c",
          900: "#450c19",
          950: "#2a0510",
        },
        gold: {
          50: "#fdf8ec",
          100: "#faedc7",
          200: "#f4d98a",
          300: "#edc04d",
          400: "#e5aa27",
          500: "#d4941a",
          600: "#b57414",
          700: "#915414",
          800: "#784318",
          900: "#663818",
        },
      },
      fontFamily: {
        display: ["'Sora'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
      boxShadow: {
        glass: "0 20px 45px -15px rgba(122, 17, 41, 0.25)",
        card: "0 10px 30px -12px rgba(23, 15, 18, 0.15)",
      },
      backgroundImage: {
        "radial-fade":
          "radial-gradient(circle at 50% 50%, rgba(212,148,26,0.16), transparent 70%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        "spin-slow": "spin-slow 24s linear infinite",
      },
    },
  },
  plugins: [],
};
