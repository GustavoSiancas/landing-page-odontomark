import { locations } from '../data/content'
import { OPENING_HOURS, whatsappUrl } from '../config/contact'
import { ClockIcon, PinIcon, WhatsAppIcon } from './Icons'

export function Locations() {
  return (
    <section id="sedes" className="locations">
      <div className="wrap">
        <div className="section-head">
          <span className="kicker">Sedes</span>
          <h2>Dos sedes, misma forma de trabajar.</h2>
          <p>Elige la más cercana a ti. Ambas atienden todas las especialidades.</p>
        </div>
        <div className="sedes-grid">
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
                <span className="tag">{location.label}</span>
                <h3>{location.name}</h3>
                <p className="sede-line">
                  <PinIcon /> {location.address}
                </p>
                <p className="sede-line">
                  <ClockIcon /> {OPENING_HOURS}
                </p>
                <div className="sede-actions">
                  <a
                    className="btn"
                    href={whatsappUrl(
                      `Hola Odontomark, quisiera agendar una cita en la sede ${location.name}.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppIcon size={18} /> Agendar aquí
                  </a>
                  <a
                    className="btn btn-ghost"
                    href={location.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Cómo llegar
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
