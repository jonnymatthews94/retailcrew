import { Building2, Briefcase, ShoppingBag, Cpu } from 'lucide-react';
import { cn } from '../../../lib/utils';

const companyTypes = [
  { id: 'agency', label: 'Agency', icon: Briefcase },
  { id: 'retailer', label: 'Retailer', icon: ShoppingBag },
  { id: 'tech', label: 'Tech Company', icon: Cpu },
  { id: 'other', label: 'Other', icon: Building2 }
];

interface CompanyTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function CompanyTypeSelector({ value, onChange }: CompanyTypeSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Company Type
      </label>
      <div className="grid grid-cols-2 gap-2">
        {companyTypes.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              type="button"
              onClick={() => onChange(type.id)}
              className={cn(
                "flex items-center gap-3 rounded-lg border p-4 text-left transition-colors",
                value === type.id
                  ? "border-primary-600 bg-primary-50 text-primary-600"
                  : "border-gray-200 hover:border-primary-300 hover:bg-primary-50"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{type.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}