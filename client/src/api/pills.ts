import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export type MedicineForm = 'CAPSULE' | 'TABLET' | 'LIQUID' | 'POWDER' | 'GUMMY' | 'INJECTION' | 'TOPICAL' | 'OTHER';
export type Frequency = 'DAILY' | 'WEEKLY' | 'AS_NEEDED';

export interface IntakeLog {
  id: number;
  takenAt: string;
}

export interface Pill {
  id: number;
  name: string;
  form: MedicineForm;
  amount: number;
  unit: string;
  frequency: Frequency;
  timesPerDay: number;
  currentStock?: number;
  description?: string;
  logs?: IntakeLog[];
}

// 1. Get all pills
export const fetchPills = async (): Promise<Pill[]> => {
  const response = await axios.get(`${API_URL}/pills`);
  return response.data;
};

// 2. Add a new pill
export const addPill = async (pill: Omit<Pill, 'id' | 'logs'>) => {
  const response = await axios.post(`${API_URL}/pills`, pill);
  return response.data;
};

// 3. Log that we took a pill
export const logPillIntake = async (id: number) => {
  const response = await axios.post(`${API_URL}/pills/${id}/log`);
  return response.data;
};