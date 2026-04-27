export type HeroTemplateItem = {
  desc: string
  qty: number
  precio: string
}

export type HeroTemplate = {
  nombre: string
  tipo: string
  color: string
  acento: string
  cliente: string
  numero: string
  items: HeroTemplateItem[]
  total: string
}

export const heroTemplates: HeroTemplate[] = [
  {
    nombre: "Clásica elegante",
    tipo: "CLÁSICA",
    color: "#1B3D7A",
    acento: "#D1DCF5",
    cliente: "Constructora Norte SA",
    numero: "COT-001",
    items: [
      { desc: "Diseño arquitectónico", qty: 1, precio: "$8,500" },
      { desc: "Planos estructurales", qty: 2, precio: "$3,200" },
      { desc: "Supervisión de obra", qty: 1, precio: "$5,800" },
    ],
    total: "$17,500",
  },
  {
    nombre: "Clásica esmeralda",
    tipo: "ESMERALDA",
    color: "#065f46",
    acento: "#d1fae5",
    cliente: "EcoVerde Consulting",
    numero: "COT-003",
    items: [
      { desc: "Auditoría ambiental", qty: 1, precio: "$4,500" },
      { desc: "Informe de impacto", qty: 1, precio: "$2,800" },
      { desc: "Certificación ISO", qty: 1, precio: "$3,200" },
    ],
    total: "$10,500",
  },
  {
    nombre: "Clásica índigo",
    tipo: "ÍNDIGO",
    color: "#3730a3",
    acento: "#e0e7ff",
    cliente: "Digital Mind Agency",
    numero: "COT-004",
    items: [
      { desc: "Estrategia digital", qty: 1, precio: "$7,000" },
      { desc: "Campaña SEM", qty: 1, precio: "$4,500" },
      { desc: "Analítica mensual", qty: 3, precio: "$3,600" },
    ],
    total: "$15,100",
  },
  {
    nombre: "Clásica gris",
    tipo: "GRIS",
    color: "#374151",
    acento: "#f3f4f6",
    cliente: "Soluciones Grales SA",
    numero: "COT-005",
    items: [
      { desc: "Consultoría general", qty: 1, precio: "$5,000" },
      { desc: "Reporte ejecutivo", qty: 1, precio: "$2,500" },
      { desc: "Seguimiento mensual", qty: 2, precio: "$4,000" },
    ],
    total: "$11,500",
  },
]

export const typewriterWords = [
  "profesionales",
  "modernas",
  "elegantes",
  "claras",
  "formales",
]
