/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#07111F",
        deep: "#102A43",
        electric: "#00A3FF",
        pitch: "#00C853",
        winner: "#FFD166",
      },
      fontFamily: {
        display: ["Sora", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(0,163,255,.15)",
        green: "0 0 32px rgba(0,200,83,.12)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        pulseSoft: "pulseSoft 3s ease-in-out infinite",
      },
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
        pulseSoft: { "0%,100%": { opacity: ".55" }, "50%": { opacity: "1" } },
      },
    },
  },
  plugins: [],
};
