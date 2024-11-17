import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
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
            animation: {
                "rotate-y-and-fade": "rotateYAndFade 1s ease-in-out forwards",
            },
            keyframes: {
                rotateYAndFade: {
                    "0%": {
                        transform: "rotateY(0deg)",
                        opacity: "1",
                    },
                    "100%": {
                        transform: "rotateY(180deg)",
                        opacity: "0",
                    },
                },
            },
        },
    },
    darkMode: "class",
    plugins: [nextui()],
} satisfies Config;
