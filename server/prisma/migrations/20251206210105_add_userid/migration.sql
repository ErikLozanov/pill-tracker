/*
  Warnings:

  - Added the required column `userId` to the `Pill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pill" ADD COLUMN     "userId" TEXT NOT NULL;
