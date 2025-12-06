
interface Pill {
  id: number;
  name: string;
  dosage: string;
}

export const getAllPills = async (): Promise<Pill[]> => {
  return [
    { id: 1, name: "Vitamin D", dosage: "2000 IU" },
    { id: 2, name: "Magnesium", dosage: "500mg" },
  ];
};

export const createPill = async (name: string, dosage: string): Promise<Pill> => {
  return {
    id: Math.floor(Math.random() * 1000),
    name,
    dosage,
  };
};