import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// For GitHub Pages: set base to "/<repo-name>/" if hosted at username.github.io/<repo-name>.
// Override at build with: VITE_BASE=/portfolio/ npm run build
const base = process.env.VITE_BASE || "/";

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
