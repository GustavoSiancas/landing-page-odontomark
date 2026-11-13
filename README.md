# Landing page Odontomark

Aplicación React + TypeScript construida con Vite.

```bash
npm install
npm run dev
```

El contenido está en `src/data/content.ts` y la configuración de WhatsApp en `src/config/contact.ts`.

## Dominio y SEO

El dominio público se usa en el canonical, Open Graph (`og:image`), el JSON-LD, `robots.txt` y
`sitemap.xml`. Por defecto es `https://odontomark.pe` (definido en `vite.config.ts`). Para usar otro
dominio en el build:

```bash
SITE_URL=https://www.otro-dominio.pe npm run build
```

- `public/og-image.jpg` (1200×630): vista previa al compartir el enlace por WhatsApp o redes.
- `public/apple-touch-icon.png`: ícono al guardar la web en la pantalla de inicio del celular.
- `robots.txt` y `sitemap.xml` se generan automáticamente en el build.

## Recursos multimedia

- `src/assets/videos/source`: videos originales, no se incluyen en el build.
- `src/assets/videos/desktop`: clips de 9 s en WebM VP9 y MP4 H.264, 432×768 y 24 fps (~0,5–0,65 MB).
- `src/assets/videos/mobile`: clips de 9 s en WebM VP9 y MP4 H.264, 360×640 y 20 fps (~0,3–0,45 MB).
- `src/assets/videos/posters`: portadas WebP para conexiones limitadas y carga progresiva.
- `src/assets/photos/doctors/source`: fotografías PNG originales.
- `src/assets/photos/doctors/optimized`: fotografías WebP utilizadas por la web.

La portada selecciona automáticamente una experiencia estática, móvil o de escritorio usando
preferencias de movimiento, ahorro de datos, tipo de conexión, memoria aproximada, núcleos y ancho
de pantalla. Los videos fuera del viewport permanecen pausados y, en móvil, la rotación se detiene
después de mostrar cada video una vez.

Para retirar un video de la portada, borra sus archivos de `desktop/`, `mobile/` y `posters/`; el
original se conserva en `source/`. Comandos usados para generar los clips (requiere un ffmpeg con
libx264, por ejemplo el build "full" de gyan.dev):

```bash
# Escritorio
ffmpeg -i entrada.mp4 -an -vf scale=432:768:flags=lanczos -r 24 -c:v libx264 -preset slow -crf 26 -maxrate 550k -bufsize 1100k -pix_fmt yuv420p -movflags +faststart desktop/video-N.mp4
ffmpeg -i entrada.mp4 -an -vf scale=432:768:flags=lanczos -r 24 -c:v libvpx-vp9 -crf 36 -b:v 450k -row-mt 1 desktop/video-N.webm
# Móvil
ffmpeg -i entrada.mp4 -an -vf scale=360:640:flags=lanczos -r 20 -c:v libx264 -preset slow -crf 27 -maxrate 380k -bufsize 760k -pix_fmt yuv420p -movflags +faststart mobile/video-N.mp4
ffmpeg -i entrada.mp4 -an -vf scale=360:640:flags=lanczos -r 20 -c:v libvpx-vp9 -crf 37 -b:v 320k -row-mt 1 mobile/video-N.webm
```

## Calidad de código

```bash
npm run format        # Formatea todo el código fuente
npm run format:check  # Comprueba el formato sin modificar archivos
npm run lint          # Ejecuta el análisis estático
npm run build         # Valida TypeScript y genera producción
```

Las tareas pendientes están en [BACKLOG.md](BACKLOG.md).
