import { cn } from '../../lib/utils';
import { Building2, Briefcase, ShoppingBag, Cpu, Building } from 'lucide-react';

const companyTypes = [
  { id: 'agency', label: 'Agency or affiliate network', icon: Briefcase },
  { id: 'publisher', label: 'Publisher', icon: Building2 },
  { id: 'retailer', label: 'Retailer', icon: ShoppingBag },
  { id: 'tech', label: 'Tech Partner', icon: Cpu },
  { id: 'other', label: 'Other', icon: Building }
];

interface CompanyTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function CompanyTypeSelector({ value, onChange, error }: CompanyTypeSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Company Type
      </label>
      <div className="space-y-2">
        {companyTypes.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              type="button"
              onClick={() => onChange(type.id)}
              className={cn(
                "flex w-full items-center gap-3 p-4 rounded-lg border transition-all",
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
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
}