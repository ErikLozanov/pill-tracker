/*
  Warnings:

  - You are about to drop the column `dosage` on the `Pill` table. All the data in the column will be lost.
  - The `frequency` column on the `Pill` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `unit` to the `Pill` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MedicineForm" AS ENUM ('CAPSULE', 'TABLET', 'LIQUID', 'POWDER', 'GUMMY', 'INJECTION', 'TOPICAL', 'OTHER');

-- CreateEnum
CREATE TYPE "Frequency" AS ENUM ('DAILY', 'WEEKLY', 'AS_NEEDED');

-- AlterTable
ALTER TABLE "Pill" DROP COLUMN "dosage",
ADD COLUMN     "amount" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "currentStock" INTEGER,
ADD COLUMN     "form" "MedicineForm" NOT NULL DEFAULT 'CAPSULE',
ADD COLUMN     "strength" TEXT,
ADD COLUMN     "timesPerDay" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "unit" TEXT NOT NULL,
DROP COLUMN "frequency",
ADD COLUMN     "frequency" "Frequency" NOT NULL DEFAULT 'DAILY';
