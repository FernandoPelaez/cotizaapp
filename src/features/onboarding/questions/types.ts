export type ProfileType = "independiente" | "negocio"

export type Question = {
  key: string
  label: string
  question: string
  options: string[]
}

export type Answers = Record<string, string>
