import type { ProfileType, Question } from "../types"

export const QUESTIONS: Record<ProfileType, Question[]> = {
  independiente: [
    {
      key: "area",
      label: "Pregunta 1 de 3",
      question: "¿Qué tipo de trabajo o servicio ofreces principalmente?",
      options: [
        "Servicios técnicos u oficios",
        "Construcción, reparación o mantenimiento",
        "Diseño, creatividad o marketing",
        "Tecnología o desarrollo de software",
        "Consultoría, asesoría o servicios profesionales",
        "Otro tipo de servicio independiente",
      ],
    },
    {
      key: "cobro",
      label: "Pregunta 2 de 3",
      question: "¿Cómo acostumbras cobrar tu trabajo?",
      options: [
        "Por trabajo o proyecto terminado",
        "Por hora o por día de trabajo",
        "Por paquete de servicios",
        "Por material más mano de obra",
        "Depende del tipo de cliente o servicio",
      ],
    },
    {
      key: "anticipo",
      label: "Pregunta 3 de 3",
      question: "¿Sueles pedir anticipo antes de comenzar?",
      options: [
        "Sí, casi siempre pido anticipo",
        "A veces, depende del trabajo",
        "No, normalmente cobro al terminar",
        "Depende si tengo que comprar materiales",
      ],
    },
  ],
  negocio: [
    {
      key: "tipo",
      label: "Pregunta 1 de 3",
      question: "¿Qué ofrece principalmente tu negocio?",
      options: [
        "Productos físicos",
        "Servicios",
        "Productos y servicios",
        "Trabajos personalizados o por pedido",
        "Venta local con atención directa al cliente",
      ],
    },
    {
      key: "fiscal",
      label: "Pregunta 2 de 3",
      question: "¿Normalmente necesitas agregar datos fiscales en tus cotizaciones?",
      options: [
        "Sí, casi siempre uso RFC o razón social",
        "A veces, solo cuando el cliente lo pide",
        "No, normalmente hago cotizaciones simples",
        "Todavía no estoy seguro, quiero dejarlo opcional",
      ],
    },
    {
      key: "iva",
      label: "Pregunta 3 de 3",
      question: "¿Cómo prefieres manejar impuestos o IVA en tus precios?",
      options: [
        "Mostrar el IVA desglosado aparte",
        "Usar precios con IVA incluido",
        "No manejar IVA en mis cotizaciones",
        "Dejarlo editable según cada cotización",
      ],
    },
  ],
}
