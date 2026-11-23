import { faqs } from '../data/content'

/** Datos estructurados FAQPage, generados a partir de las mismas preguntas que se muestran. */
const faqJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
})

export function Faq() {
  return (
    <section id="preguntas" className="faq" aria-labelledby="faq-title">
      <div className="wrap faq-grid">
        <div className="section-head">
          <span className="kicker">Preguntas frecuentes</span>
          <h2 id="faq-title">Resolvemos tus dudas antes de tu cita.</h2>
          <p>¿Tienes otra pregunta? Escríbenos por WhatsApp y te respondemos.</p>
        </div>
        <div className="faq-list">
          {faqs.map((faq) => (
            <details className="faq-item" key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />
    </section>
  )
}
