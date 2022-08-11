module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg": "var(--color-bg)",
        "font": "var(--color-font)",
        "accent-font": "var(--color-accent-font)",
        "accent": "var(--color-accent)",
        "danger": "var(--danger)",
        "btn-hover": "var(--btn-hover)",
        "e-1": "var(--color-bg-elevation-1)",
        "e-1-dark": "var(--color-bg-elevation-1-dark)",
        "e-2": "var(--color-bg-elevation-2)",
        "border": "var(--color-border)",
      },
      fontFamily: { "gotham-book": ["Gotham-Book"] },
      animation: {
        blob: "blob 7s infinite",
      },
      boxShadow: {
        "elevation-1": "0 0.1rem 0.2rem 0 rgba(0, 0, 0, 0.1)",
        "elevation-2": "0 0 0.5rem 0.1rem rgba(0, 0, 0, 0.3)",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: " translate(-5px, 10px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px)scale(1)",
          },
        },
      },
      gridTemplateColumns: {
        record: "repeat(auto-fill, minmax(9rem,1fr))",
      },
      gridAutoRows: {
        record: "17rem",
      },
    },
  },
  plugins: [],
};
