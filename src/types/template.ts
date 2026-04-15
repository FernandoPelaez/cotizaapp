import { ComponentType } from "react"

export type Template = {
  id: string
  name: string
  category: "clasica" | "moderna" | "minimalista"
  type: "basic" | "pro"
  
  component: ComponentType<any>   
  preview?: string

  description?: string           
}


