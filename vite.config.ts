import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
const desktopDevCsp: Plugin = {
  name: "desktop-dev-csp",
  apply: "serve",
  transformIndexHtml: (html) =>
    html.replace(/<meta\s+http-equiv="Content-Security-Policy"[\s\S]*?>/i, ""),
};
export default defineConfig({
  base: "./",
  plugins: [react(), desktopDevCsp],
  build: { outDir: process.env.LEARNING_OUT_DIR || "dist", emptyOutDir: true },
  define: {
    __LEARNING_LANGUAGE__: JSON.stringify(process.env.LEARNING_LANGUAGE || "c"),
    "import.meta.env.VITE_LANGUAGE": JSON.stringify(process.env.LEARNING_LANGUAGE || "c"),
  },
});
