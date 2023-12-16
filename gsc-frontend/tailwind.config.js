/** @type {import('tailwindcss').Config} */
import forms from "@tailwindcss/forms";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: { colors: {
      "card-neutral-bg": "#cbd5e1",
      "card-good-bg": "#6ee7b7",
      "card-bad-bg": "#fda4af" 
    },},
  },
  methods: {
    setViewHeight: function () {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    },
  },
  mounted: function () {
    this.setViewHeight();
    window.addEventListener("resize", () => {
      this.setViewHeight();
    });
  },
  plugins: [forms],
};
