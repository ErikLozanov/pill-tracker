import { PrismaClient, MedicineForm, Frequency } from '@prisma/client';

interface CreatePillDTO {
  name: string;
  form: MedicineForm;
  amount: number;
  unit: string;
  frequency: Frequency;
  timesPerDay: number;
  currentStock?: number;
  description?: string;
}
const prisma = new PrismaClient();

export const getAllPills = async () => {
  return await prisma.pill.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      logs: {
        orderBy: { takenAt: 'desc' },
        take: 10 
      }
    }
  });
};

export const createPill = async (data: CreatePillDTO) => {
  return await prisma.pill.create({
    data: {
      name: data.name,
      form: data.form,
      amount: data.amount,
      unit: data.unit,
      frequency: data.frequency,
      timesPerDay: data.timesPerDay,
      currentStock: data.currentStock ?? null,
      description: data.description || '',
    },
  });
};

export const logIntake = async (pillId: number) => {
  return await prisma.$transaction(async (tx) => {
    const pill = await tx.pill.findUnique({
      where: { id: pillId }
    });

    if (!pill) throw new Error("Pill not found");

    let newStock = pill.currentStock;
    if (newStock !== null) {
      newStock = Math.max(0, newStock - pill.amount); 
    }

    if (newStock !== pill.currentStock) {
        await tx.pill.update({
            where: { id: pillId },
            data: { currentStock: newStock }
        });
    }

    return await tx.intakeLog.create({
      data: { pillId },
    });
  });
};