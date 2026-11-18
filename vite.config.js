import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function autoUpdateSitemapLastmod() {
  return {
    name: 'auto-update-sitemap-lastmod',
    buildStart() {
      try {
        const sitemapPath = path.resolve(__dirname, 'public/sitemap.xml')
        if (fs.existsSync(sitemapPath)) {
          const today = new Date().toISOString().slice(0, 10)
          const content = fs.readFileSync(sitemapPath, 'utf8')
          const updated = content.replace(
            /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g,
            `<lastmod>${today}</lastmod>`
          )
          if (updated !== content) {
            fs.writeFileSync(sitemapPath, updated, 'utf8')
          }
        }
      } catch {
        // Ignore write errors in read-only environments
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    autoUpdateSitemapLastmod(),
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
