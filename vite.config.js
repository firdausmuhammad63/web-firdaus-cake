import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // ⚡ penting untuk GitHub Pages (nama repo)
  build: {
    chunkSizeWarningLimit: 1000, // biar warning >500kb nggak ganggu
  },
  server: {
    port: 5174,
    strictPort: true, // kalau 5173 kepakai, langsung error, gak pindah ke port lain
  },
})
