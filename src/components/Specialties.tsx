import { specialties } from '../data/content'
import { useCarousel } from '../hooks/useCarousel'
import { useState } from 'react'

export function Specialties() {
  const [active, setActive] = useState(0)
  const { trackRef, move, goTo, start, stop } = useCarousel(specialties.length, 4200, setActive)
  const step = (direction: number) => {
    move(direction)
    start()
  }
  return (
    <section id="especialidades" className="specialties">
      <div className="wrap">
        <div className="section-head">
          <span className="mono">Especialidades</span>
          <h2>Especialidades para cada etapa de tu sonrisa.</h2>
          <p>
            Selecciona una especialidad para conocerla y ver cómo trabajamos. El carrusel avanza
            automáticamente.
          </p>
        </div>
        <div className="specialty-carousel" aria-label="Carrusel de especialidades">
          <button
            className="carousel-btn prev"
            type="button"
            aria-label="Especialidad anterior"
            onClick={() => step(-1)}
          >
            ‹
          </button>
          <div className="arc-row" ref={trackRef} onMouseEnter={stop} onMouseLeave={start}>
            {specialties.map((item, index) => (
              <button
                className={`tooth-card ${active === index ? 'active' : ''}`}
                type="button"
                key={item.id}
                onClick={() => {
                  goTo(index)
                  start()
                }}
              >
                <span className="num">{String(item.id).padStart(2, '0')}</span>
                <span className="specialty-icon" aria-hidden="true">
                  {item.icon}
                </span>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </button>
            ))}
          </div>
          <button
            className="carousel-btn next"
            type="button"
            aria-label="Siguiente especialidad"
            onClick={() => step(1)}
          >
            ›
          </button>
        </div>
      </div>
    </section>
  )
}
