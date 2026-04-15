import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password, name } = body

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "MISSING_FIELDS" },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "WEAK_PASSWORD" },
        { status: 400 }
      )
    }

    const emailNormalized = email.toLowerCase().trim()

    const existingUser = await prisma.user.findUnique({
      where: { email: emailNormalized },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "USER_ALREADY_EXISTS" },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        email: emailNormalized,
        name,
        password: hashedPassword,
      },
    })

    return NextResponse.json(
      { message: "USER_CREATED", user },
      { status: 201 }
    )

  } catch (error: any) {
    console.error("REGISTER ERROR:", {
      message: error?.message,
      code: error?.code,
    })

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "USER_ALREADY_EXISTS" },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "INTERNAL_SERVER_ERROR" },
      { status: 500 }
    )
  }
}
