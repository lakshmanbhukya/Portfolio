/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "neo-yellow": "#FBFF48",
        "neo-pink": "#FF00FF",
        "neo-blue": "#00FFFF",
        "neo-green": "#00FF00",
        "neo-purple": "#8A2BE2",
        "neo-orange": "#FF9F1C",
        "neo-red": "#FF2A2A",
        "neo-white": "#FFFDF5",
        "neo-black": "#121212",
      },
      fontFamily: {
        display: ['"Lexend"', "sans-serif"],
        body: ['"Public Sans"', "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      boxShadow: {
        hard: "4px 4px 0px 0px #000",
        "hard-sm": "2px 2px 0px 0px #000",
        "hard-lg": "10px 10px 0px 0px #000",
        "hard-xl": "16px 16px 0px 0px #000",        
      },
    },
  },
  plugins: [],
};
