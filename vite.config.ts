import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig(({ command }) => {
  // Define o 'base' com base no comando, o que é mais confiável que 'mode'.
  
  // Se for comando de build ('npm run build' na Vercel), força a raiz ('/').
  // Caso contrário ('npm run dev' local), usa o subcaminho.
  const isProdBuild = command === 'build';

  // Se você precisa do subcaminho local, use-o aqui no 'basePath'.
  const basePath = isProdBuild ? '/' : '/front-end-Kataplum/';
  
  return {
    plugins: [react(), tailwindcss()],
    base: basePath, // Aplica a base dinâmica
    
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
