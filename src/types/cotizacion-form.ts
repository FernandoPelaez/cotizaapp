export type ProfileType = "independiente" | "negocio"

export type Service = {
  name: string
  price: number
}

export type Product = {
  name: string
  quantity: number
  price: number
}

export type TemplateData = {
  title: string
  description?: string
  clientName: string
  clientEmail: string
  clientPhone: string
  clientAddress?: string
  clientRFC?: string
  companyName: string
  companyLogo?: string
  services: Service[]
  products: Product[]
  discount: number
  tax: number
  subtotal: number
  total: number
  notes: string
  validUntil?: string
  docNumber?: string
  date?: string
}

export type Toast = {
  id: number
  message: string
  type: "success" | "error" | "warning"
}

export type ProfileResponse = {
  success?: boolean
  profileType?: ProfileType | null
  profileCompleted?: boolean
  onboardingStep?: number
  user?: {
    profileType?: ProfileType | null
  }
  error?: string
}

export type LimitModalState = {
  open: boolean
  title: string
  message: string
}
