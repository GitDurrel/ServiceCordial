import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  base: './', // pour que le site fonctionne en local dans XAMPP
  build: {
    outDir: 'dist', // dossier final
    assetsDir: 'assets', // dossier pour JS, CSS et images (par défaut)
    rollupOptions: {
      output: {
        // Ici, on peut redéfinir comment Vite nomme et range les fichiers
        assetFileNames: (assetInfo) => {
          if (/\.(png|jpe?g|gif|svg|webp)$/.test(assetInfo.name)) {
            return 'images/[name]-[hash][extname]' // toutes les images dans /images
          }
          if (/\.css$/.test(assetInfo.name)) {
            return 'assets/css/[name]-[hash][extname]'
          }
          if (/\.js$/.test(assetInfo.name)) {
            return 'assets/js/[name]-[hash][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        }
      }
    }
  }
})
