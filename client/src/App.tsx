import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPills, addPill } from './api/pills';
import { useState } from 'react';

function App() {
  const queryClient = useQueryClient();
  
  // Form State
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [description, setDescription] = useState('');

  const { data: pills, isLoading, isError } = useQuery({
    queryKey: ['pills'],
    queryFn: fetchPills,
  });

  const mutation = useMutation({
    mutationFn: addPill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pills'] });
      // Reset Form
      setName('');
      setDosage('');
      setFrequency('');
      setDescription('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !dosage || !frequency) return;
    mutation.mutate({ name, dosage, frequency, description });
  };

  if (isLoading) return <div className="p-10 text-center">Loading...</div>;
  if (isError) return <div className="p-10 text-red-500">Backend Error</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">💊 Pill Tracker</h1>

        {/* --- ADD FORM --- */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Add Medication</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <input
              type="text" placeholder="Name (e.g. Omega 3)"
              className="border p-2 rounded focus:outline-blue-500"
              value={name} onChange={(e) => setName(e.target.value)}
            />
            
            <input
              type="text" placeholder="Dosage (e.g. 1000mg)"
              className="border p-2 rounded focus:outline-blue-500"
              value={dosage} onChange={(e) => setDosage(e.target.value)}
            />

            <input
              type="text" placeholder="Frequency (e.g. 2x Daily)"
              className="border p-2 rounded focus:outline-blue-500"
              value={frequency} onChange={(e) => setFrequency(e.target.value)}
            />

            <input
              type="text" placeholder="Notes (Optional)"
              className="border p-2 rounded focus:outline-blue-500"
              value={description} onChange={(e) => setDescription(e.target.value)}
            />

            <button
              disabled={mutation.isPending}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 md:col-span-2 font-bold"
            >
              {mutation.isPending ? 'Saving...' : 'Add Medication'}
            </button>
          </form>
        </div>

        {/* --- LIST --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pills?.map((pill) => (
            <div key={pill.id} className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-blue-500 relative">
              <h3 className="font-bold text-xl text-gray-800">{pill.name}</h3>
              <div className="text-sm text-gray-500 mt-1 space-y-1">
                <p>📏 Dosage: <span className="font-medium text-gray-700">{pill.dosage}</span></p>
                <p>⏰ Frequency: <span className="font-medium text-gray-700">{pill.frequency}</span></p>
                {pill.description && <p className="italic text-gray-400">"{pill.description}"</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;