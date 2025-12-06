import { PrismaClient, MedicineForm, Frequency } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllPills = async () => {
  return await prisma.pill.findMany({
    orderBy: { createdAt: 'desc' },
  });
};

interface CreatePillDTO {
  name: string;
  form: MedicineForm;
  strength?: string;
  amount: number;
  unit: string;
  frequency: Frequency;
  timesPerDay: number;
  currentStock?: number;
  description?: string;
}

export const createPill = async (data: CreatePillDTO) => {
  return await prisma.pill.create({
    data: {
      name: data.name,
      form: data.form,
      strength: data.strength ?? null,
      amount: data.amount,
      unit: data.unit,
      frequency: data.frequency,
      timesPerDay: data.timesPerDay,
      currentStock: data.currentStock ?? null,
      description: data.description || '',
    },
  });
};