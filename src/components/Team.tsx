import { doctors } from '../data/content'
import type { Doctor } from '../types'

const initials = (name: string) =>
  name
    .replace(/^(Dr|Dra)\.\s*/, '')
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('')

function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <article className="doc-card">
      <div className={`doc-photo ${doctor.hoverImage ? 'has-hover' : ''}`}>
        {doctor.image ? (
          <>
            <img
              className="photo-primary"
              src={doctor.image}
              alt={doctor.name}
              loading="lazy"
              decoding="async"
            />
            {doctor.hoverImage && (
              <img
                className="photo-secondary"
                src={doctor.hoverImage}
                alt=""
                loading="lazy"
                decoding="async"
              />
            )}
          </>
        ) : (
          <span className="doc-initials" aria-hidden="true">
            {initials(doctor.name)}
          </span>
        )}
        {doctor.chief && <span className="chief-badge">Odontólogo jefe</span>}
      </div>
      <div className="doc-info">
        <h3>{doctor.name}</h3>
        <span className="role">{doctor.role}</span>
        {doctor.license && <span className="license">{doctor.license}</span>}
      </div>
    </article>
  )
}

export function Team() {
  return (
    <section id="equipo" className="team">
      <div className="wrap">
        <div className="section-head">
          <span className="kicker">Equipo</span>
          <h2>Especialistas que avanzan contigo.</h2>
          <p>
            Profesionales comprometidos con una atención cercana, coordinada y especializada en cada
            etapa de tu tratamiento.
          </p>
        </div>
        <div className="team-grid">
          {doctors.map((doctor) => (
            <DoctorCard doctor={doctor} key={doctor.name} />
          ))}
        </div>
      </div>
    </section>
  )
}
