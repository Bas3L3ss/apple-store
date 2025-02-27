import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
//@ts-expect-error
import path from "path";
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      //@ts-expect-error
      "@": path.resolve(__dirname, "./"),
    },
  },
});
