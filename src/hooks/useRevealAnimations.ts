import { useEffect } from 'react'

export function useRevealAnimations() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('main section:not(.hero):not(.video-hero), .form-card, .sede-card')
    elements.forEach(element => element.classList.add('reveal-ready'))
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target) }
    }), { threshold: 0.12, rootMargin: '0px 0px -50px' })
    elements.forEach(element => observer.observe(element))
    return () => observer.disconnect()
  }, [])
}
