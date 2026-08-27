import { useEffect, useState } from 'react'
import { locations } from '../data/content'
import { useCarousel } from '../hooks/useCarousel'

export function Locations() {
  const [isCompact, setIsCompact] = useState(false)
  const { trackRef, move, start, stop } = useCarousel(
    locations.length,
    isCompact ? 5200 : undefined,
  )

  useEffect(() => {
    const query = window.matchMedia('(max-width: 900px)')
    const update = () => setIsCompact(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  const step = (direction: number) => {
    move(direction)
    start()
  }

  return (
    <section id="sedes">
      <div className="wrap">
        <div className="section-head">
          <span className="mono">Sedes</span>
          <h2>Dos sedes, misma forma de trabajar.</h2>
          <p>Elige la más cercana a ti. Ambas atienden todas las especialidades.</p>
        </div>
        <div className="sedes-carousel" aria-label="Sedes de Odontomark">
          <div className="sedes-grid" ref={trackRef} onMouseEnter={stop} onMouseLeave={start}>
            {locations.map((location) => (
              <article className="sede-card" key={location.name}>
                <iframe
                  className="sede-map"
                  src={location.mapUrl}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title={`Mapa sede ${location.name}`}
                />
                <div className="sede-body">
                  <span className="mono">{location.label}</span>
                  <h3>{location.name}</h3>
                  <p>{location.address}</p>
                  <a
                    className="link-out"
                    href={location.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver en Google Maps →
                  </a>
                </div>
              </article>
            ))}
          </div>
          <button
            className="sede-carousel-btn prev"
            type="button"
            aria-label="Sede anterior"
            onClick={() => step(-1)}
          >
            ‹
          </button>
          <button
            className="sede-carousel-btn next"
            type="button"
            aria-label="Siguiente sede"
            onClick={() => step(1)}
          >
            ›
          </button>
        </div>
      </div>
    </section>
  )
}
