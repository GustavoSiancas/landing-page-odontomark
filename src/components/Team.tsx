import { doctors } from '../data/content'
import { useState, type PointerEvent } from 'react'

function Placeholder() {
  return (
    <svg viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
      <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.4 0-8 2.2-8 5v2h16v-2c0-2.8-3.6-5-8-5Z" />
    </svg>
  )
}

function DoctorCard({
  doctor,
  clone = false,
}: {
  doctor: (typeof doctors)[number]
  clone?: boolean
}) {
  return (
    <article className="doc-card" aria-hidden={clone || undefined}>
      <div className={`doc-photo ${doctor.hoverImage ? 'doc-photo-hover' : ''}`}>
        {doctor.image ? (
          <img
            className="photo-primary"
            src={doctor.image}
            alt={clone ? '' : doctor.name}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <Placeholder />
        )}
        {doctor.hoverImage && (
          <img
            className="photo-secondary"
            src={doctor.hoverImage}
            alt={clone ? '' : `${doctor.name}, segunda fotografía`}
            loading="lazy"
            decoding="async"
          />
        )}
        {doctor.chief && <span className="chief-badge">Jefe</span>}
      </div>
      <div className="doc-info">
        <h3>{doctor.name}</h3>
        <span className="role">{doctor.role}</span>
        <span className="mono">{doctor.license}</span>
      </div>
    </article>
  )
}

export function Team() {
  const [pressing, setPressing] = useState(false)
  const press = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    setPressing(true)
  }
  const release = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId)
    setPressing(false)
  }
  return (
    <section id="equipo">
      <div className="wrap">
        <div className="section-head">
          <span className="mono">Equipo interdisciplinario</span>
          <h2>Especialistas que avanzan contigo.</h2>
          <p>
            Profesionales comprometidos con una atención cercana, coordinada y especializada en cada
            etapa de tu tratamiento.
          </p>
        </div>
        <div
          className={`team-carousel team-marquee ${pressing ? 'is-pressing' : ''}`}
          aria-label="Especialistas de Odontomark"
          onPointerDown={press}
          onPointerUp={release}
          onPointerCancel={() => setPressing(false)}
        >
          <div className="team-scroll">
            <div className="team-track-loop">
              <div className="team-group">
                {doctors.map((doctor) => (
                  <DoctorCard doctor={doctor} key={doctor.name} />
                ))}
              </div>
              <div className="team-group" aria-hidden="true">
                {doctors.map((doctor) => (
                  <DoctorCard doctor={doctor} clone key={`clone-${doctor.name}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
