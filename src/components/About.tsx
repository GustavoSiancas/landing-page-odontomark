import { useState } from 'react'
import { values } from '../data/content'

export function About() {
  const [active, setActive] = useState(values[0])
  return <section id="nosotros" className="why"><div className="wrap">
    <div className="why-visual"><img src={active.image} alt={active.alt}/><div className="why-visual-caption"><strong>{active.name}</strong><span>Selecciona uno de nuestros valores para cambiar esta imagen</span></div></div>
    <div><div className="section-head"><span className="mono">Nuestra filosofía de atención</span><h2>Una sonrisa puede ser el comienzo de un gran cambio.</h2><p>Antes de hablar de un tratamiento, nos tomamos el tiempo para escucharte: queremos conocer tu historia, comprender qué te preocupa y saber qué significa para ti volver a sonreír.</p></div>
      <div className="why-list">{values.map(value => <button type="button" className={`why-item ${active.id === value.id ? 'active' : ''}`} key={value.id} onClick={() => setActive(value)}><span className="mono">{value.id}</span><div><h3>{value.name}</h3><p>{value.description}</p></div></button>)}</div>
      <p className="why-closing">No solo transformamos sonrisas. Ayudamos a las personas a recuperar la confianza para volver a sonreír.</p>
    </div>
  </div></section>
}
