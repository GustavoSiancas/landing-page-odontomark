import { useEffect, useState } from 'react'
import logo from '../assets/brand/logo-odontomark.png'

const wait = (milliseconds: number) =>
  new Promise<void>((resolve) => window.setTimeout(resolve, milliseconds))

function waitForImages() {
  const images = Array.from(document.querySelectorAll<HTMLImageElement>('img[data-critical]'))

  return Promise.all(
    images.map(
      (element) =>
        new Promise<void>((resolve) => {
          if (element.complete) {
            resolve()
            return
          }

          element.addEventListener('load', () => resolve(), { once: true })
          element.addEventListener('error', () => resolve(), { once: true })
        }),
    ),
  ).then(() => undefined)
}

export function PageLoader() {
  const [leaving, setLeaving] = useState(false)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    let disposed = false
    document.body.classList.add('is-loading')

    const preparePage = async () => {
      await new Promise<void>((resolve) => window.requestAnimationFrame(() => resolve()))

      const fontsReady = document.fonts?.ready ?? Promise.resolve()
      const assetsReady = Promise.all([fontsReady, waitForImages(), wait(600)])

      await Promise.race([assetsReady, wait(2500)])
      if (disposed) return

      setLeaving(true)
      window.setTimeout(() => {
        if (!disposed) setVisible(false)
        document.body.classList.remove('is-loading')
      }, 650)
    }

    void preparePage()

    return () => {
      disposed = true
      document.body.classList.remove('is-loading')
    }
  }, [])

  if (!visible) return null

  return (
    <div className={`page-loader ${leaving ? 'is-leaving' : ''}`} role="status" aria-live="polite">
      <div className="page-loader-mark">
        <span className="page-loader-orbit" aria-hidden="true" />
        <img src={logo} alt="Odontomark" data-critical />
      </div>
      <span className="page-loader-label">Preparando tu experiencia</span>
      <span className="page-loader-line" aria-hidden="true" />
    </div>
  )
}
