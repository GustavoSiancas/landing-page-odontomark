/**
 * Videos de la portada.
 *
 * Se cargan automáticamente desde las carpetas de assets. Para agregar uno nuevo basta con copiar
 * sus 5 archivos con el mismo nombre (por ejemplo `video-9`):
 *   videos/desktop/video-9.mp4 y .webm
 *   videos/mobile/video-9.mp4 y .webm
 *   videos/posters/video-9.webp
 * Si falta alguno de los 5, ese video se ignora.
 */

/** Videos que se muestran primero, en este orden. El resto sigue en orden numérico. */
const SHOW_FIRST = ['video-2', 'video-8', 'video-1']

/** Videos que no deben aparecer en la portada. */
const EXCLUDED = ['video-7']

export interface ClinicVideo {
  name: string
  desktop: VideoSources
  mobile: VideoSources
  poster: string
}

interface VideoSources {
  webm: string
  mp4: string
}

type UrlMap = Record<string, string>

const byName = (files: UrlMap) =>
  Object.fromEntries(
    Object.entries(files).map(([path, url]) => [
      path
        .split('/')
        .pop()!
        .replace(/\.\w+$/, ''),
      url,
    ]),
  )

const desktopMp4 = byName(
  import.meta.glob<string>('../assets/videos/desktop/*.mp4', { eager: true, import: 'default' }),
)
const desktopWebm = byName(
  import.meta.glob<string>('../assets/videos/desktop/*.webm', { eager: true, import: 'default' }),
)
const mobileMp4 = byName(
  import.meta.glob<string>('../assets/videos/mobile/*.mp4', { eager: true, import: 'default' }),
)
const mobileWebm = byName(
  import.meta.glob<string>('../assets/videos/mobile/*.webm', { eager: true, import: 'default' }),
)
const posters = byName(
  import.meta.glob<string>('../assets/videos/posters/*.webp', { eager: true, import: 'default' }),
)

const rank = (name: string) => {
  const featured = SHOW_FIRST.indexOf(name)
  return featured >= 0 ? featured - SHOW_FIRST.length : Number(name.replace(/\D/g, '')) || 0
}

export const clinicVideos: ClinicVideo[] = Object.keys(posters)
  .filter(
    (name) =>
      !EXCLUDED.includes(name) &&
      desktopMp4[name] &&
      desktopWebm[name] &&
      mobileMp4[name] &&
      mobileWebm[name],
  )
  .sort((a, b) => rank(a) - rank(b))
  .map((name) => ({
    name,
    desktop: { webm: desktopWebm[name], mp4: desktopMp4[name] },
    mobile: { webm: mobileWebm[name], mp4: mobileMp4[name] },
    poster: posters[name],
  }))
