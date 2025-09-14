import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // ⚡ Netlify & Vercel → selalu '/'
  build: {
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 5174,
    strictPort: true,
  },
})
