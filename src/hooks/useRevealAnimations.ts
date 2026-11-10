import { useEffect } from 'react'

/** Aparición suave (una sola vez) de las secciones al hacer scroll. */
export function useRevealAnimations() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const elements = document.querySelectorAll<HTMLElement>('main section:not(.hero) .wrap')
    elements.forEach((element) => element.classList.add('reveal-ready'))
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }),
      { threshold: 0.08, rootMargin: '0px 0px -40px' },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])
}
