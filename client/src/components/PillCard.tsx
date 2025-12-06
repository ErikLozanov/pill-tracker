import type { Pill } from '../api/pills';
import { usePills } from '../hooks/usePills';
import { Package, CheckCircle2 } from 'lucide-react';

interface Props {
  pill: Pill;
}

export const PillCard = ({ pill }: Props) => {
  const { takePill, isTaking } = usePills();

  const today = new Date().toDateString();
  const takenTodayCount = pill.logs?.filter(log => 
    new Date(log.takenAt).toDateString() === today
  ).length || 0;

  const targetPerDay = pill.timesPerDay;
  const isFinished = takenTodayCount >= targetPerDay;
  const remaining = targetPerDay - takenTodayCount;

  return (
    <div className={`p-5 rounded-2xl shadow-sm border transition-all duration-300 flex justify-between items-center group ${
      isFinished ? 'bg-green-50 border-green-200' : 'bg-white border-gray-100 hover:border-blue-300'
    }`}>
      
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${
            isFinished ? 'bg-green-200 text-green-800' : 'bg-blue-100 text-blue-800'
          }`}>
            {pill.form}
          </span>
          
          {pill.currentStock !== null && (
            <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${
              pill.currentStock! < 10 ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
            }`}>
              <Package className="w-3 h-3" /> {pill.currentStock} left
            </span>
          )}
        </div>

        <h3 className="font-bold text-lg text-gray-800 leading-tight">{pill.name}</h3>
        
        {pill.description && (
          <p className="text-gray-400 text-xs italic mt-0.5">"{pill.description}"</p>
        )}
        
        <div className="flex items-center gap-2 mt-2">
           <p className="text-gray-600 text-sm font-medium">
             <span className="text-black font-bold">{pill.amount} {pill.unit}</span>
           </p>
           <span className="text-gray-300">•</span>
           <p className={`text-sm font-bold ${isFinished ? 'text-green-600' : 'text-blue-600'}`}>
             {takenTodayCount} / {targetPerDay} Taken today
           </p>
        </div>
      </div>

      <button
        onClick={() => takePill(pill.id)}
        disabled={isFinished || isTaking}
        className={`ml-4 px-5 py-3 rounded-xl font-bold shadow-sm transition-all transform active:scale-95 flex flex-col items-center justify-center min-w-[80px] ${
          isFinished 
            ? 'bg-green-500 text-white cursor-default border-green-500'
            : 'bg-white text-gray-700 border border-gray-200 hover:bg-blue-600 hover:text-white hover:border-blue-600'
        }`}
      >
        {isFinished ? (
          <>
            <CheckCircle2 className="w-5 h-5 mb-1" />
            <span className="text-xs">Done</span>
          </>
        ) : (
          <>
            <span className="text-lg">Take</span>
            <span className="text-[10px] font-normal opacity-80">{remaining} left</span>
          </>
        )}
      </button>
    </div>
  );
};