import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import history from 'connect-history-api-fallback'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'html-history-fallback',
      configureServer(server) {
        server.middlewares.use(history());
      }
    }
  ]
})
