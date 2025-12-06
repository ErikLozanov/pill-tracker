import { useNavigate } from 'react-router-dom';
import { PillCard } from '../components/PillCard';
import { usePills } from '../hooks/usePills';
import { Plus } from 'lucide-react';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { pills, isLoading } = usePills();

  if (isLoading) return <div className="h-screen flex items-center justify-center text-gray-400">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans relative">
      <div className="max-w-md mx-auto pb-20"> 
        
        {/* Header */}
        <header className="mb-8 flex justify-between items-end">
          <div>
             <h1 className="text-3xl font-black text-gray-900 tracking-tight">Today</h1>
             <p className="text-gray-500 font-medium">Your daily stack</p>
          </div>
          <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
            {pills?.filter(p => p.logs && p.logs.length > 0 && new Date(p.logs[0].takenAt).toDateString() === new Date().toDateString()).length}/{pills?.length} Done
          </div>
        </header>

        {/* List */}
        <div className="space-y-4">
          {pills?.map((pill) => (
            <PillCard key={pill.id} pill={pill} />
          ))}
          
          {pills?.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <p>No pills yet.</p>
              <p className="text-sm">Click + to add one.</p>
            </div>
          )}
        </div>
      </div>

      {/* Floating Action Button (FAB) */}
      <button 
        onClick={() => navigate('/add')}
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700 hover:scale-105 transition-all"
      >
        <Plus className="w-8 h-8" />
      </button>
    </div>
  );
};