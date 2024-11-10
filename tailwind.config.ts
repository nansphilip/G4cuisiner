import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(autocomplete|checkbox|slider|popover|button|ripple|spinner|input|listbox|divider|scroll-shadow).js"
  ],
    theme: {
        extend: {
            fontSize: {
                xxs: ["0.65rem", "0.875rem"],
            },
            colors: {
                primary: "#f2c28a",
                secondary: "#fafaf5",
                tertiary: "#383d3e",
                quaternary: "#ffffff",
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
        },
    },
    plugins: [nextui()],
};
export default config;
