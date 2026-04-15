import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import crypto from "crypto"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { error: "El email es obligatorio" },
        { status: 400 }
      )
    }

    const emailNormalized = email.toLowerCase().trim()

    const user = await prisma.user.findUnique({
      where: { email: emailNormalized },
    })

    if (!user) {
      return NextResponse.json(
        { message: "Si el email existe, se enviará un enlace" },
        { status: 200 }
      )
    }

    const token = crypto.randomBytes(32).toString("hex")
    const expires = new Date(Date.now() + 1000 * 60 * 60)

    await prisma.verificationToken.create({
      data: {
        identifier: emailNormalized,
        token,
        expires,
      },
    })

    const resetLink = `http://localhost:3000/auth/reset?token=${token}`
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: emailNormalized,
      subject: "Recuperar contraseña",
      html: `
        <h2>Recuperación de contraseña</h2>
        <p>Haz clic en el siguiente enlace:</p>
        <a href="${resetLink}">Restablecer contraseña</a>
        <p>Este enlace expira en 1 hora.</p>
      `,
    })

    return NextResponse.json(
      { message: "Si el email existe, revisa tu correo" },
      { status: 200 }
    )

  } catch (error) {
    console.error("FORGOT PASSWORD ERROR:", error)

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}