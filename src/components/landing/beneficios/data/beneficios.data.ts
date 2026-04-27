export type BeneficioItem = {
  title: string
  desc: string
  gradient: string
  icon: string
  iconBg: string
}

export const beneficiosItems: BeneficioItem[] = [
  {
    title: "Cotizaciones en minutos",
    desc: "Genera documentos listos para enviar sin procesos manuales ni hojas de cálculo.",
    gradient: "from-blue-700 to-blue-900",
    icon: "⚡",
    iconBg: "bg-blue-400/15",
  },
  {
    title: "Cálculos sin errores",
    desc: "Precios, descuentos e IVA calculados automáticamente. Sin equivocaciones.",
    gradient: "from-emerald-600 to-emerald-900",
    icon: "✓",
    iconBg: "bg-emerald-400/15",
  },
  {
    title: "Imagen profesional",
    desc: "Documentos limpios y modernos con tu marca desde el primer vistazo.",
    gradient: "from-violet-700 to-violet-900",
    icon: "★",
    iconBg: "bg-violet-400/15",
  },
  {
    title: "Comparte al instante",
    desc: "Envía por WhatsApp o correo directo. Tu cliente recibe la cotización en segundos.",
    gradient: "from-orange-500 to-orange-900",
    icon: "↗",
    iconBg: "bg-orange-400/15",
  },
  {
    title: "Historial organizado",
    desc: "Filtra por cliente, fecha o monto y retoma cualquier cotización anterior.",
    gradient: "from-rose-600 to-rose-900",
    icon: "📋",
    iconBg: "bg-rose-400/15",
  },
  {
    title: "Plantillas modernas",
    desc: "Diseños adaptados a tu giro que transmiten seriedad y profesionalismo.",
    gradient: "from-sky-600 to-sky-900",
    icon: "◈",
    iconBg: "bg-sky-400/15",
  },
  {
    title: "Clientes guardados",
    desc: "Reutiliza datos de tus clientes en futuras cotizaciones con un solo clic.",
    gradient: "from-amber-600 to-amber-900",
    icon: "👤",
    iconBg: "bg-amber-400/15",
  },
  {
    title: "Desde cualquier lugar",
    desc: "Funciona en celular, tablet o computadora. Sin instalar nada.",
    gradient: "from-teal-600 to-teal-900",
    icon: "☁",
    iconBg: "bg-teal-400/15",
  },
]
