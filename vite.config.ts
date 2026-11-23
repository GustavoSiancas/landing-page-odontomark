import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import pkg from './package.json' with { type: 'json' }

/** Dominio público por defecto. Se puede cambiar con la variable de entorno SITE_URL. */
const DEFAULT_SITE_URL = 'https://odontomark.pe'

/**
 * Reemplaza `%SITE_URL%` en index.html (canonical, Open Graph, JSON-LD) y genera
 * robots.txt y sitemap.xml en el build con el dominio configurado.
 */
function siteUrl(url: string): Plugin {
  return {
    name: 'odontomark-site-url',
    transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', url),
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${url}/sitemap.xml\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${url}/</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
  </url>
</urlset>
`,
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')
  const url = (env.SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, '')
  // Versión visible en el footer: "1.0.0" en package.json se muestra como "1.0".
  const appVersion = pkg.version.split('.').slice(0, 2).join('.')
  return {
    plugins: [react(), siteUrl(url)],
    define: { __APP_VERSION__: JSON.stringify(appVersion) },
    build: { manifest: true },
  }
})
