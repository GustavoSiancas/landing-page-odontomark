export const WHATSAPP_NUMBER = '51902956428'
export const GENERAL_MESSAGE =
  'Hola Odontomark, quisiera agendar una cita. ¿Me ayudan con la disponibilidad?'
export const whatsappUrl = (message = GENERAL_MESSAGE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
