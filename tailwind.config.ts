import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      "dark-mode-element": "hsl(209, 23%, 22%)",
      "dark-mode-background": "hsl(207, 26%, 17%)",
      "dark-mode-text": "hsl(0, 0%, 100%)",
      "light-mode-element": "hsl(0, 0%, 100%)",
      "light-mode-input": "hsl(0, 0%, 52%)",
      "light-mode-background": "hsl(0, 0%, 98%)",
      "light-mode-text": "hsl(200, 15%, 8%)",
      "translucid-black": "#0000005e",
      "transparent-black": " #19181F20",
    },
  },
  plugins: [],
};
export default config;
