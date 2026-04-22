import type { ComponentType } from "react"

export type TemplateCategoryId = "clasica" | "moderna" | "premium"
export type TemplateCategoryAccess = "basic" | "pro" | "premium"

export type TemplateCategoryItem = {
  id: TemplateCategoryId
  name: string
  description: string
  type: TemplateCategoryAccess
  icon: string
  count: number
  accent: string
}

export type TemplateComponentProps = {
  data: any
}

export type TemplateComponentType = ComponentType<TemplateComponentProps>

export type Template = {
  id: string
  name: string
  category: TemplateCategoryId
  type: TemplateCategoryAccess
  component: TemplateComponentType
  preview?: string
  description?: string
}
