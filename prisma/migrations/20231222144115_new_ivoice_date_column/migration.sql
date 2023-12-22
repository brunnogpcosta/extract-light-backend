/*
  Warnings:

  - Added the required column `invoiceDate` to the `invoices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "invoices" ADD COLUMN     "invoiceDate" TIMESTAMP(3) NOT NULL;
