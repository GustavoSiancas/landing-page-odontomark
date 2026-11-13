import { useState, type FormEvent } from 'react'
import { specialties } from '../data/content'
import { EMAIL, OPENING_HOURS, PHONE_DISPLAY, whatsappUrl } from '../config/contact'
import { ClockIcon, MailIcon, PinIcon, WhatsAppIcon } from './Icons'
import cashIcon from '../assets/payments/cash.webp'
import yapeIcon from '../assets/payments/yape.webp'
import plinIcon from '../assets/payments/plin.webp'
import visaIcon from '../assets/payments/visa.webp'
import transferIcon from '../assets/payments/transfer.webp'

const GENERAL_OPTION = 'Evaluación general'

interface FormState {
  name: string
  specialty: string
  message: string
}
const initial: FormState = { name: '', specialty: GENERAL_OPTION, message: '' }

const paymentMethods = [
  { name: 'Efectivo', icon: cashIcon },
  { name: 'Yape', icon: yapeIcon },
  { name: 'Plin', icon: plinIcon },
  { name: 'Visa', icon: visaIcon },
  { name: 'Transferencia', icon: transferIcon },
]

export function Contact() {
  const [form, setForm] = useState(initial)
  const update = (field: keyof FormState, value: string) =>
    setForm((current) => ({ ...current, [field]: value }))
  const submit = (event: FormEvent) => {
    event.preventDefault()
    const detail = form.message.trim() ? ` ${form.message.trim()}` : ''
    const interest =
      form.specialty === GENERAL_OPTION
        ? 'una evaluación general'
        : `una cita de ${form.specialty.toLowerCase()}`
    window.open(
      whatsappUrl(`Hola Odontomark, soy ${form.name.trim()}. Me interesa ${interest}.${detail}`),
      '_blank',
      'noopener,noreferrer',
    )
  }
  return (
    <section id="contacto" className="contact">
      <div className="wrap contact-grid">
        <div className="contact-copy">
          <span className="kicker">Contacto</span>
          <h2>Agenda tu evaluación inicial.</h2>
          <p className="contact-lead">
            Escríbenos por WhatsApp o completa el formulario. Respondemos en horario de atención.
          </p>
          <ul className="info-list">
            <li>
              <span className="ico">
                <ClockIcon />
              </span>
              <div>
                <strong>Horario</strong>
                <span>{OPENING_HOURS}</span>
              </div>
            </li>
            <li>
              <span className="ico">
                <WhatsAppIcon />
              </span>
              <div>
                <strong>WhatsApp</strong>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                  {PHONE_DISPLAY}
                </a>
              </div>
            </li>
            <li>
              <span className="ico">
                <MailIcon />
              </span>
              <div>
                <strong>Correo</strong>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </div>
            </li>
            <li>
              <span className="ico">
                <PinIcon />
              </span>
              <div>
                <strong>Sedes</strong>
                <a href="#sedes">Villa María del Triunfo y Villa El Salvador</a>
              </div>
            </li>
          </ul>
          <div className="payment-section">
            <span className="payment-label">Medios de pago</span>
            <ul className="payment-list">
              {paymentMethods.map((method) => (
                <li key={method.name} title={method.name}>
                  <img
                    src={method.icon}
                    alt={method.name}
                    width="180"
                    height="206"
                    loading="lazy"
                    decoding="async"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="form-card">
          <h3>Solicita tu cita</h3>
          <p>Se abrirá WhatsApp con tu mensaje listo para enviar. Te confirmamos fecha y hora.</p>
          <form onSubmit={submit}>
            <div className="form-field">
              <label htmlFor="nombre">Nombre completo</label>
              <input
                id="nombre"
                autoComplete="name"
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                required
                placeholder="Tu nombre"
              />
            </div>
            <div className="form-field">
              <label htmlFor="especialidad">Especialidad de interés</label>
              <select
                id="especialidad"
                value={form.specialty}
                onChange={(e) => update('specialty', e.target.value)}
              >
                <option>{GENERAL_OPTION}</option>
                {specialties.map((item) => (
                  <option key={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="mensaje">Mensaje (opcional)</label>
              <textarea
                id="mensaje"
                rows={3}
                value={form.message}
                onChange={(e) => update('message', e.target.value)}
                placeholder="Cuéntanos brevemente tu caso"
              />
            </div>
            <button type="submit" className="btn btn-lg btn-block">
              <WhatsAppIcon /> Enviar por WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
