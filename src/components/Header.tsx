import { useEffect, useRef, useState } from 'react'
import { whatsappUrl } from '../config/contact'
import logo from '../assets/brand/logo-odontomark.webp'

const links = [
  ['especialidades', 'Especialidades'],
  ['sedes', 'Sedes'],
  ['equipo', 'Equipo'],
  ['contacto', 'Contacto'],
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])
  return (
    <header
      id="site-header"
      ref={headerRef}
      className={`${scrolled ? 'scrolled' : ''} ${open ? 'menu-open' : ''}`}
    >
      <div className="wrap">
        <a href="#top" className="logo" onClick={() => setOpen(false)}>
          <img src={logo} alt="" className="logo-img" width="192" height="192" />
          <span className="logo-text">
            <span className="eyebrow-word">Clínica Dental</span>
            <strong>Odontomark</strong>
          </span>
        </a>
        <nav aria-label="Navegación principal">
          <ul>
            {links.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} onClick={() => setOpen(false)}>
                  {label}
                </a>
              </li>
            ))}
            <li className="nav-cta">
              <a className="btn" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                Agendar cita
              </a>
            </li>
          </ul>
        </nav>
        <a
          className="btn header-cta"
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
        >
          Agendar cita
        </a>
        <button
          className="nav-toggle"
          type="button"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
