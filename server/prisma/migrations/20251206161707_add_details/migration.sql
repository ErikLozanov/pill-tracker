/*
  Warnings:

  - Added the required column `frequency` to the `Pill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pill" ADD COLUMN     "description" TEXT,
ADD COLUMN     "frequency" TEXT NOT NULL;
