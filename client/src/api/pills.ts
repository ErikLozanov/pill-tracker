import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

// Replicate Enums on Frontend
export type MedicineForm = 'CAPSULE' | 'TABLET' | 'LIQUID' | 'POWDER' | 'GUMMY' | 'INJECTION' | 'TOPICAL' | 'OTHER';
export type Frequency = 'DAILY' | 'WEEKLY' | 'AS_NEEDED';

export interface Pill {
  id: number;
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

export const fetchPills = async (): Promise<Pill[]> => {
  const response = await axios.get(`${API_URL}/pills`);
  return response.data;
};

export const addPill = async (pill: Omit<Pill, 'id'>) => {
  const response = await axios.post(`${API_URL}/pills`, pill);
  return response.data;
};