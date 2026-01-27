import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: "#0b1220",
          800: "#101b2e",
          700: "#13233b",
          600: "#1b3356"
        },
        sky: {
          100: "#e6f1ff",
          200: "#c7ddff",
          300: "#9fc3ff"
        }
      },
      boxShadow: {
        card: "0 20px 50px -30px rgba(15, 23, 42, 0.6)",
        soft: "0 12px 30px -18px rgba(15, 23, 42, 0.5)"
      },
      backgroundImage: {
        "hero-gradient": "radial-gradient(circle at top, rgba(70, 130, 180, 0.25), transparent 55%), linear-gradient(135deg, #0b1220 0%, #101b2e 60%, #0b1220 100%)"
      }
    }
  },
  plugins: []
};

export default config;
