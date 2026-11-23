import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { createServer } from 'vite'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const server = await createServer({
  configFile: path.join(root, 'vite.config.ts'),
  root,
  server: { middlewareMode: true },
  appType: 'custom',
})

try {
  const { default: App } = await server.ssrLoadModule('/src/App.tsx')
  const markup = renderToString(React.createElement(App))
  const outputPath = path.join(root, 'dist', 'index.html')
  const manifestPath = path.join(root, 'dist', '.vite', 'manifest.json')
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'))
  const assets = new Map(
    Object.entries(manifest).map(([source, entry]) => [source.replaceAll('\\', '/'), entry.file]),
  )
  const html = await readFile(outputPath, 'utf8')
  const withBuiltAssets = markup.replaceAll(/\/src\/assets\/[^"'\s)>]+/g, (url) => {
    const key = url.slice(1)
    const built = assets.get(key)
    return built ? `/${built}` : url
  })
  const prerendered = html.replace(
    '<div id="root"></div>',
    `<div id="root">${withBuiltAssets}</div>`,
  )
  if (prerendered === html) throw new Error('No se encontró el contenedor #root en dist/index.html')
  await writeFile(outputPath, prerendered)

  const { whatsappUrl } = await server.ssrLoadModule('/src/config/contact.ts')
  await writeFile(path.join(root, 'dist', '404.html'), notFoundPage(html, whatsappUrl()))
} finally {
  await server.close()
}

/**
 * Página 404 estática a partir del HTML del build: conserva los estilos y las fuentes, pero quita
 * el JavaScript (no hay nada que hidratar), el canonical, Open Graph y los datos estructurados, y
 * pide a Google que no la indexe. La sirve el Caddyfile para cualquier URL que no exista.
 */
function notFoundPage(html, whatsappHref) {
  const logo = html.match(/<link rel="icon"[^>]*href="([^"]+)"/)?.[1] ?? ''
  const head = html
    .replace(/<title>[\s\S]*?<\/title>/, '<title>Página no encontrada | Odontomark</title>')
    .replace(/\s*<meta\s+name="description"[\s\S]*?\/>/, '')
    .replace(/\s*<meta\s+name="robots"[^>]*>/, '\n    <meta name="robots" content="noindex" />')
    .replace(/\s*<link rel="canonical"[^>]*>/, '')
    .replace(/\s*<meta\s+(property="og:|name="twitter:)[\s\S]*?\/>/g, '')
    .replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '')
    .replace(/\s*<script type="module"[^>]*><\/script>/, '')
  const body = `<main class="not-found">
      <div class="wrap">
        ${logo ? `<a href="/" class="not-found-logo"><img src="${logo}" alt="Clínica Dental Odontomark" width="96" height="96" /></a>` : ''}
        <span class="kicker">Error 404</span>
        <h1>No encontramos esta página.</h1>
        <p>Puede que el enlace esté mal escrito o que la página ya no exista. Vuelve al inicio o escríbenos y te ayudamos a agendar tu cita.</p>
        <div class="hero-actions">
          <a class="btn btn-lg" href="/">Ir al inicio</a>
          <a class="btn btn-ghost btn-lg" href="${whatsappHref}" target="_blank" rel="noopener noreferrer">Escríbenos por WhatsApp</a>
        </div>
      </div>
    </main>`
  const page = head.replace('<div id="root"></div>', body)
  if (page === head) throw new Error('No se pudo generar dist/404.html')
  return page
}
