import react from "@vitejs/plugin-react";
import { config } from "dotenv";
import { defineConfig } from "vite";

config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": process.env,
  },
});
