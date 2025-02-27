import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
//@ts-expect-error: can't find ts definition for this package
import path from "path";
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      //@ts-expect-error: __dirname is not somehow included in ts
      "@": path.resolve(__dirname, "./"),
    },
  },
});
