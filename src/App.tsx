import { Contact } from './components/Contact'
import { Header } from './components/Header'
import { Locations } from './components/Locations'
import { PageLoader } from './components/PageLoader'
import { Specialties } from './components/Specialties'
import { Team } from './components/Team'
import { VideoCta } from './components/VideoCta'
import { whatsappUrl } from './config/contact'
import { useRevealAnimations } from './hooks/useRevealAnimations'

function WhatsAppIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
      <path d="M17.6 6.32A7.85 7.85 0 0 0 12.06 4a7.94 7.94 0 0 0-6.9 11.9L4 20l4.2-1.1a7.9 7.9 0 0 0 3.85 1h.01a7.94 7.94 0 0 0 5.54-13.58ZM12.06 18.4a6.55 6.55 0 0 1-3.35-.92l-.24-.14-2.5.65.67-2.43-.16-.25a6.6 6.6 0 1 1 12.24-3.5 6.56 6.56 0 0 1-6.66 6.59Zm3.6-4.93c-.2-.1-1.17-.58-1.35-.64-.18-.07-.31-.1-.44.1-.13.19-.5.64-.62.77-.11.13-.23.14-.42.05a5.4 5.4 0 0 1-1.6-.98 6 6 0 0 1-1.1-1.37c-.12-.2 0-.3.09-.4.09-.1.2-.24.3-.36.1-.12.13-.2.2-.33.06-.13.03-.25-.02-.35-.05-.1-.44-1.06-.6-1.45-.16-.38-.32-.33-.44-.34h-.38c-.13 0-.34.05-.52.24-.18.19-.68.66-.68 1.61 0 .95.7 1.87.8 2 .1.13 1.37 2.1 3.33 2.94.46.2.83.32 1.11.41.47.15.9.13 1.24.08.38-.06 1.17-.48 1.33-.94.16-.46.16-.86.11-.94-.05-.08-.18-.13-.38-.23Z" />
    </svg>
  )
}
function Footer() {
  return (
    <footer>
      <div className="wrap">
        <span>
          © {new Date().getFullYear()} Clínica Dental Odontomark. Todos los derechos reservados.
        </span>
        <div className="foot-links">
          <a href="#">Instagram</a>
          <a href="#">Facebook</a>
          <a href="#">TikTok</a>
        </div>
      </div>
    </footer>
  )
}
export default function App() {
  useRevealAnimations()
  return (
    <>
      <PageLoader />
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
        <WhatsAppIcon />
      </a>
    </>
  )
}
