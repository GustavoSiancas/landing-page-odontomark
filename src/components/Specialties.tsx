import { specialties } from '../data/content'
import { whatsappUrl } from '../config/contact'
import { ArrowIcon, SpecialtyIcon, WhatsAppIcon } from './Icons'

export function Specialties() {
  return (
    <section id="especialidades" className="specialties">
      <div className="wrap">
        <div className="section-head">
          <span className="kicker">Especialidades</span>
          <h2>Especialidades para cada etapa de tu sonrisa.</h2>
          <p>Todas disponibles en nuestras dos sedes. Toca una para consultarla por WhatsApp.</p>
        </div>
        <div className="specialty-grid">
          {specialties.map((item) => (
            <a
              className="specialty-card"
              key={item.id}
              href={whatsappUrl(
                `Hola Odontomark, quisiera información sobre ${item.name.toLowerCase()}.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="specialty-icon">
                <SpecialtyIcon name={item.icon} />
              </span>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <span className="text-link">
                Consultar <ArrowIcon />
              </span>
            </a>
          ))}
          <div className="specialty-card specialty-cta">
            <h3>¿No sabes cuál necesitas?</h3>
            <p>Agenda una evaluación inicial y te orientamos sobre el tratamiento adecuado.</p>
            <a className="btn" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon size={18} /> Agendar evaluación
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
