
import type { Config } from "tailwindcss"
import { fontFamily } from "tailwindcss/defaultTheme"
import animatePlugin from "tailwindcss-animate"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "black-hole": "#090C15",
        "quantum-blue": "#4f00ff",
        "hologram-purple": "#8B5CF6",
        "plasma-pink": "#ff00e1",
        "ai-green": "#0CF4AB",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar))",
          foreground: "hsl(var(--sidebar-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
          accent: {
            DEFAULT: "hsl(var(--sidebar-accent))",
            foreground: "hsl(var(--sidebar-accent-foreground))",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        ripple: {
          "0%": { width: "0", height: "0", opacity: "0.8" },
          "100%": { width: "500px", height: "500px", opacity: "0" },
        },
        "pulse-neon": {
          "0%": { filter: "drop-shadow(0 0 5px var(--quantum-blue))" },
          "50%": { filter: "drop-shadow(0 0 15px var(--quantum-blue))" },
          "100%": { filter: "drop-shadow(0 0 5px var(--quantum-blue))" },
        },
        "dna-splice": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "50%": { opacity: "0.5" },
          "100%": { transform: "translateY(-100%)", opacity: "0" },
        },
        "anti-gravity": {
          "from": { transform: "translateY(100vh)" },
          "to": { transform: "translateY(0)" },
        },
        "plasma-pulse": {
          "0%": { filter: "drop-shadow(0 0 5px #4f00ff)" },
          "50%": { filter: "drop-shadow(0 0 20px #ff00e1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "ripple": "ripple 2s ease-out forwards",
        "pulse-neon": "pulse-neon 2s infinite",
        "dna-splice": "dna-splice 1.5s ease-in-out infinite",
        "anti-gravity": "anti-gravity 0.5s ease-out",
        "plasma-pulse": "plasma-pulse 2s infinite",
      },
    },
  },
  plugins: [animatePlugin],
} satisfies Config

export default config
