/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}", "./public/index.html"],
  theme: {
    screens: {
      "2xl": { max: "1535px" },

      xl: { max: "1279px" },

      lg: { max: "1023px" },

      md: { max: "767px" },

      sm: { max: "639px" },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      neutral: {
        "01": "#DAD9DA",
        "02": "#CECECE",
        "02": "#E6E6E6",
        "05": "#132d46"
      },
      primary: {
        "01": "#132D46"
      },
      gray: {
        "01": "#898888",
        "02": "#626161"
      },

      success: "#1CCB57",
      faint: "#FDFDFD",
      pending: "#FAC91C",
      warning: "#FAC91C",
      information: "#65B7E9",
      black: {
        "01": "#FAFAFA",
        "02": "#3D3C3C",
        "03": "#1C0000",
        "04": "#1B1B1B",
        "05": "#1B1B1B",
        "06": "#1C0000",
        "07": "#170000",
      },
    },
    fontSize: {
      h1: "12px",
      h2: "14px",
      h3: "16px",
      h4: "24px",
      h5: "28px",
      h6: "38px",
      h7: "44px",
    },
    fontFamily: {
       poppins: ["Poppins", "sans-serif"],
    },

    lineHeight: {
      l1: "76px",
      l2: "56px",
      l3: "36px",
      l4: "32px",
      l5: "28px",
      l6: "20px",
      l7: "16px",
    },
    extend: {
      boxShadow: {
        small:
          "0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13)",
      },
      backgroundImage: {
        "gradient-blue":
          "linear-gradient(177.54deg, #FFEE5B -9.26%, #5789DD 63.56%)",
        "gradient-red":
          "linear-gradient(177.54deg, #FFEE5B -9.26%, #ED2B2B 63.56%)",
      },
    },
  },
  plugins: [],
};
