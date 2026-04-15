-- AlterTable
ALTER TABLE "Template" ADD COLUMN     "category" TEXT;

-- CreateIndex
CREATE INDEX "Quote_userId_idx" ON "Quote"("userId");

-- CreateIndex
CREATE INDEX "Quote_templateId_idx" ON "Quote"("templateId");

-- CreateIndex
CREATE INDEX "Quote_createdAt_idx" ON "Quote"("createdAt");

-- CreateIndex
CREATE INDEX "QuoteItem_quoteId_idx" ON "QuoteItem"("quoteId");

-- CreateIndex
CREATE INDEX "Template_isPremium_idx" ON "Template"("isPremium");
