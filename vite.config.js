import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { imagetools } from 'vite-imagetools'
import { visualizer } from 'rollup-plugin-visualizer'
import { writeFile } from 'node:fs/promises'
import { SITE_ROUTES, SITE_URL } from './src/data/routes-list.js'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    imagetools(),
    visualizer({ filename: 'stats.html', gzipSize: true, template: 'treemap' }),
  ],
  server: {
    port: 5173,
  },
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (
            id.includes('react-router') ||
            id.includes('react-dom') ||
            id.includes('/react/')
          ) {
            return 'vendor-react'
          }
          if (id.includes('embla')) return 'vendor-embla'
          if (id.includes('lightbox')) return 'vendor-lightbox'
          return 'vendor'
        },
      },
    },
  },
  ssgOptions: {
    entry: 'src/main.jsx',
    dirStyle: 'flat',
    script: 'defer',
    beastiesOptions: { preload: 'swap', fonts: false },
    includedRoutes: () => SITE_ROUTES,
    onFinished: async (dir) => {
      const urls = SITE_ROUTES.map(
        (path) => `  <url><loc>${SITE_URL}${path}</loc></url>`,
      ).join('\n')
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
      await writeFile(`${dir}/sitemap.xml`, sitemap, 'utf8')
    },
  },
})
