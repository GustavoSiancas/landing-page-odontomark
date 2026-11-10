export const WHATSAPP_NUMBER = '51902956428'
export const PHONE_DISPLAY = '+51 902 956 428'
export const EMAIL = 'contacto@odontomark.pe'
export const OPENING_HOURS = 'Lunes a sábado, 9:00 a.m. – 8:00 p.m.'
export const GENERAL_MESSAGE =
  'Hola Odontomark, quisiera agendar una cita. ¿Me ayudan con la disponibilidad?'
export const whatsappUrl = (message = GENERAL_MESSAGE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
