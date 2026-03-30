import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // 🟢 Ajoute cette ligne pour forcer les chemins absolus
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})