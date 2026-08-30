import { useState, type FormEvent } from 'react'
import { specialties } from '../data/content'
import { whatsappUrl } from '../config/contact'

interface FormState {
  name: string
  phone: string
  specialty: string
  message: string
}
const initial: FormState = { name: '', phone: '', specialty: specialties[0].name, message: '' }
export function Contact() {
  const [form, setForm] = useState(initial)
  const update = (field: keyof FormState, value: string) =>
    setForm((current) => ({ ...current, [field]: value }))
  const submit = (event: FormEvent) => {
    event.preventDefault()
    const detail = form.message.trim() ? ` ${form.message.trim()}` : ''
    window.open(
      whatsappUrl(
        `Hola Odontomark, soy ${form.name.trim()} (tel: ${form.phone.trim()}). Me interesa una cita de ${form.specialty}.${detail}`,
      ),
      '_blank',
      'noopener,noreferrer',
    )
  }
  return (
    <section id="contacto" className="contact">
      <div className="wrap">
        <div>
          <span className="mono contact-kicker">Contacto</span>
          <h2>Agenda tu evaluación inicial.</h2>
          <p className="lead">
            Escríbenos por WhatsApp o completa el formulario. Respondemos en horario de atención.
          </p>
          <div className="info-list">
            <div className="info-item">
              <div className="ico">📍</div>
              <div>
                <h4>Sede Villa María del Triunfo</h4>
                <p>Calle San Eugenio 316, PJ San Gabriel, Lima</p>
              </div>
            </div>
            <div className="info-item">
              <div className="ico">📍</div>
              <div>
                <h4>Sede Villa El Salvador</h4>
                <p>1 De Mayo 510, Villa El Salvador 15828</p>
              </div>
            </div>
            <div className="info-item">
              <div className="ico">🕗</div>
              <div>
                <h4>Horario</h4>
                <p>Lunes a sábado, 9:00 a.m. – 8:00 p.m.</p>
              </div>
            </div>
            <div className="info-item">
              <div className="ico">💬</div>
              <div>
                <h4>WhatsApp</h4>
                <p>
                  <a href="tel:+51902956428">+51 902 956 428</a>
                </p>
              </div>
            </div>
            <div className="info-item">
              <div className="ico">✉️</div>
              <div>
                <h4>Correo</h4>
                <p>
                  <a href="mailto:contacto@odontomark.pe">contacto@odontomark.pe</a>
                </p>
              </div>
            </div>
          </div>
          <div className="pay-row">
            {['Efectivo', 'Yape', 'Plin', 'Visa', 'Transferencia'].map((item) => (
              <span className="pay-chip" key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="form-card">
          <h3>Solicita tu cita</h3>
          <p>Te contactamos para confirmar fecha y hora.</p>
          <form onSubmit={submit}>
            <label htmlFor="nombre">Nombre completo</label>
            <input
              id="nombre"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              required
              placeholder="Tu nombre"
            />
            <label htmlFor="telefono">Teléfono</label>
            <input
              id="telefono"
              type="tel"
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
              required
              placeholder="9xx xxx xxx"
            />
            <label htmlFor="especialidad">Especialidad de interés</label>
            <select
              id="especialidad"
              value={form.specialty}
              onChange={(e) => update('specialty', e.target.value)}
            >
              {specialties.map((item) => (
                <option key={item.id}>{item.name}</option>
              ))}
            </select>
            <label htmlFor="mensaje">Mensaje (opcional)</label>
            <textarea
              id="mensaje"
              rows={3}
              value={form.message}
              onChange={(e) => update('message', e.target.value)}
              placeholder="Cuéntanos brevemente tu caso"
            />
            <button type="submit" className="btn">
              Enviar por WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
