import { useEffect, useState } from 'react'
import logo from '../assets/brand/logo-odontomark.png'

const wait = (milliseconds: number) =>
  new Promise<void>((resolve) => window.setTimeout(resolve, milliseconds))

function waitForWindowLoad() {
  if (document.readyState === 'complete') return Promise.resolve()
  return new Promise<void>((resolve) =>
    window.addEventListener('load', () => resolve(), { once: true }),
  )
}

function waitForMedia() {
  const media = Array.from(
    document.querySelectorAll<HTMLImageElement | HTMLVideoElement>('img, video'),
  )

  return Promise.all(
    media.map(
      (element) =>
        new Promise<void>((resolve) => {
          const isReady =
            element instanceof HTMLImageElement ? element.complete : element.readyState >= 2

          if (isReady) {
            resolve()
            return
          }

          const readyEvent = element instanceof HTMLImageElement ? 'load' : 'loadeddata'
          element.addEventListener(readyEvent, () => resolve(), { once: true })
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
      const assetsReady = Promise.all([waitForWindowLoad(), fontsReady, waitForMedia(), wait(900)])

      await Promise.race([assetsReady, wait(10_000)])
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
        <img src={logo} alt="Odontomark" />
      </div>
      <span className="page-loader-label">Preparando tu experiencia</span>
      <span className="page-loader-line" aria-hidden="true" />
    </div>
  )
}
