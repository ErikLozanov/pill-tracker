import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, CheckCircle2, Minus, Plus, Package, StickyNote } from 'lucide-react';
import type { MedicineForm, Frequency } from '../api/pills';
import { usePills } from '../hooks/usePills';
import { FormSelector } from '../components/FormSelector';

export const AddPill = () => {
  const navigate = useNavigate();
  const { addPill, isAdding } = usePills();

  const [name, setName] = useState('');
  const [form, setForm] = useState<MedicineForm>('CAPSULE');
  const [amount, setAmount] = useState(1);
  const [unit, setUnit] = useState('Pill');
  
  const [currentStock, setCurrentStock] = useState<string>(''); 
  const [description, setDescription] = useState('');
  
  const [frequency, setFrequency] = useState<Frequency>('DAILY');
  const [timesPerDay, setTimesPerDay] = useState(1);

  // Auto-set unit
  const handleFormSelect = (selectedForm: MedicineForm) => {
    setForm(selectedForm);
    switch (selectedForm) {
      case 'LIQUID': setUnit('ml'); break;
      case 'POWDER': setUnit('Scoop'); break;
      case 'INJECTION': setUnit('ml'); break;
      case 'TABLET': setUnit('Tablet'); break;
      case 'GUMMY': setUnit('Gummy'); break;
      case 'CAPSULE': setUnit('Capsule'); break;
      default: setUnit('Pill');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    addPill(
      { 
        name, form, amount, unit, frequency, timesPerDay, description,
        currentStock: currentStock ? parseInt(currentStock) : undefined,
      },
      { onSuccess: () => navigate('/') }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="max-w-md mx-auto pb-10">
        
        {/* Navigation */}
        <button onClick={() => navigate('/')} className="flex items-center text-gray-500 hover:text-gray-900 mb-6 font-medium transition-colors">
          <ArrowLeft className="w-5 h-5 mr-1" /> Cancel
        </button>

        <h1 className="text-3xl font-black text-gray-800 mb-8">New Medication</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/*BASICS */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">The Basics</h2>
            
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <label className="block text-sm font-bold text-gray-700 mb-2">Medication Name</label>
              <input 
                required autoFocus
                type="text" placeholder="e.g. Omega 3" 
                className="w-full text-lg border-b-2 border-gray-100 focus:border-blue-500 outline-none py-2 transition-colors placeholder:text-gray-300"
                value={name} onChange={e => setName(e.target.value)} 
              />
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
               <label className="block text-sm font-bold text-gray-700 mb-4">Form Factor</label>
               <FormSelector selected={form} onSelect={handleFormSelect} />
            </div>
          </div>

          {/* SECTION 2: INVENTORY & DOSAGE */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Details</h2>
            
            <div className="grid grid-cols-2 gap-4">
              
              {/*Current Stock */}
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <label className="flex items-center gap-1 text-xs font-bold text-gray-400 uppercase mb-2">
                  <Package className="w-3 h-3" /> In Bottle
                </label>
                <input 
                  type="number" 
                  placeholder="180" 
                  className="w-full font-bold text-lg outline-none text-gray-800 placeholder:text-gray-300"
                  value={currentStock} onChange={e => setCurrentStock(e.target.value)} 
                />
                <span className="text-xs text-gray-400">Total count</span>
              </div>
              
              {/* Take Amount */}
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Take Amount</label>
                <div className="flex items-center justify-between gap-1">
                  <div className="flex items-center bg-gray-100 rounded-lg p-1">
                    <button type="button" onClick={() => setAmount(Math.max(1, amount - 1))}
                      className="w-7 h-7 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 active:scale-90 transition-all">
                      <Minus className="w-3 h-3" />
                    </button>
                    <input type="number" className="w-8 text-center bg-transparent font-bold text-gray-800 outline-none"
                      value={amount} onChange={e => setAmount(Number(e.target.value))} />
                    <button type="button" onClick={() => setAmount(amount + 1)}
                      className="w-7 h-7 flex items-center justify-center bg-white rounded shadow-sm text-blue-600 active:scale-90 transition-all">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <input type="text" className="w-full text-right text-sm font-medium text-gray-500 outline-none"
                    value={unit} onChange={e => setUnit(e.target.value)} />
                </div>
              </div>
            </div>

            {/*Notes / Description */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <label className="flex items-center gap-1 text-xs font-bold text-gray-400 uppercase mb-2">
                <StickyNote className="w-3 h-3" /> Notes (Optional)
              </label>
              <input 
                type="text" 
                placeholder="e.g. Take with food" 
                className="w-full font-medium text-gray-700 outline-none placeholder:text-gray-300"
                value={description} onChange={e => setDescription(e.target.value)} 
              />
            </div>
          </div>

          {/* SECTION 3: SCHEDULE */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Schedule</h2>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-5">
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                  <Calendar className="w-4 h-4 text-blue-500" /> Frequency
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['DAILY', 'WEEKLY', 'AS_NEEDED'] as Frequency[]).map((freq) => (
                    <button key={freq} type="button" onClick={() => setFrequency(freq)}
                      className={`py-2 px-1 rounded-lg text-xs font-bold border transition-all ${
                        frequency === freq ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                      }`}>
                      {freq.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {frequency !== 'AS_NEEDED' && (
                <div>
                   <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                    <Clock className="w-4 h-4 text-orange-500" /> Times per {frequency === 'DAILY' ? 'Day' : 'Week'}
                  </label>
                  <div className="flex items-center gap-4">
                    <button type="button" onClick={() => setTimesPerDay(Math.max(1, timesPerDay - 1))}
                      className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 flex items-center justify-center"><Minus className="w-5 h-5" /></button>
                    <span className="text-xl font-bold text-gray-800 w-8 text-center">{timesPerDay}</span>
                    <button type="button" onClick={() => setTimesPerDay(Math.min(10, timesPerDay + 1))}
                      className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold hover:bg-blue-200 flex items-center justify-center"><Plus className="w-5 h-5" /></button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button disabled={isAdding} className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:bg-black transform active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            {isAdding ? 'Saving...' : <><CheckCircle2 className="w-5 h-5" /> Save Medication</>}
          </button>
        </form>
      </div>
    </div>
  );
};