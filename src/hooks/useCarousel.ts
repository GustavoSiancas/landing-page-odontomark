import { useCallback, useEffect, useRef } from 'react'

export function useCarousel(
  itemCount: number,
  autoplayMs?: number,
  onIndexChange?: (index: number) => void,
) {
  const trackRef = useRef<HTMLDivElement>(null)
  const indexRef = useRef(0)
  const timerRef = useRef<number | undefined>(undefined)
  const changeRef = useRef(onIndexChange)
  useEffect(() => {
    changeRef.current = onIndexChange
  }, [onIndexChange])

  const goTo = useCallback(
    (index: number) => {
      const track = trackRef.current
      if (!track) return
      indexRef.current = (index + itemCount) % itemCount
      changeRef.current?.(indexRef.current)
      const item = track.children[indexRef.current] as HTMLElement | undefined
      if (item) {
        const left = item.offsetLeft - (track.clientWidth - item.offsetWidth) / 2
        track.scrollTo({ left, behavior: 'smooth' })
      }
    },
    [itemCount],
  )

  const move = useCallback(
    (direction: number) => {
      goTo(indexRef.current + direction)
    },
    [goTo],
  )

  const stop = useCallback(() => window.clearInterval(timerRef.current), [])
  const start = useCallback(() => {
    stop()
    if (autoplayMs && !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      timerRef.current = window.setInterval(() => move(1), autoplayMs)
  }, [autoplayMs, move, stop])

  useEffect(() => {
    start()
    return stop
  }, [start, stop])
  return { trackRef, move, goTo, start, stop }
}
