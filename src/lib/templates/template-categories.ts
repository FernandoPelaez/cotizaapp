import type { TemplateCategoryItem } from "@/types/template"

export const templateCategories: TemplateCategoryItem[] = [
  {
    id: "clasica",
    name: "Clásica",
    description:
      "Plantillas tradicionales y formales para cotizaciones profesionales.",
    type: "basic",
    icon: "📄",
    count: 10,
    accent: "#1B3D7A",
  },
  {
    id: "moderna",
    name: "Moderna",
    description: "Diseños más visuales y atractivos para destacar tu marca.",
    type: "pro",
    icon: "✦",
    count: 10,
    accent: "#16A34A",
  },
  {
    id: "premium",
    name: "Premium",
    description:
      "Plantillas más exclusivas y avanzadas para propuestas con mayor impacto visual.",
    type: "premium",
    icon: "👑",
    count: 10,
    accent: "#7C3AED",
  },
]