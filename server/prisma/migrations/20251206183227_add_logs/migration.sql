-- CreateTable
CREATE TABLE "IntakeLog" (
    "id" SERIAL NOT NULL,
    "takenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pillId" INTEGER NOT NULL,

    CONSTRAINT "IntakeLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "IntakeLog" ADD CONSTRAINT "IntakeLog_pillId_fkey" FOREIGN KEY ("pillId") REFERENCES "Pill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
