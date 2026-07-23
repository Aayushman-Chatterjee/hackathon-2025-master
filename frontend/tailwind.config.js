/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      animation: {
        bounceEgg: "bounceUpDown 1.5s ease-in-out infinite",
      },
      keyframes: {
        bounceUpDown: {
          "0%": {
            transform: "translateY(0)", // Starting position at the center
          },
          "50%": {
            transform: "translateY(-20px)", // Moving upwards
          },
          "100%": {
            transform: "translateY(0)", // Moving back to the center
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        melrose: {
          50: "#f3f3ff",
          100: "#ebeafd",
          200: "#d8d8fc",
          300: "#b8b6fa",
          400: "#978ff6",
          500: "#7462f0",
          600: "#6041e6",
          700: "#522fd2",
          800: "#4327b0",
          900: "#392290",
          950: "#211362",
        },
        cerulean: {
          50: "#ecf8ff",
          100: "#d5eeff",
          200: "#b5e3ff",
          300: "#82d3ff",
          400: "#48b7ff",
          500: "#1d95ff",
          600: "#0674ff",
          700: "#005df6",
          800: "#074ac6",
          900: "#0d439b",
          950: "#0d295e",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
