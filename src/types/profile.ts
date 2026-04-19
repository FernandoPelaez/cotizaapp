export type SerializedProfileType = "independiente" | "negocio" | null

export type ProfileSummary = {
  phone: string | null
  city: string | null
  state: string | null
  businessName: string | null
  description: string | null
  logoUrl: string | null
}

export type PlanSummary = {
  id: string
  name: string
  price: number
  maxQuotes: number
  whatsappSend: boolean
}

export type DashboardProfileUser = {
  id: string
  email: string
  name: string | null
  image: string | null
  profileType: SerializedProfileType
  profileCompleted: boolean
  onboardingStep: number
  profile: ProfileSummary
  plan: PlanSummary | null
}

export type ProfileResponse = {
  success: boolean
  user: DashboardProfileUser
}

export type ProfileUpdateResponse = {
  success: boolean
  message: string
  user: DashboardProfileUser
}

export type ProfileFormValues = {
  phone: string
  city: string
  state: string
  businessName: string
  description: string
  logoUrl: string
}

export type ProfileUpdatePayload = Partial<ProfileFormValues>
