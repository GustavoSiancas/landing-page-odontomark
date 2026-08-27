import type { Doctor, Location, Specialty } from '../types'
import henry from '../assets/photos/doctors/henry.png'
import henrySecondary from '../assets/photos/doctors/henry-2.png'
import junior from '../assets/photos/doctors/junior.png'
import juniorSecondary from '../assets/photos/doctors/junior-2.png'
import marianny from '../assets/photos/doctors/marianny.png'
import mariannySecondary from '../assets/photos/doctors/marianny-2.png'

export const specialties: Specialty[] = [
  { id: 1, name: 'Cirugía', icon: '✦', description: 'Realizamos procedimientos quirúrgicos orales con evaluación previa, planificación cuidadosa y seguimiento cercano.' },
  { id: 2, name: 'Cirugía maxilofacial', icon: '◇', description: 'Evaluamos y tratamos alteraciones de los maxilares, el rostro y la función oral con un enfoque especializado.' },
  { id: 3, name: 'Prostodoncia', icon: '⌒', description: 'Rehabilitamos dientes ausentes o dañados para recuperar función, comodidad y una apariencia natural.' },
  { id: 4, name: 'Endodoncia', icon: '⇣', description: 'Tratamos el interior del diente para aliviar molestias, controlar infecciones y conservar la pieza dental.' },
  { id: 5, name: 'Implantología', icon: '╫', description: 'Reemplazamos piezas perdidas mediante implantes planificados para recuperar estabilidad, función y una apariencia natural.' },
  { id: 6, name: 'Diseño de sonrisa', icon: '✧', description: 'Analizamos forma, color y proporción dental para diseñar una sonrisa armónica y acorde con tus objetivos.' },
  { id: 7, name: 'Ortodoncia', icon: '▦', description: 'Corregimos la posición de los dientes y la mordida mediante alternativas adaptadas a cada paciente.' },
]

export const doctors: Doctor[] = [
  { name: 'Dr. Ronald Siancas', role: 'Diseño de Sonrisa', license: 'COP 00000 · RNE 00000', chief: true },
  { name: 'Dr. Henry Muller', role: 'Ortodoncia y ortopedia maxilar', license: 'COP 00000 · RNE 00000', image: henry, hoverImage: henrySecondary },
  { name: 'Dra. Marianny Luque', role: 'Ortodoncia', license: 'COP 49290', image: marianny, hoverImage: mariannySecondary },
  { name: 'Junior Bermejo Quispe', role: 'Ortodoncia y ortopedia maxilar', license: 'COP 37097', image: junior, hoverImage: juniorSecondary },
  { name: 'Dra. [Nombre]', role: 'Estética dental', license: 'COP 00000 · RNE 00000' },
]

export const locations: Location[] = [
  { label: 'Sede 1', name: 'Villa María del Triunfo', address: 'Calle San Eugenio 316, PJ San Gabriel, Villa María del Triunfo, Lima.', mapUrl: 'https://www.google.com/maps?q=-12.155979,-76.956370&z=17&output=embed', directionsUrl: 'https://maps.app.goo.gl/Jx5xMWDaUXQjvCL38' },
  { label: 'Sede 2', name: 'Villa El Salvador', address: '1 De Mayo 510, Villa El Salvador 15828, Lima.', mapUrl: 'https://www.google.com/maps?q=-12.1908227,-76.9455906&z=17&output=embed', directionsUrl: 'https://maps.app.goo.gl/1U9PZf1QmLU6Kiyx7' },
]
