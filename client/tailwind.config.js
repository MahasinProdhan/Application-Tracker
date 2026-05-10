/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        app: {
          background: "#fcf8fa",
          surface: "#ffffff",
          "surface-low": "#f6f3f5",
          "surface-container": "#f0edef",
          "surface-variant": "#e4e2e4",
          outline: "#c6c6cd",
          "outline-strong": "#76777d",
          text: "#1b1b1d",
          muted: "#45464d",
          primary: "#131b2e",
          "primary-soft": "#dae2fd",
          secondary: "#505f76",
          "secondary-soft": "#d3e4fe",
        },
      },
      boxShadow: {
        panel: "0 4px 12px rgba(15, 23, 42, 0.04)",
      },
    },
  },
  plugins: [],
};
