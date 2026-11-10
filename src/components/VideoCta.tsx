import { useEffect, useRef, useState } from 'react'
import { OPENING_HOURS, whatsappUrl } from '../config/contact'
import { clinicVideos, type ClinicVideo } from '../data/videos'
import { specialties, locations } from '../data/content'
import { usePerformanceProfile, type PerformanceProfile } from '../hooks/usePerformanceProfile'
import { ArrowIcon, WhatsAppIcon } from './Icons'

function AdaptiveVideo({ video, profile }: { video: ClinicVideo; profile: PerformanceProfile }) {
  const elementRef = useRef<HTMLVideoElement>(null)
  const supportsIntersectionObserver = 'IntersectionObserver' in window
  const [inViewport, setInViewport] = useState(!supportsIntersectionObserver)
  const [hasLoaded, setHasLoaded] = useState(!supportsIntersectionObserver)

  useEffect(() => {
    const element = elementRef.current
    if (!element || profile === 'poster' || !supportsIntersectionObserver) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInViewport(entry.isIntersecting)
        if (entry.isIntersecting) setHasLoaded(true)
      },
      { threshold: 0.01 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [profile, supportsIntersectionObserver])

  useEffect(() => {
    const element = elementRef.current
    if (!element || !hasLoaded) return
    if (inViewport) void element.play().catch(() => undefined)
    else element.pause()
  }, [hasLoaded, inViewport])

  if (profile === 'poster') return <img src={video.poster} alt="" />

  const source = profile === 'mobile' ? video.mobile : video.desktop
  return (
    <video
      ref={elementRef}
      poster={video.poster}
      muted
      loop
      playsInline
      preload="none"
      tabIndex={-1}
    >
      {hasLoaded && (
        <>
          <source src={source.webm} type="video/webm" />
          <source src={source.mp4} type="video/mp4" />
        </>
      )}
    </video>
  )
}

const SLOT_COUNT = 3
/** Cada cuánto cambia un marco (rotan de uno en uno, por turnos). */
const ROTATE_MS = 4500

/**
 * Muestra 3 videos y va reemplazando uno a la vez por el siguiente de la lista,
 * así recorre todos sin repetir dos iguales en pantalla.
 */
function HeroReels({ profile }: { profile: PerformanceProfile }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [slots, setSlots] = useState(() =>
    Array.from({ length: Math.min(SLOT_COUNT, clinicVideos.length) }, (_, i) => i),
  )
  const [visible, setVisible] = useState(false)
  const tickRef = useRef({ next: slots.length, slot: 0 })

  useEffect(() => {
    const element = containerRef.current
    if (!element || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const canRotate = visible && profile !== 'poster' && clinicVideos.length > SLOT_COUNT
  useEffect(() => {
    if (!canRotate) return
    const timer = window.setInterval(() => {
      const tick = tickRef.current
      const slot = tick.slot
      const videoIndex = tick.next
      tick.slot = (slot + 1) % SLOT_COUNT
      tick.next = (videoIndex + 1) % clinicVideos.length
      setSlots((current) => current.map((value, i) => (i === slot ? videoIndex : value)))
    }, ROTATE_MS)
    return () => window.clearInterval(timer)
  }, [canRotate])

  return (
    <div className="hero-reels" aria-hidden="true" ref={containerRef}>
      {slots.map((videoIndex, slot) => {
        const video = clinicVideos[videoIndex]
        return (
          <div className={`reel reel-${slot + 1}`} key={slot}>
            <div className="reel-media" key={video.name}>
              <AdaptiveVideo video={video} profile={profile} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function VideoCta() {
  const profile = usePerformanceProfile()
  const facts = [
    `${locations.length} sedes en Lima Sur`,
    `${specialties.length} especialidades`,
    OPENING_HOURS.replace('Lunes a sábado', 'Lun–Sáb'),
  ]

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">
            Clínica dental · Villa María del Triunfo y Villa El Salvador
          </span>
          <h1 id="hero-title">
            No imagines el cambio. <em>Hazlo parte de ti.</em>
          </h1>
          <p className="hero-lead">
            Diseño de sonrisa, ortodoncia, implantes y más, con especialistas que te acompañan en
            cada etapa del tratamiento.
          </p>
          <div className="hero-actions">
            <a
              className="btn btn-lg"
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon /> Quiero transformar mi sonrisa
            </a>
            <a className="btn btn-ghost btn-lg" href="#especialidades">
              Ver especialidades <ArrowIcon />
            </a>
          </div>
          <ul className="hero-facts">
            {facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </div>
        <HeroReels profile={profile} />
      </div>
      <svg
        className="hero-wave"
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 60c240 30 480 30 720 0s480-30 720 0v30H0Z" />
      </svg>
    </section>
  )
}
