import { useEffect, useState } from 'react'

export type PerformanceProfile = 'poster' | 'mobile' | 'desktop'

interface NavigatorWithPerformanceHints extends Navigator {
  connection?: {
    effectiveType?: string
    saveData?: boolean
    addEventListener?: (type: 'change', listener: () => void) => void
    removeEventListener?: (type: 'change', listener: () => void) => void
  }
  deviceMemory?: number
}

function detectPerformanceProfile(): PerformanceProfile {
  const browser = navigator as NavigatorWithPerformanceHints
  const connection = browser.connection
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const compactViewport = window.matchMedia('(max-width: 900px)').matches
  const constrainedNetwork = ['slow-2g', '2g', '3g'].includes(connection?.effectiveType ?? '')
  const veryLimitedHardware =
    (browser.deviceMemory !== undefined && browser.deviceMemory <= 2) ||
    (browser.hardwareConcurrency !== undefined && browser.hardwareConcurrency <= 2)

  if (reducedMotion || connection?.saveData || constrainedNetwork || veryLimitedHardware) {
    return 'poster'
  }

  const moderateHardware =
    compactViewport ||
    (browser.deviceMemory !== undefined && browser.deviceMemory <= 4) ||
    (browser.hardwareConcurrency !== undefined && browser.hardwareConcurrency <= 4)

  return moderateHardware ? 'mobile' : 'desktop'
}

export function usePerformanceProfile() {
  const [profile, setProfile] = useState<PerformanceProfile>(detectPerformanceProfile)

  useEffect(() => {
    const browser = navigator as NavigatorWithPerformanceHints
    const viewport = window.matchMedia('(max-width: 900px)')
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setProfile(detectPerformanceProfile())

    viewport.addEventListener('change', update)
    motion.addEventListener('change', update)
    browser.connection?.addEventListener?.('change', update)

    return () => {
      viewport.removeEventListener('change', update)
      motion.removeEventListener('change', update)
      browser.connection?.removeEventListener?.('change', update)
    }
  }, [])

  return profile
}
