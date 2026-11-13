# Backlog — Landing Odontomark

Pendientes de la consultoría (noviembre 2026). Lo marcado con 🧾 depende de información o
material que todavía no tenemos.

## Antes de publicar

- [ ] **Confirmar el dominio definitivo.** Hoy se asume `https://odontomark.pe` (canonical, `og:image`,
      JSON-LD, sitemap). Si es otro, cambiar `DEFAULT_SITE_URL` en `vite.config.ts` o usar `SITE_URL`.
- [ ] **Verificar la vista previa** al publicar: pegar el enlace en WhatsApp y en
      <https://developers.facebook.com/tools/debug/> para comprobar que sale la imagen.
- [ ] Confirmar que `contacto@odontomark.pe` recibe correos.
- [ ] Confirmar que ambas sedes atienden todas las especialidades (la web lo afirma).

## Prioridad alta (cuando tengamos la información)

- [ ] 🧾 **Medición:** Google Analytics 4 o Meta Pixel, con un evento por cada clic a WhatsApp
      indicando el origen (hero, especialidad, sede, formulario, botón flotante).
- [ ] 🧾 **Odontólogo jefe:** foto y número de colegiatura (`src/data/content.ts`).
- [ ] 🧾 **Colegiatura del Dr. Henry Muller** (COP).
- [ ] 🧾 **Testimonios / reseñas de Google** con calificación promedio.
- [ ] 🧾 **Redes sociales:** enlaces a TikTok/Instagram/Facebook en el footer y en `sameAs` del JSON-LD.
- [ ] 🧾 **Google Business Profile** creado y verificado para cada sede (clave para SEO local).

## Prioridad media

- [ ] **Prerender del HTML** en el build para que el contenido llegue sin esperar a JavaScript
      (mejor indexación y primera carga).
- [ ] **Mapas con carga al clic:** mostrar una imagen estática y cargar el iframe de Google Maps solo
      al tocarlo (cada iframe pesa ~1 MB).
- [ ] **Fuentes propias:** alojar Fraunces y Work Sans en el proyecto (por ejemplo `@fontsource`) en
      lugar de Google Fonts, y precargar solo los pesos usados.
- [ ] 🧾 Sección de preguntas frecuentes (precios referenciales, duración de tratamientos, formas de pago).
- [ ] Aviso breve de privacidad (Ley 29733) junto al formulario.

## Prioridad baja / mantenimiento

- [ ] **Peso del repositorio (~146 MB):** mover `src/assets/videos/source` y
      `src/assets/photos/doctors/source` a Git LFS o a un almacenamiento externo. Requiere reescribir
      el historial, coordinarlo antes.
- [ ] Eliminar `src/assets/brand/logo-odontomark.png` del repo si no se usa como fuente.
- [ ] Vulnerabilidades moderadas en herramientas de desarrollo (`minimatch` vía ESLint): no afectan
      a la web publicada; se resuelven al actualizar ESLint a una versión mayor.
- [ ] Menú móvil: bloquear el scroll de la página mientras está abierto.
- [ ] Mensajes de commit descriptivos (hoy muchos son ".").
