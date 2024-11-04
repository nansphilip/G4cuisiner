import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(autocomplete|checkbox|slider|button|ripple|spinner|input|listbox|divider|popover|scroll-shadow).js",
  ],
  theme: {
    extend: {
      fontSize: {
        xxs: ["0.65rem", "0.875rem"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [nextui()],
};
export default config;
