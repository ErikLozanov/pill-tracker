import { PrismaClient, MedicineForm, Frequency } from '@prisma/client';

// Best Practice: In a real app, import this from a dedicated 'db.ts' file
// to avoid creating too many connections. For now, this works.
const prisma = new PrismaClient();

export interface CreatePillDTO {
  name: string;
  form: MedicineForm;
  amount: number;
  unit: string;
  frequency: Frequency;
  timesPerDay: number;
  currentStock?: number;
  description?: string;
}

export const getAllPills = async (userId: string) => {
  return await prisma.pill.findMany({
    where: { userId }, 
    orderBy: { createdAt: 'desc' },
    include: {
      logs: {
        orderBy: { takenAt: 'desc' },
        take: 10 
      }
    }
  });
};

export const getPillById = async (id: number, userId: string) => {
  return await prisma.pill.findFirst({
    where: { 
      id, 
      userId 
    } 
  });
};

export const createPill = async (userId: string, data: CreatePillDTO) => {
  return await prisma.pill.create({
    data: {
      ...data,
      userId, // <--- SECURITY: Stamp it with Auth User ID
      description: data.description || '',
    },
  });
};

export const updatePill = async (id: number, userId: string, data: Partial<CreatePillDTO>) => {
  // First, verify ownership
  const exists = await prisma.pill.findFirst({ where: { id, userId } });
  if (!exists) throw new Error("Not authorized or pill not found");

  return await prisma.pill.update({
    where: { id },
    data
  });
};

export const deletePill = async (id: number, userId: string) => {
  const exists = await prisma.pill.findFirst({ where: { id, userId } });
  if (!exists) throw new Error("Not authorized or pill not found");

  return await prisma.pill.delete({
    where: { id }
  });
};

export const logIntake = async (pillId: number, userId: string) => {
  const pill = await prisma.pill.findFirst({ where: { id: pillId, userId } });
  if (!pill) throw new Error("Pill not found or unauthorized");

  return await prisma.$transaction(async (tx) => {
    let newStock = pill.currentStock;
    
    // Decrement stock if tracking enabled
    if (newStock !== null) {
      newStock = Math.max(0, newStock - pill.amount);
    }

    // Update pill stock if changed
    if (newStock !== pill.currentStock) {
        await tx.pill.update({
            where: { id: pillId },
            data: { currentStock: newStock }
        });
    }

    // Create Log
    return await tx.intakeLog.create({
      data: { pillId },
    });
  });
};

export const undoLastIntake = async (pillId: number, userId: string) => {
    const pill = await prisma.pill.findFirst({ where: { id: pillId, userId } });
    if (!pill) throw new Error("Pill not found or unauthorized");

    return await prisma.$transaction(async (tx) => {
        // Find the most recent log
        const lastLog = await tx.intakeLog.findFirst({
            where: { pillId },
            orderBy: { takenAt: 'desc' }
        });

        if (!lastLog) throw new Error("No logs to undo");

        // Restore Stock
        if (pill.currentStock !== null) {
            await tx.pill.update({
                where: { id: pillId },
                data: { currentStock: pill.currentStock + pill.amount }
            });
        }

        // Delete the log
        return await tx.intakeLog.delete({
            where: { id: lastLog.id }
        });
    });
};