-- CreateTable
CREATE TABLE "Invoices" (
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

    CONSTRAINT "Invoices_pkey" PRIMARY KEY ("id")
);
