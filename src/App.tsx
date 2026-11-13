import { Contact } from './components/Contact'
import { Header } from './components/Header'
import { WhatsAppIcon } from './components/Icons'
import { Locations } from './components/Locations'
import { Specialties } from './components/Specialties'
import { Team } from './components/Team'
import { VideoCta } from './components/VideoCta'
import { EMAIL, OPENING_HOURS, PHONE_DISPLAY, PHONE_TEL, whatsappUrl } from './config/contact'
import { useRevealAnimations } from './hooks/useRevealAnimations'
import logo from './assets/brand/logo-odontomark.webp'

function Footer() {
  return (
    <footer>
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <img src={logo} alt="" width="40" height="40" />
          <div>
            <strong>Clínica Dental Odontomark</strong>
            <span>{OPENING_HOURS}</span>
          </div>
        </div>
        <nav className="footer-links" aria-label="Enlaces del pie de página">
          <a href="#especialidades">Especialidades</a>
          <a href="#sedes">Sedes</a>
          <a href="#equipo">Equipo</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <div className="footer-contact">
          <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </div>
      </div>
      <div className="wrap">
        <div className="footer-bottom">
          © {new Date().getFullYear()} Clínica Dental Odontomark. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  useRevealAnimations()
  return (
    <>
      <Header />
      <main id="top">
        <VideoCta />
        <Specialties />
        <Locations />
        <Team />
        <Contact />
      </main>
      <Footer />
      <a
        className="wa-float"
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribir por WhatsApp"
      >
        <WhatsAppIcon size={28} />
      </a>
    </>
  )
}
