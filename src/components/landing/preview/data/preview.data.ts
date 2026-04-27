export type PreviewStep = {
  title: string
  desc: string
}

export const previewTabs = [
  { title: "Crear cotización" },
  { title: "Elegir plantilla" },
  { title: "Vista previa" },
  { title: "Descargar PDF" },
  { title: "Enviar" },
]

export const previewSteps: PreviewStep[] = [
  {
    title: "Crear cotización",
    desc: "Agrega tus productos o servicios en segundos. El sistema calcula subtotales, impuestos y el total automáticamente sin errores.",
  },
  {
    title: "Elegir plantilla",
    desc: "Selecciona entre diseños modernos y profesionales. Cada plantilla se adapta a tu giro de negocio con colores y estilos únicos.",
  },
  {
    title: "Vista previa",
    desc: "Revisa exactamente cómo verá tu cliente la cotización antes de enviarla. Corrige cualquier detalle en tiempo real.",
  },
  {
    title: "Descargar PDF",
    desc: "Genera un PDF listo para compartir o imprimir con un solo clic. Formato profesional, limpio y con tu información de empresa.",
  },
  {
    title: "Enviar",
    desc: "Comparte por WhatsApp directamente desde la app. Recibe notificación cuando tu cliente abre la cotización.",
  },
]

export const quoteItems = [
  { desc: "Diseño de logotipo", qty: 1, precio: "$3,500" },
  { desc: "Manual de marca", qty: 1, precio: "$2,200" },
  { desc: "Tarjetas de presentación", qty: 200, precio: "$1,800" },
]

export const templateOptions = [
  {
    nombre: "Clásica elegante",
    color: "#1B3D7A",
    acento: "#EEF2FA",
    circulo1: "#c7d7f5",
  },
  {
    nombre: "Esmeralda",
    color: "#065f46",
    acento: "#ecfdf5",
    circulo1: "#6ee7b7",
  },
  {
    nombre: "Índigo moderno",
    color: "#3730a3",
    acento: "#eef2ff",
    circulo1: "#a5b4fc",
  },
]

export const previewRows = [
  { desc: "Diseño de logotipo", total: "$3,500" },
  { desc: "Manual de marca", total: "$2,200" },
  { desc: "Tarjetas (200 pzs)", total: "$1,800" },
]

export const pdfFeatures = [
  "✓ Firma incluida",
  "✓ Sin marca de agua",
  "✓ Alta calidad",
]