import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { token, password } = body

    if (!token || !password) {
      return NextResponse.json(
        { error: "Datos incompletos" },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "La contraseña debe tener al menos 6 caracteres" },
        { status: 400 }
      )
    }

    const storedToken = await prisma.verificationToken.findUnique({
      where: { token },
    })

    if (!storedToken) {
      return NextResponse.json(
        { error: "Token inválido" },
        { status: 400 }
      )
    }

    if (storedToken.expires < new Date()) {
      return NextResponse.json(
        { error: "Token expirado" },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email: storedToken.identifier },
    })

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    await prisma.user.update({
      where: { email: user.email },
      data: {
        password: hashedPassword,
      },
    })

    await prisma.verificationToken.delete({
      where: { token },
    })

    return NextResponse.json(
      {
        message: "Contraseña actualizada correctamente",
        email: user.email,
      },
      { status: 200 }
    )

  } catch (error) {
    console.error("RESET PASSWORD ERROR:", error)

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}