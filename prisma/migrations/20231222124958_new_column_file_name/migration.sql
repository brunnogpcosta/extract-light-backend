/*
  Warnings:

  - Added the required column `fileName` to the `invoices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "invoices" ADD COLUMN     "fileName" TEXT NOT NULL;
