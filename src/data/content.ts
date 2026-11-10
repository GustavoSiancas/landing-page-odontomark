import type { Doctor, Location, Specialty } from '../types'
import henry from '../assets/photos/doctors/optimized/henry.webp'
import henrySecondary from '../assets/photos/doctors/optimized/henry-2.webp'
import junior from '../assets/photos/doctors/optimized/junior.webp'
import juniorSecondary from '../assets/photos/doctors/optimized/junior-2.webp'
import marianny from '../assets/photos/doctors/optimized/marianny.webp'
import mariannySecondary from '../assets/photos/doctors/optimized/marianny-2.webp'

export const specialties: Specialty[] = [
  {
    id: 1,
    name: 'Diseño de sonrisa',
    icon: 'smile',
    description:
      'Analizamos forma, color y proporción dental para diseñar una sonrisa armónica y acorde con tus objetivos.',
  },
  {
    id: 2,
    name: 'Ortodoncia',
    icon: 'orthodontics',
    description:
      'Corregimos la posición de los dientes y la mordida con alternativas adaptadas a cada paciente.',
  },
  {
    id: 3,
    name: 'Implantología',
    icon: 'implant',
    description:
      'Reemplazamos piezas perdidas con implantes planificados para recuperar estabilidad y función.',
  },
  {
    id: 4,
    name: 'Endodoncia',
    icon: 'endodontics',
    description:
      'Tratamos el interior del diente para aliviar molestias, controlar infecciones y conservar la pieza.',
  },
  {
    id: 5,
    name: 'Prostodoncia',
    icon: 'prosthodontics',
    description:
      'Rehabilitamos dientes ausentes o dañados para recuperar función, comodidad y apariencia natural.',
  },
  {
    id: 6,
    name: 'Cirugía oral',
    icon: 'surgery',
    description:
      'Procedimientos quirúrgicos con evaluación previa, planificación cuidadosa y seguimiento cercano.',
  },
  {
    id: 7,
    name: 'Cirugía maxilofacial',
    icon: 'maxillofacial',
    description: 'Evaluamos y tratamos alteraciones de los maxilares, el rostro y la función oral.',
  },
]

// Completar `license` cuando se tengan los números de colegiatura (COP / RNE).
export const doctors: Doctor[] = [
  {
    name: 'Dr. Ronald Siancas',
    role: 'Diseño de sonrisa',
    chief: true,
  },
  {
    name: 'Dr. Henry Muller',
    role: 'Ortodoncia y ortopedia maxilar',
    image: henry,
    hoverImage: henrySecondary,
  },
  {
    name: 'Dra. Marianny Luque',
    role: 'Ortodoncia',
    license: 'COP 49290',
    image: marianny,
    hoverImage: mariannySecondary,
  },
  {
    name: 'Dr. Junior Bermejo Quispe',
    role: 'Ortodoncia y ortopedia maxilar',
    license: 'COP 37097',
    image: junior,
    hoverImage: juniorSecondary,
  },
]

export const locations: Location[] = [
  {
    label: 'Sede 1',
    name: 'Villa María del Triunfo',
    address: 'Calle San Eugenio 316, PJ San Gabriel, Villa María del Triunfo, Lima.',
    mapUrl: 'https://www.google.com/maps?q=-12.155979,-76.956370&z=17&output=embed',
    directionsUrl: 'https://maps.app.goo.gl/Jx5xMWDaUXQjvCL38',
  },
  {
    label: 'Sede 2',
    name: 'Villa El Salvador',
    address: '1 De Mayo 510, Villa El Salvador 15828, Lima.',
    mapUrl: 'https://www.google.com/maps?q=-12.1908227,-76.9455906&z=17&output=embed',
    directionsUrl: 'https://maps.app.goo.gl/1U9PZf1QmLU6Kiyx7',
  },
]
