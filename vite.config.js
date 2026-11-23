import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { seoPrerenderPlugin } from './scripts/seoPrerenderPlugin.mjs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    seoPrerenderPlugin(),
  ],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-icons': ['lucide-react', 'react-icons'],
          'vendor-three': ['three'],
        },
      },
    },
  },
})
