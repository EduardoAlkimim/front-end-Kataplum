import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"   // ← FALTAVA ISSO

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "'/front-end-Kataplum/", // OBRIGATÓRIO NA VERCEL
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
  },
});
