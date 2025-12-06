import type { MedicineForm } from '../api/pills';
import { Pill, Tablet, Droplet, Cookie, Syringe, Box, Sparkles } from 'lucide-react';

interface Props {
  selected: MedicineForm;
  onSelect: (form: MedicineForm) => void;
}

export const FormSelector = ({ selected, onSelect }: Props) => {
  // Map types to Icons
  const forms: { id: MedicineForm; label: string; icon: any }[] = [
    { id: 'CAPSULE', label: 'Capsule', icon: Pill },
    { id: 'TABLET', label: 'Tablet', icon: Tablet },
    { id: 'LIQUID', label: 'Liquid', icon: Droplet },
    { id: 'POWDER', label: 'Powder', icon: Sparkles },
    { id: 'GUMMY', label: 'Gummy', icon: Cookie }, // Cookie looks like a gummy
    { id: 'INJECTION', label: 'Injection', icon: Syringe },
    { id: 'OTHER', label: 'Other', icon: Box },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {forms.map((item) => {
        const Icon = item.icon;
        const isActive = selected === item.id;
        
        return (
          <button
            key={item.id}
            type="button" // Prevent form submission
            onClick={() => onSelect(item.id)}
            className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-200 ${
              isActive
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-100 bg-white text-gray-500 hover:border-blue-200 hover:bg-gray-50'
            }`}
          >
            <Icon className={`w-6 h-6 mb-2 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
            <span className="text-xs font-bold">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};