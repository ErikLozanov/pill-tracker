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

// Helper to attach the token
const getHeaders = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const fetchPills = async (token: string): Promise<Pill[]> => {
  const response = await axios.get(`${API_URL}/pills`, getHeaders(token));
  return response.data;
};

export const addPill = async (token: string, pill: Omit<Pill, 'id' | 'logs'>) => {
  const response = await axios.post(`${API_URL}/pills`, pill, getHeaders(token));
  return response.data;
};

export const logPillIntake = async (token: string, id: number) => {
  const response = await axios.post(`${API_URL}/pills/${id}/log`, {}, getHeaders(token));
  return response.data;
};

export const fetchPillById = async (token: string, id: number): Promise<Pill> => {
  const response = await axios.get(`${API_URL}/pills/${id}`, getHeaders(token));
  return response.data;
};

export const updatePill = async (token: string, data: { id: number; pill: Partial<Pill> }) => {
  const response = await axios.put(`${API_URL}/pills/${data.id}`, data.pill, getHeaders(token));
  return response.data;
};

export const deletePill = async (token: string, id: number) => {
  const response = await axios.delete(`${API_URL}/pills/${id}`, getHeaders(token));
  return response.data;
};

export const undoPillIntake = async (token: string, id: number) => {
  const response = await axios.post(`${API_URL}/pills/${id}/undo`, {}, getHeaders(token));
  return response.data;
};