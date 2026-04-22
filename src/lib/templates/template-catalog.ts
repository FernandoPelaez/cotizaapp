import type {
  TemplateCategoryAccess,
  TemplateCategoryId,
} from "@/types/template"

export type TemplateCatalogItem = {
  id: string
  name: string
  category: TemplateCategoryId
  type: TemplateCategoryAccess
  description?: string
  preview?: string
}

export const templateCatalog: TemplateCatalogItem[] = [
  // CLÁSICAS
  {
    id: "clasica-1",
    name: "Clásica elegante",
    category: "clasica",
    type: "basic",
  },
  {
    id: "clasica-2",
    name: "Clásica profesional",
    category: "clasica",
    type: "basic",
  },
  {
    id: "clasica-3",
    name: "Clásica 3",
    category: "clasica",
    type: "basic",
  },
  {
    id: "clasica-4",
    name: "Clásica 4",
    category: "clasica",
    type: "basic",
  },
  {
    id: "clasica-5",
    name: "Clásica 5",
    category: "clasica",
    type: "basic",
  },
  {
    id: "clasica-6",
    name: "Clásica 6",
    category: "clasica",
    type: "basic",
  },
  {
    id: "clasica-7",
    name: "Clásica 7",
    category: "clasica",
    type: "basic",
  },
  {
    id: "clasica-8",
    name: "Clásica 8",
    category: "clasica",
    type: "basic",
  },
  {
    id: "clasica-9",
    name: "Clásica 9",
    category: "clasica",
    type: "basic",
  },
  {
    id: "clasica-10",
    name: "Clásica 10",
    category: "clasica",
    type: "basic",
  },

  // MODERNAS
  {
    id: "moderna-1",
    name: "Moderna premium",
    category: "moderna",
    type: "pro",
  },
  {
    id: "moderna-2",
    name: "Moderna split",
    category: "moderna",
    type: "pro",
  },
  {
    id: "moderna-3",
    name: "Moderna cards",
    category: "moderna",
    type: "pro",
  },
  {
    id: "moderna-4",
    name: "Moderna elegante",
    category: "moderna",
    type: "pro",
  },
  {
    id: "moderna-5",
    name: "Moderna dark",
    category: "moderna",
    type: "pro",
  },
  {
    id: "moderna-6",
    name: "Moderna minimal pro",
    category: "moderna",
    type: "pro",
  },
  {
    id: "moderna-7",
    name: "Moderna corporativa",
    category: "moderna",
    type: "pro",
  },
  {
    id: "moderna-8",
    name: "Moderna clean pro",
    category: "moderna",
    type: "pro",
  },
  {
    id: "moderna-9",
    name: "Moderna contrast",
    category: "moderna",
    type: "pro",
  },
  {
    id: "moderna-10",
    name: "Moderna avanzada",
    category: "moderna",
    type: "pro",
  },

  // PREMIUM
  {
    id: "premium-1",
    name: "Premium royal",
    category: "premium",
    type: "premium",
  },
  {
    id: "premium-2",
    name: "Premium executive",
    category: "premium",
    type: "premium",
  },
  {
    id: "premium-3",
    name: "Premium elite",
    category: "premium",
    type: "premium",
  },
  {
    id: "premium-4",
    name: "Premium prestige",
    category: "premium",
    type: "premium",
  },
  {
    id: "premium-5",
    name: "Premium luxury",
    category: "premium",
    type: "premium",
  },
  {
    id: "premium-6",
    name: "Premium signature",
    category: "premium",
    type: "premium",
  },
  {
    id: "premium-7",
    name: "Premium black",
    category: "premium",
    type: "premium",
  },
  {
    id: "premium-8",
    name: "Premium gold",
    category: "premium",
    type: "premium",
  },
  {
    id: "premium-9",
    name: "Premium platinum",
    category: "premium",
    type: "premium",
  },
  {
    id: "premium-10",
    name: "Premium master",
    category: "premium",
    type: "premium",
  },
]

export function getTemplatesByCategory(category: TemplateCategoryId) {
  return templateCatalog.filter((template) => template.category === category)
}

export function getTemplateCatalogItemById(templateId: string) {
  return templateCatalog.find((template) => template.id === templateId)
}
