import { whatsappUrl } from '../config/contact'
import { clinicVideos } from '../data/videos'

function VideoGroup({ clone = false }: { clone?: boolean }) {
  return (
    <div className="tiktok-group" aria-hidden={clone || undefined}>
      {clinicVideos.map((source, index) => (
        <div className="tiktok-frame" key={`${clone ? 'clone-' : ''}${source}`}>
          <video
            src={source}
            aria-label={clone ? undefined : `Video de Clínica Odontomark ${index + 1}`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            tabIndex={-1}
          />
        </div>
      ))}
    </div>
  )
}

export function VideoCta() {
  return (
    <section className="video-cta video-hero" aria-labelledby="video-cta-title">
      <div className="tiktok-wall" aria-hidden="true">
        <div className="tiktok-track">
          <VideoGroup />
          <VideoGroup clone />
        </div>
      </div>
      <div className="video-cta-shade" aria-hidden="true" />
      <div className="video-cta-content wrap">
        <span className="mono">Tu próxima sonrisa empieza aquí</span>
        <h1 id="video-cta-title">
          No imagines el cambio.
          <br />
          <em>Hazlo parte de ti.</em>
        </h1>
        <p>
          Diseñamos una experiencia dental precisa, humana y pensada para que vuelvas a sonreír con
          seguridad.
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
    </section>
  )
}
