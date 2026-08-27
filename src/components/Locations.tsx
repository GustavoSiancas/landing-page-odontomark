import { locations } from '../data/content'
export function Locations() {
  return (
    <section id="sedes">
      <div className="wrap">
        <div className="section-head">
          <span className="mono">Sedes</span>
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
      </div>
    </section>
  )
}
