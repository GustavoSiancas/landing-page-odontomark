import type { ReactNode } from 'react'
import type { SpecialtyIconName } from '../types'

const TOOTH =
  'M7 3C4.8 3 3 4.8 3 7.2c0 2.3.8 3.6 1.4 5.3.6 1.8.8 3.6 1.2 5.6.3 1.6.8 2.9 1.9 2.9 1.4 0 1.6-2.2 2-4 .3-1.4.9-2.4 2.5-2.4s2.2 1 2.5 2.4c.4 1.8.6 4 2 4 1.1 0 1.6-1.3 1.9-2.9.4-2 .6-3.8 1.2-5.6.6-1.7 1.4-3 1.4-5.3C21 4.8 19.2 3 17 3c-1.9 0-2.9 1-5 1S8.9 3 7 3Z'

function Svg({ children, size = 24 }: { children: ReactNode; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

const specialtyPaths: Record<SpecialtyIconName, ReactNode> = {
  smile: (
    <>
      <path d="M3.5 10.5c2.2 5.5 14.8 5.5 17 0" />
      <path d="M6 11.6c2.3 2.6 9.7 2.6 12 0" />
      <path d="M18.5 2.5v4M16.5 4.5h4" />
    </>
  ),
  orthodontics: (
    <>
      <path d="M2 12h20" />
      <rect x="3.5" y="9" width="4" height="6" rx="1" />
      <rect x="10" y="9" width="4" height="6" rx="1" />
      <rect x="16.5" y="9" width="4" height="6" rx="1" />
    </>
  ),
  implant: (
    <>
      <path d="M7 3h10v3.5A2.5 2.5 0 0 1 14.5 9h-5A2.5 2.5 0 0 1 7 6.5Z" />
      <path d="M10 9v10l2 2 2-2V9M9 12.5h6M9 16h6" />
    </>
  ),
  endodontics: (
    <>
      <path d={TOOTH} />
      <path d="M12 8v5" />
    </>
  ),
  prosthodontics: (
    <>
      <path d={TOOTH} />
      <path d="M5 8.5h14" />
    </>
  ),
  surgery: (
    <>
      <path d="M3 21l7-7" />
      <path d="M10 14 18.6 5.4a2 2 0 0 1 2.9 2.9L13 16.8Z" />
    </>
  ),
  maxillofacial: (
    <>
      <path d="M9 3h4a6 6 0 0 1 6 6v2l2 3-2 1v2a3 3 0 0 1-3 3h-2v2" />
      <path d="M9 3a6 6 0 0 0-6 6v3c0 3 1.8 5 4 6v3" />
      <path d="M14 9.5h.01" />
    </>
  ),
}

export function SpecialtyIcon({ name }: { name: SpecialtyIconName }) {
  return <Svg size={26}>{specialtyPaths[name]}</Svg>
}

export const PinIcon = () => (
  <Svg size={20}>
    <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </Svg>
)
export const ClockIcon = () => (
  <Svg size={20}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Svg>
)
export const MailIcon = () => (
  <Svg size={20}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </Svg>
)
export const ArrowIcon = () => (
  <Svg size={16}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
)

export function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.6 6.32A7.85 7.85 0 0 0 12.06 4a7.94 7.94 0 0 0-6.9 11.9L4 20l4.2-1.1a7.9 7.9 0 0 0 3.85 1h.01a7.94 7.94 0 0 0 5.54-13.58ZM12.06 18.4a6.55 6.55 0 0 1-3.35-.92l-.24-.14-2.5.65.67-2.43-.16-.25a6.6 6.6 0 1 1 12.24-3.5 6.56 6.56 0 0 1-6.66 6.59Zm3.6-4.93c-.2-.1-1.17-.58-1.35-.64-.18-.07-.31-.1-.44.1-.13.19-.5.64-.62.77-.11.13-.23.14-.42.05a5.4 5.4 0 0 1-1.6-.98 6 6 0 0 1-1.1-1.37c-.12-.2 0-.3.09-.4.09-.1.2-.24.3-.36.1-.12.13-.2.2-.33.06-.13.03-.25-.02-.35-.05-.1-.44-1.06-.6-1.45-.16-.38-.32-.33-.44-.34h-.38c-.13 0-.34.05-.52.24-.18.19-.68.66-.68 1.61 0 .95.7 1.87.8 2 .1.13 1.37 2.1 3.33 2.94.46.2.83.32 1.11.41.47.15.9.13 1.24.08.38-.06 1.17-.48 1.33-.94.16-.46.16-.86.11-.94-.05-.08-.18-.13-.38-.23Z" />
    </svg>
  )
}
