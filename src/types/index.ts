export interface Specialty { id: number; name: string; description: string; icon: string }
export interface Value { id: string; name: string; description: string; image: string; alt: string }
export interface Doctor { name: string; role: string; license: string; image?: string; hoverImage?: string; chief?: boolean }
export interface Location { label: string; name: string; address: string; mapUrl: string; directionsUrl: string }
