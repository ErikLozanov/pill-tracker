import { useNavigate } from 'react-router-dom';
import type { Pill } from '../api/pills';
import { usePills } from '../hooks/usePills';
import { Package, CheckCircle2, Pencil, RotateCcw } from 'lucide-react'; 

interface Props {
  pill: Pill;
}

export const PillCard = ({ pill }: Props) => {
  const navigate = useNavigate();
  const { takePill, undoPill, isTaking, isUndoing } = usePills(); 

  const takenTodayCount = pill.logs?.filter(log => new Date(log.takenAt).toDateString() === new Date().toDateString()).length || 0;
  const isFinished = takenTodayCount >= pill.timesPerDay;
  const progressPercent = Math.min(100, (takenTodayCount / pill.timesPerDay) * 100);

  return (
    <div className={`relative p-5 rounded-2xl shadow-sm border transition-all duration-300 group overflow-hidden ${
      isFinished ? 'bg-green-50 border-green-200' : 'bg-white border-gray-100 hover:border-blue-300'
    }`}>
      
      {/* Absolute Edit Button - Positioned safely */}
      <button 
        onClick={(e) => { e.stopPropagation(); navigate(`/edit/${pill.id}`); }}
        className="absolute top-3 right-3 p-2 text-gray-300 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-all z-10"
      >
        <Pencil className="w-4 h-4" />
      </button>

      <div className="flex flex-col gap-4">
        
        {/* --- TOP SECTION: INFO --- */}
        <div className="pr-8"> {/* Right padding prevents text hitting the Edit button */}
          
          {/* Badges Row */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${isFinished ? 'bg-green-200 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                {pill.form}
              </span>
              {pill.currentStock !== null && pill.currentStock !== undefined && (
                <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${pill.currentStock < 5 ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}>
                  <Package className="w-3 h-3" /> {pill.currentStock}
                </span>
              )}
          </div>

          {/* Title & Description - Handles long text */}
          <h3 className="font-bold text-xl text-gray-800 leading-tight mb-1 break-words">
            {pill.name}
          </h3>
          <p className="text-gray-600 text-sm font-medium">
            Take <span className="text-black font-bold">{pill.amount} {pill.unit}</span> • {pill.frequency.replace('_', ' ')}
          </p>
          {pill.description && (
            <p className="text-gray-400 text-xs italic mt-1 line-clamp-2">
              "{pill.description}"
            </p>
          )}
        </div>

        {/* --- MIDDLE SECTION: PROGRESS BAR --- */}
        <div>
          <div className="flex justify-between text-xs font-bold text-gray-400 mb-1 uppercase tracking-wide">
            <span>Progress</span>
            <span className={isFinished ? 'text-green-600' : 'text-blue-600'}>
              {takenTodayCount} / {pill.timesPerDay}
            </span>
          </div>
          <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ease-out ${
                isFinished ? 'bg-green-500' : 'bg-blue-600'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* --- BOTTOM SECTION: ACTIONS --- */}
        {/* Mobile: Stacked buttons. Desktop: Row. */}
        <div className="flex items-center gap-3 mt-1 sm:justify-end">
            
            {/* Undo Button */}
            {takenTodayCount > 0 && (
              <button
                onClick={() => undoPill(pill.id)}
                disabled={isUndoing}
                className="p-3 rounded-xl bg-white border border-gray-200 text-gray-400 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all shadow-sm"
                title="Undo"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            )}

            {/* Take Button - Full width on mobile */}
            <button
              onClick={() => takePill(pill.id)}
              disabled={isFinished || isTaking}
              className={`flex-1 sm:flex-none sm:min-w-[120px] py-3 px-6 rounded-xl font-bold shadow-sm transition-all transform active:scale-95 flex items-center justify-center gap-2 ${
                isFinished 
                  ? 'bg-green-500 text-white cursor-default border border-green-500'
                  : 'bg-gray-900 text-white hover:bg-black'
              }`}
            >
              {isFinished ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Done</span>
                </>
              ) : (
                <span>Take</span>
              )}
            </button>
        </div>

      </div>
    </div>
  );
};