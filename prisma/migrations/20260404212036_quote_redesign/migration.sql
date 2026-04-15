/*
  Warnings:

  - You are about to drop the column `amount` on the `Quote` table. All the data in the column will be lost.
  - Added the required column `clientName` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtotal` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Made the column `profileType` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Quote" DROP COLUMN "amount",
ADD COLUMN     "clientName" TEXT NOT NULL,
ADD COLUMN     "discount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "subtotal" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "tax" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "validUntil" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "profileType" SET NOT NULL,
ALTER COLUMN "profileType" SET DEFAULT 'independent';

-- CreateTable
CREATE TABLE "QuoteItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "quoteId" TEXT NOT NULL,

    CONSTRAINT "QuoteItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QuoteItem" ADD CONSTRAINT "QuoteItem_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "Quote"("id") ON DELETE CASCADE ON UPDATE CASCADE;
