import { useState, type FormEvent } from "react"
import {
  FORGOT_PASSWORD_REQUIRED_EMAIL_MESSAGE,
  FORGOT_PASSWORD_SERVER_ERROR_MESSAGE,
  FORGOT_PASSWORD_SUCCESS_MESSAGE,
} from "./forgotPassword.constants"

export type ForgotPasswordMessageType = "success" | "error"

type ForgotPasswordApiResponse = {
  message?: string
  error?: string
}

export function useForgotPassword() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] =
    useState<ForgotPasswordMessageType>("success")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const cleanEmail = email.trim()

    if (!cleanEmail) {
      setMessageType("error")
      setMessage(FORGOT_PASSWORD_REQUIRED_EMAIL_MESSAGE)
      return
    }

    setLoading(true)
    setMessage("")

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: cleanEmail }),
      })

      const data = (await response.json()) as ForgotPasswordApiResponse

      if (!response.ok) {
        setMessageType("error")
        setMessage(data.error || FORGOT_PASSWORD_SERVER_ERROR_MESSAGE)
        return
      }

      setMessageType("success")
      setMessage(data.message || FORGOT_PASSWORD_SUCCESS_MESSAGE)
    } catch {
      setMessageType("error")
      setMessage(FORGOT_PASSWORD_SERVER_ERROR_MESSAGE)
    } finally {
      setLoading(false)
    }
  }

  return {
    email,
    setEmail,
    message,
    messageType,
    loading,
    handleSubmit,
  }
}
