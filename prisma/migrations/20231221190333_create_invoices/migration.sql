/*
  Warnings:

  - You are about to drop the `Invoices` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Invoices";

-- CreateTable
CREATE TABLE "invoices" (
    "id" TEXT NOT NULL,
    "clientNumber" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "eletricEnergyQty" DOUBLE PRECISION NOT NULL,
    "eletricEnergyAmount" DOUBLE PRECISION NOT NULL,
    "eletricEnergyWithoutICMSQty" DOUBLE PRECISION NOT NULL,
    "eletricEnergyWithoutICMSAmount" DOUBLE PRECISION NOT NULL,
    "compensedEletricEnergyQty" DOUBLE PRECISION NOT NULL,
    "compensedEletricEnergyAmount" DOUBLE PRECISION NOT NULL,
    "publicContribute" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);
