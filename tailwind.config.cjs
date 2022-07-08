/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "0 15px 25px rgba(0, 0, 0, 0.6)",
      },
      colors: {
        principalColor: "#141e30",
        secondaryColor: "#243b55",
        whiteColor: "#c6c6c6",
        errorColor: "#F20000",
      },
    },
  },
  plugins: [],
};
