import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig(({ mode }) => {
  // Define o 'base' dinamicamente.
  // Se estiver em modo 'development' (npm run dev), usa o subcaminho.
  // Se estiver em modo 'production' (npm run build/Vercel), usa a raiz (/).
  const base = mode === 'development' 
    ? '/front-end-Kataplum/' 
    : '/'; // Garante que na Vercel o path seja a raiz

  return {
    plugins: [react(), tailwindcss()],
    base: base, // Aplica a base dinâmica
    
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    
    build: {
      outDir: 'dist', 
    }
  }
});