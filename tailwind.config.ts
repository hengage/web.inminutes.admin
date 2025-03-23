/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: "var(--font-sans)",
        serif: "var(--font-serif)",
        mono: "var(--font-mono)",
        istok_web: ["Istok Web", "sans-serif"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        ctm: {
          background:"var(--ctm-background)",
          "background-muted":"var(--ctm-background-muted)",
          foreground:"var(--ctm-foreground)",
          "foreground-muted":"var(--ctm-foreground-muted)",
          primary:{
            "50": "var(--ctm-primary-50)",
          "100": "var(--ctm-primary-100)",
          "200": "var(--ctm-primary-200)",
          "300": "var(--ctm-primary-300)",
          "400": "var(--ctm-primary-400)",
          "500": "var(--ctm-primary-500)",
          "600": "var(--ctm-primary-600)",
          "700": "var(--ctm-primary-700)",
          },
          secondary:{
            "50": "var(--ctm-secondary-50)",
          "100": "var(--ctm-secondary-100)",
          "200": "var(--ctm-secondary-200)",
          "300": "var(--ctm-secondary-300)",
          "400": "var(--ctm-secondary-400)",
          "500": "var(--ctm-secondary-500)",
          },
          error:{
            default:"var(--ctm-error)",
            light:"var(--ctm-error-light)"
          },
          warning:{
            default:"var(--ctm-warning)",
            light:"var(--ctm-warning-light)"
          },
          success:{
            default:"var(--ctm-success)",
            light:"var(--ctm-success-light)"
          },
          "primary-colour-light": "var(--ctm-primary-colour-light)",
          "secondary-colour": "var(--ctm-secondary-colour)",
          "normal-grey": "var(--ctm-normal-grey)",
          "light-grey": "var(--ctm-light-grey)",
          "dark-grey": "var(--ctm-dark-grey)",
          "darker-grey": "var(--ctm-darker-grey)",
          black: "var(--ctm-black)",
          white: "var(--ctm-white)",
          "success-green": "var(--ctm-success-green)",
          "error-red": "var(--ctm-error-red)",
          shadow: "var(--ctm-shadow)",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"),require("daisyui")],
} satisfies Config;
