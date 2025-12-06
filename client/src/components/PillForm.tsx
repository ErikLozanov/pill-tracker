import { useState } from 'react';
import type { MedicineForm, Frequency } from '../api/pills';
import { usePills } from '../hooks/usePills';

export const PillForm = () => {
  const { addPill, isAdding } = usePills();

  // Local State for the Form
  const [name, setName] = useState('');
  const [form, setForm] = useState<MedicineForm>('CAPSULE');
  const [strength, setStrength] = useState('');
  const [amount, setAmount] = useState(1);
  const [unit, setUnit] = useState('Pill');
  const [frequency, setFrequency] = useState<Frequency>('DAILY');
  const [timesPerDay, setTimesPerDay] = useState(1);
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPill(
      {
          name, form, strength, amount, unit, frequency, timesPerDay, description
      },
      {
        onSuccess: () => {
          // Reset only after success
          setName('');
          setStrength('');
          setDescription('');
        }
      }
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
      <h2 className="text-xl font-bold mb-4 text-blue-600">Add Medication</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">Name</label>
            <input required type="text" placeholder="e.g. Vitamin D3" className="w-full border p-2 rounded mt-1"
              value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">Type</label>
            <select className="w-full border p-2 rounded mt-1 bg-white"
              value={form} onChange={e => setForm(e.target.value as MedicineForm)}>
              <option value="CAPSULE">Capsule</option>
              <option value="TABLET">Tablet</option>
              <option value="POWDER">Powder</option>
              <option value="LIQUID">Liquid</option>
              <option value="GUMMY">Gummy</option>
              <option value="INJECTION">Injection</option>
            </select>
          </div>
        </div>

        {/* Row 2: Dosage Box */}
        <div className="bg-slate-50 p-4 rounded-lg grid grid-cols-3 gap-4">
           <div>
            <label className="text-xs font-bold text-gray-500 uppercase">Strength</label>
            <input type="text" placeholder="e.g. 500mg" className="w-full border p-2 rounded mt-1"
              value={strength} onChange={e => setStrength(e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">Amount</label>
            <input type="number" min="1" className="w-full border p-2 rounded mt-1"
              value={amount} onChange={e => setAmount(Number(e.target.value))} />
          </div>
           <div>
            <label className="text-xs font-bold text-gray-500 uppercase">Unit</label>
            <input type="text" placeholder="e.g. Pills" className="w-full border p-2 rounded mt-1"
              value={unit} onChange={e => setUnit(e.target.value)} />
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-2 gap-4">
           <div>
            <label className="text-xs font-bold text-gray-500 uppercase">Frequency</label>
             <select className="w-full border p-2 rounded mt-1 bg-white"
              value={frequency} onChange={e => setFrequency(e.target.value as Frequency)}>
              <option value="DAILY">Daily</option>
              <option value="WEEKLY">Weekly</option>
              <option value="AS_NEEDED">As Needed</option>
            </select>
          </div>
           <div>
            <label className="text-xs font-bold text-gray-500 uppercase">Times/Day</label>
            <input type="number" min="1" max="10" className="w-full border p-2 rounded mt-1"
              value={timesPerDay} onChange={e => setTimesPerDay(Number(e.target.value))} />
          </div>
        </div>

        <button disabled={isAdding} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-bold shadow-md transition-all">
          {isAdding ? 'Saving...' : 'Add Medication'}
        </button>
      </form>
    </div>
  );
};