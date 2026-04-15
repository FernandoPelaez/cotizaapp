"use client"

import { useMemo } from "react"
import { useParams } from "next/navigation"
import TemplateCard from "@/components/dashboard/plantillas/TemplateCard"
import { templateMap } from "@/lib/templates"
import { Template } from "@/types/template"

type Categoria = "clasica" | "moderna"

const templateCatalog: Omit<Template, "component">[] = [
  { id: "clasica-1", name: "Clásica elegante", category: "clasica", type: "basic" },
  { id: "clasica-2", name: "Clásica profesional", category: "clasica", type: "basic" },
  { id: "clasica-3", name: "Clásica 3", category: "clasica", type: "basic" },
  { id: "clasica-4", name: "Clásica 4", category: "clasica", type: "basic" },
  { id: "clasica-5", name: "Clásica 5", category: "clasica", type: "basic" },
  { id: "clasica-6", name: "Clásica 6", category: "clasica", type: "basic" },
  { id: "clasica-7", name: "Clásica 7", category: "clasica", type: "basic" },
  { id: "clasica-8", name: "Clásica 8", category: "clasica", type: "basic" },
  { id: "clasica-9", name: "Clásica 9", category: "clasica", type: "basic" },
  { id: "clasica-10", name: "Clásica 10", category: "clasica", type: "basic" },

  { id: "moderna-1", name: "Moderna premium", category: "moderna", type: "pro" },
  { id: "moderna-2", name: "Moderna split", category: "moderna", type: "pro" },
  { id: "moderna-3", name: "Moderna cards", category: "moderna", type: "pro" },
  { id: "moderna-4", name: "Moderna elegante", category: "moderna", type: "pro" },
  { id: "moderna-5", name: "Moderna dark", category: "moderna", type: "pro" },
  { id: "moderna-6", name: "Moderna minimal pro", category: "moderna", type: "pro" },
  { id: "moderna-7", name: "Moderna corporativa", category: "moderna", type: "pro" },
  { id: "moderna-8", name: "Moderna clean pro", category: "moderna", type: "pro" },
  { id: "moderna-9", name: "Moderna contrast", category: "moderna", type: "pro" },
  { id: "moderna-10", name: "Moderna avanzada", category: "moderna", type: "pro" },
]

function isValidCategoria(value: string): value is Categoria {
  return value === "clasica" || value === "moderna"
}

export default function CategoriaPage() {
  const params = useParams()

  const categoriaParam = Array.isArray(params.categoria)
    ? params.categoria[0]
    : params.categoria

  const categoria =
    typeof categoriaParam === "string" ? categoriaParam.toLowerCase() : ""

  const templates = useMemo<Template[]>(() => {
    return templateCatalog
      .map((template) => ({
        ...template,
        component: templateMap[template.id],
      }))
      .filter((template): template is Template => Boolean(template.component))
  }, [])

  const filteredTemplates = useMemo(() => {
    if (!isValidCategoria(categoria)) return []
    return templates.filter((template) => template.category === categoria)
  }, [categoria, templates])

  if (!isValidCategoria(categoria)) {
    return (
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-semibold text-neutral-900">
          Categoría no válida
        </h1>
        <p className="text-neutral-500">
          La categoría que intentas abrir no existe.
        </p>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold capitalize text-neutral-900">
          Plantillas {categoria}
        </h1>
        <p className="text-neutral-500">
          Selecciona una plantilla para comenzar tu cotización
        </p>
      </div>

      {filteredTemplates.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-8 text-center">
          <p className="text-sm text-neutral-500">
            No hay plantillas disponibles en esta categoría.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      )}
    </div>
  )
}
