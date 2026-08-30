# Landing page Odontomark

Aplicación React + TypeScript construida con Vite.

```bash
npm install
npm run dev
```

El contenido está en `src/data/content.ts` y la configuración de WhatsApp en `src/config/contact.ts`.

## Recursos multimedia

- `src/assets/videos/source`: videos originales, no se incluyen en el build.
- `src/assets/videos/desktop`: clips de 9 s en WebM VP9 y MP4 H.264, 540×960 y 24 fps.
- `src/assets/videos/mobile`: clips de 9 s en WebM VP9 y MP4 H.264, 360×640 y 20 fps.
- `src/assets/videos/posters`: portadas WebP para conexiones limitadas y carga progresiva.
- `src/assets/photos/doctors/source`: fotografías PNG originales.
- `src/assets/photos/doctors/optimized`: fotografías WebP utilizadas por la web.

La portada selecciona automáticamente una experiencia estática, móvil o de escritorio usando
preferencias de movimiento, ahorro de datos, tipo de conexión, memoria aproximada, núcleos y ancho
de pantalla. Los videos fuera del viewport permanecen pausados.

## Calidad de código

```bash
npm run format        # Formatea todo el código fuente
npm run format:check  # Comprueba el formato sin modificar archivos
npm run lint          # Ejecuta el análisis estático
npm run build         # Valida TypeScript y genera producción
```
