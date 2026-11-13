import { useEffect } from 'react'

/**
 * Elementos que aparecen al hacer scroll. Cada uno se observa por separado, así las tarjetas
 * de una lista larga (por ejemplo en móvil) aparecen recién cuando llegan a la pantalla.
 * Los que entran juntos se escalonan para dar sensación de secuencia.
 */
const REVEAL_SELECTOR = [
  'main section:not(.hero) .section-head',
  '.specialty-card',
  '.sede-card',
  '.doc-card',
  '.contact-copy > :not(.info-list):not(.payment-section)',
  '.info-list li',
  '.payment-label',
  '.payment-list li',
  '.form-card',
].join(',')

/** Separación entre elementos que aparecen en el mismo momento. */
const STAGGER_MS = 90
/** Tope para que el último de un grupo grande no espere demasiado. */
const MAX_DELAY_MS = 540

/** Aparición suave (una sola vez) de los contenidos al hacer scroll. */
export function useRevealAnimations() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const elements = document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR)
    elements.forEach((element) => element.classList.add('reveal'))

    const observer = new IntersectionObserver(
      (entries) => {
        // El escalonado se cuenta por grupo de hermanos (tarjetas de una grilla, logos de
        // pago, etc.), así cada lista hace su propia ola aunque entren varias a la vez.
        const positionByParent = new Map<Element | null, number>()
        entries
          .filter((entry) => entry.isIntersecting)
          .forEach((entry) => {
            const element = entry.target as HTMLElement
            const index = positionByParent.get(element.parentElement) ?? 0
            positionByParent.set(element.parentElement, index + 1)
            element.style.setProperty(
              '--reveal-delay',
              `${Math.min(index * STAGGER_MS, MAX_DELAY_MS)}ms`,
            )
            element.classList.add('is-visible')
            observer.unobserve(element)
          })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px' },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])
}
