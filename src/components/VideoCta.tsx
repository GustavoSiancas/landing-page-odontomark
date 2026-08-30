import { useEffect, useRef, useState } from 'react'
import { whatsappUrl } from '../config/contact'
import { clinicVideos, type ClinicVideo } from '../data/videos'
import { usePerformanceProfile, type PerformanceProfile } from '../hooks/usePerformanceProfile'

function AdaptiveVideo({ video, profile }: { video: ClinicVideo; profile: PerformanceProfile }) {
  const elementRef = useRef<HTMLVideoElement>(null)
  const supportsIntersectionObserver = 'IntersectionObserver' in window
  const [inViewport, setInViewport] = useState(!supportsIntersectionObserver)
  const [hasLoaded, setHasLoaded] = useState(!supportsIntersectionObserver)

  useEffect(() => {
    const element = elementRef.current
    if (!element || profile === 'poster') return

    if (!supportsIntersectionObserver) return

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

    if (inViewport) {
      void element.play().catch(() => undefined)
    } else {
      element.pause()
    }
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

function VideoGroup({
  videos,
  profile,
  clone = false,
}: {
  videos: ClinicVideo[]
  profile: PerformanceProfile
  clone?: boolean
}) {
  return (
    <div className="tiktok-group" aria-hidden={clone || undefined}>
      {videos.map((video, index) => (
        <div className="tiktok-frame" key={`${clone ? 'clone-' : ''}${index}`}>
          <AdaptiveVideo video={video} profile={profile} />
        </div>
      ))}
    </div>
  )
}

export function VideoCta() {
  const profile = usePerformanceProfile()
  const visibleVideos = profile === 'desktop' ? clinicVideos : clinicVideos.slice(0, 5)

  return (
    <section className="video-cta video-hero" aria-labelledby="video-cta-title">
      <div className="tiktok-wall" aria-hidden="true">
        <div className="tiktok-track">
          <VideoGroup videos={visibleVideos} profile={profile} />
          <VideoGroup videos={visibleVideos} profile={profile} clone />
        </div>
      </div>
      <div className="video-cta-shade" aria-hidden="true" />
      <div className="video-cta-content wrap">
        <div className="video-cta-panel">
          <span className="mono">Tu próxima sonrisa empieza aquí</span>
          <h1 id="video-cta-title">
            No imagines el cambio.
            <br />
            <em>Hazlo parte de ti.</em>
          </h1>
          <p>
            Diseñamos una experiencia dental precisa, humana y pensada para que vuelvas a sonreír
            con seguridad.
          </p>
          <div className="video-cta-actions">
            <a
              className="btn video-cta-primary"
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              Quiero transformar mi sonrisa
            </a>
            <a className="video-cta-link" href="#especialidades">
              Conocer más <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
