-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "confirmDelete" BOOLEAN NOT NULL DEFAULT true,
    "confirmPDF" BOOLEAN NOT NULL DEFAULT true,
    "autoSave" BOOLEAN NOT NULL DEFAULT true,
    "autoDownloadPDF" BOOLEAN NOT NULL DEFAULT false,
    "openPDFNewTab" BOOLEAN NOT NULL DEFAULT true,
    "notifyLimit" BOOLEAN NOT NULL DEFAULT true,
    "systemConfirmations" BOOLEAN NOT NULL DEFAULT true,
    "notes" TEXT,
    "conditions" TEXT,
    "validity" TEXT,
    "fileName" TEXT DEFAULT 'Cotizacion',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Settings_userId_key" ON "Settings"("userId");

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
