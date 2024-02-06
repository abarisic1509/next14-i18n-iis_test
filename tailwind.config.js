/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      poppins: ["var(--font-poppins)", "sans-serif"],
      montserrat: ['var(--font-montserrat)', "sans-serif"],
    },
    extend: {
      colors: {
        primary: {
          100: "#FEEDEC",
          200: "#FBB9B7",
          300: "#F87E79",
          400: "#EC3624",
          500: "#AD2517",
          600: "#71150B",
          700: "#3B0603",
        },
        blueZ: {
          10: "#EBF4FF",
          20: "#D6EAFF",
          30: "#ADD5FF",
          40: "#70B5FF",
          50: "#0059B8",
          80: "#002F62",
          90: "#000A14",
          100: "#F0EFFE",
          200: "#C8C5FB",
          300: "#9F98F8",
          400: "#776BF4",
          500: "#5035ED",
          600: "#3016AC",
          700: "#16075E",
          900: "#0D2034"
        },
        purpleZ: {
          100: "#F4EEFE",
          200: "#DBC7FA",
          300: "#C095F6",
          400: "#A85DF1",
          500: "#8927D3",
          600: "#5B178E",
          700: "#31084F",
        },
        pinkZ: {
          100: "#FAD1EF",
          200: "#F595DF",
          300: "#F046D1",
          400: "#B92DA0",
          500: "#811C6F",
          600: "#4D0D41",
          700: "#25031E",
        },
        neutralZ: {
          10: "#FFFFFF",
          20: "#DBDFE3",
          40: "#C6CBD0",
          50: "#A5ACB3",
        },
      }
    },
  },
  plugins: [],
};
