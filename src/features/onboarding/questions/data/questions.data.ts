import type { ProfileType, Question } from "../types"

export const QUESTIONS: Record<ProfileType, Question[]> = {
  independiente: [
    {
      key: "area",
      label: "Pregunta 1 de 3",
      question: "¿En qué área trabajas principalmente?",
      options: [
        "Diseño y creatividad",
        "Desarrollo de software",
        "Consultoría y asesoría",
        "Fotografía / Video",
        "Marketing digital",
      ],
    },
    {
      key: "cobro",
      label: "Pregunta 2 de 3",
      question: "¿Cómo cobras normalmente?",
      options: [
        "Por proyecto completo",
        "Por hora trabajada",
        "Por paquete de servicios",
      ],
    },
    {
      key: "anticipo",
      label: "Pregunta 3 de 3",
      question: "¿Pides anticipo en tus cotizaciones?",
      options: [
        "Sí, siempre incluyo anticipo",
        "A veces, depende del proyecto",
        "No, cobro al entregar",
      ],
    },
  ],
  negocio: [
    {
      key: "tipo",
      label: "Pregunta 1 de 3",
      question: "¿Qué vendes principalmente?",
      options: [
        "Productos físicos",
        "Servicios",
        "Productos y servicios",
        "Productos digitales",
      ],
    },
    {
      key: "fiscal",
      label: "Pregunta 2 de 3",
      question: "¿Manejas datos fiscales (RFC, razón social)?",
      options: [
        "Sí, siempre facturo",
        "A veces facturo, a veces no",
        "No, solo cotizo sin factura",
      ],
    },
    {
      key: "iva",
      label: "Pregunta 3 de 3",
      question: "¿Cómo manejas el IVA en tus precios?",
      options: [
        "Precios con IVA incluido",
        "IVA desglosado aparte",
        "Sin IVA",
      ],
    },
  ],
}
