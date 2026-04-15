import { ComponentType } from "react"

//  IMPORTS CLÁSICAS
import TemplateClasica from "@/components/plantillas/clasica/TemplateClasica"
import TemplateClasica2 from "@/components/plantillas/clasica/TemplateClasica2"
import TemplateClasica3 from "@/components/plantillas/clasica/TemplateClasica3"
import TemplateClasica4 from "@/components/plantillas/clasica/TemplateClasica4"
import TemplateClasica5 from "@/components/plantillas/clasica/TemplateClasica5"
import TemplateClasica6 from "@/components/plantillas/clasica/TemplateClasica6"
import TemplateClasica7 from "@/components/plantillas/clasica/TemplateClasica7"
import TemplateClasica8 from "@/components/plantillas/clasica/TemplateClasica8"
import TemplateClasica9 from "@/components/plantillas/clasica/TemplateClasica9"
import TemplateClasica10 from "@/components/plantillas/clasica/TemplateClasica10"

// IMPORTS MODERNAS
import TemplateModerna from "@/components/plantillas/moderna/TemplateModerna"
import TemplateModerna2 from "@/components/plantillas/moderna/TemplateModerna2"
import TemplateModerna3 from "@/components/plantillas/moderna/TemplateModerna3"
import TemplateModerna4 from "@/components/plantillas/moderna/TemplateModerna4"
import TemplateModerna5 from "@/components/plantillas/moderna/TemplateModerna5"
import TemplateModerna6 from "@/components/plantillas/moderna/TemplateModerna6"
import TemplateModerna7 from "@/components/plantillas/moderna/TemplateModerna7"
import TemplateModerna8 from "@/components/plantillas/moderna/TemplateModerna8"
import TemplateModerna9 from "@/components/plantillas/moderna/TemplateModerna9"
import TemplateModerna10 from "@/components/plantillas/moderna/TemplateModerna10"


export type TemplateComponent = ComponentType<{ data: any }>
export const templateMap: Record<string, TemplateComponent> = {
  // CLÁSICAS
  "clasica-1": TemplateClasica,
  "clasica-2": TemplateClasica2,
  "clasica-3": TemplateClasica3,
  "clasica-4": TemplateClasica4,
  "clasica-5": TemplateClasica5,
  "clasica-6": TemplateClasica6,
  "clasica-7": TemplateClasica7,
  "clasica-8": TemplateClasica8,
  "clasica-9": TemplateClasica9,
  "clasica-10": TemplateClasica10,

  // MODERNAS
  "moderna-1": TemplateModerna,
  "moderna-2": TemplateModerna2,
  "moderna-3": TemplateModerna3,
  "moderna-4": TemplateModerna4,
  "moderna-5": TemplateModerna5,
  "moderna-6": TemplateModerna6,
  "moderna-7": TemplateModerna7,
  "moderna-8": TemplateModerna8,
  "moderna-9": TemplateModerna9,
  "moderna-10": TemplateModerna10,
}
