"use client"

import { useState, type FormEvent } from "react"
import {
  RESET_PASSWORD_MISSING_TOKEN_MESSAGE,
  RESET_PASSWORD_REQUIRED_MESSAGE,
  RESET_PASSWORD_SERVER_ERROR_MESSAGE,
  RESET_PASSWORD_SUCCESS_MESSAGE,
} from "./resetPassword.constants"

export type ResetPasswordMessageType = "success" | "error"

type ResetPasswordApiResponse = {
  email?: string
  error?: string
  message?: string
}

export function useResetPassword(token: string) {
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] =
    useState<ResetPasswordMessageType>("success")
  const [loading, setLoading] = useState(false)

  const cleanToken = token.trim()
  const canSubmit = Boolean(cleanToken)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const cleanPassword = password.trim()

    if (!cleanToken) {
      setMessageType("error")
      setMessage(RESET_PASSWORD_MISSING_TOKEN_MESSAGE)
      return
    }

    if (!cleanPassword) {
      setMessageType("error")
      setMessage(RESET_PASSWORD_REQUIRED_MESSAGE)
      return
    }

    setLoading(true)
    setMessage("")

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: cleanToken,
          password: cleanPassword,
        }),
      })

      const data = (await response.json()) as ResetPasswordApiResponse

      if (!response.ok) {
        setMessageType("error")
        setMessage(data.error || RESET_PASSWORD_SERVER_ERROR_MESSAGE)
        return
      }

      setMessageType("success")
      setMessage(data.message || RESET_PASSWORD_SUCCESS_MESSAGE)

      window.setTimeout(() => {
        const emailQuery = data.email
          ? `?email=${encodeURIComponent(data.email)}`
          : ""

        window.location.href = `/auth/signin${emailQuery}`
      }, 1500)
    } catch {
      setMessageType("error")
      setMessage(RESET_PASSWORD_SERVER_ERROR_MESSAGE)
    } finally {
      setLoading(false)
    }
  }

  return {
    password,
    setPassword,
    message,
    messageType,
    loading,
    canSubmit,
    handleSubmit,
  }
}
