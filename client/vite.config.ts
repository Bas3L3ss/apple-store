import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// @ts-expect-error:no prob
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // @ts-expect-error:no prob
      "@": path.resolve(__dirname, "./"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        plugins: [visualizer({ open: true, filename: "stats.html" })],
      },
    },
  },
});
