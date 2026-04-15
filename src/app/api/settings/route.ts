import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

function json(data: unknown, status = 200) {
  return NextResponse.json(data, { status });
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;

    if (!userId) {
      return json({ error: "No autorizado" }, 401);
    }

    let settings = await prisma.settings.findUnique({
      where: { userId },
    });

    if (!settings) {
      settings = await prisma.settings.create({
        data: {
          userId,
        },
      });
    }

    return json(settings);

  } catch (error) {
    console.error("GET /api/settings error:", error);
    return json({ error: "Error interno" }, 500);
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;

    if (!userId) {
      return json({ error: "No autorizado" }, 401);
    }

    const body = await req.json();
    
    const allowedFields = {
      confirmDelete: body.confirmDelete,
      confirmPDF: body.confirmPDF,
      autoSave: body.autoSave,
      autoDownloadPDF: body.autoDownloadPDF,
      openPDFNewTab: body.openPDFNewTab,
      notifyLimit: body.notifyLimit,
      systemConfirmations: body.systemConfirmations,
      notes: body.notes,
      conditions: body.conditions,
      validity: body.validity,
      fileName: body.fileName,
    };

    const settings = await prisma.settings.upsert({
      where: { userId },
      update: allowedFields,
      create: {
        userId,
        ...allowedFields,
      },
    });

    return json(settings, 200);

  } catch (error) {
    console.error("POST /api/settings error:", error);
    return json({ error: "Error interno" }, 500);
  }
}
