export type FAQItemData = {
  q: string
  a: string
}

export const FAQ_PER_PAGE = 3

export const faqSectionContent = {
  badge: "Preguntas frecuentes",
  title: "Todo lo que necesitas",
  highlight: "saber",
  subtitle: "Resolvemos tus dudas más comunes para que empieces con confianza.",
}

export const faqs: FAQItemData[] = [
  {
    q: "¿CotizaApp es gratuito?",
    a: "Sí. Puedes comenzar sin costo alguno. El plan gratuito incluye acceso a plantillas básicas y hasta 10 cotizaciones al mes, ideal para empezar a profesionalizar tu negocio.",
  },
  {
    q: "¿Necesito instalar algo?",
    a: "No. CotizaApp funciona 100% desde tu navegador. Solo necesitas crear una cuenta y listo — sin descargas, sin configuraciones complicadas.",
  },
  {
    q: "¿Puedo descargar mis cotizaciones en PDF?",
    a: "Sí. Con un solo clic generas un PDF profesional, limpio y listo para compartir con tu cliente o imprimir para una reunión.",
  },
  {
    q: "¿Se guardan mis cotizaciones?",
    a: "Sí. Todas tus cotizaciones quedan guardadas en la nube. Puedes consultarlas, editarlas, duplicarlas o reutilizarlas en cualquier momento desde cualquier dispositivo.",
  },
  {
    q: "¿Puedo personalizar mis cotizaciones?",
    a: "Totalmente. Agrega tus productos o servicios, precios, descuentos, impuestos, notas y tu información de empresa. Cada cotización se adapta a tu negocio.",
  },
  {
    q: "¿Qué diferencia hay entre los perfiles?",
    a: "El perfil Independiente está pensado para freelancers y profesionales que trabajan solos. El perfil Negocio incluye funciones para equipos, control de acceso y reportes avanzados.",
  },
  {
    q: "¿Qué pasa cuando llego al límite gratis?",
    a: "Te avisaremos antes de que llegues al límite. Podrás actualizar a un plan Pro o Empresa para seguir creando cotizaciones sin restricciones, sin perder ningún dato.",
  },
  {
    q: "¿Las plantillas son editables?",
    a: "El contenido se llena automáticamente con tus datos. Además puedes elegir entre diferentes estilos y colores para que cada cotización refleje la identidad de tu marca.",
  },
]
