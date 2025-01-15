import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Carga las variables de ambiente según el modo
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    server: {
      host: true, // Permite conexiones desde cualquier IP
      port: parseInt(env.VITE_PORT || '5173'), // Puerto configurable
      strictPort: true, // Falla si el puerto no está disponible
      proxy: {
        '/api': {
          target: env.VITE_BACKEND,
          changeOrigin: true,
          secure: false,
        }
      },
      watch: {
        usePolling: true // Mejora la detección de cambios en algunos sistemas
      }
    }
  }
})
