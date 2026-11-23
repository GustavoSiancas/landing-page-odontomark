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
} finally {
  await server.close()
}
