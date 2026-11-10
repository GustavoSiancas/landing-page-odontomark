export type SpecialtyIconName =
  | 'smile'
  | 'orthodontics'
  | 'implant'
  | 'endodontics'
  | 'prosthodontics'
  | 'surgery'
  | 'maxillofacial'

export interface Specialty {
  id: number
  name: string
  description: string
  icon: SpecialtyIconName
}
export interface Doctor {
  name: string
  role: string
  /** Número de colegiatura. Se oculta si está vacío. */
  license?: string
  image?: string
  hoverImage?: string
  chief?: boolean
}
export interface Location {
  label: string
  name: string
  address: string
  mapUrl: string
  directionsUrl: string
}
