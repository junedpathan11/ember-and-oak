import type { Config } from "tailwindcss";

/**
 * Design tokens are declared as CSS variables in /app/globals.css and mapped
 * here so components can use semantic utilities (bg-bg, text-ink,
 * border-hairline, font-display) instead of hardcoded values.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        ink: "var(--color-ink)",
        muted: "var(--color-muted)",
        primary: "var(--color-primary)",
        hairline: "var(--color-hairline)",
      },
      borderColor: {
        DEFAULT: "var(--color-hairline)",
      },
      fontFamily: {
        display: "var(--font-display)",
        sans: "var(--font-body)",
      },
      borderRadius: {
        // Cards and images are square; buttons/inputs cap at 4px.
        button: "4px",
      },
      maxWidth: {
        shell: "80rem",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
