import { useEffect, useState } from 'react'
import { whatsappUrl } from '../config/contact'
import logo from '../assets/brand/logo-odontomark.png'

const links = [['especialidades', 'Especialidades'], ['sedes', 'Sedes'], ['equipo', 'Equipo'], ['contacto', 'Contacto']]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll(); window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <header id="site-header" className={`${scrolled ? 'scrolled' : ''} ${open ? 'menu-open' : ''}`}>
    <div className="wrap">
      <a href="#top" className="logo"><img src={logo} alt="Odontomark" className="logo-img"/><span className="logo-text"><span className="eyebrow-word">Clínica Dental</span><strong>Odontomark</strong></span></a>
      <nav aria-label="Navegación principal"><ul>{links.map(([id, label]) => <li key={id}><a href={`#${id}`} onClick={() => setOpen(false)}>{label}</a></li>)}</ul></nav>
      <a className="btn header-cta" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">Agendar cita</a>
      <button className="nav-toggle" type="button" aria-label="Abrir menú" aria-expanded={open} onClick={() => setOpen(!open)}><span/><span/><span/></button>
    </div>
  </header>
}
