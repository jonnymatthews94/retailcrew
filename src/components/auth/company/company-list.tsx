import type { Company } from '../../../types/company';

interface CompanyListProps {
  companies: Company[];
  onSelect: (companyId: string) => void;
}

export function CompanyList({ companies, onSelect }: CompanyListProps) {
  return (
    <div className="space-y-2">
      {companies.map((company) => (
        <button
          key={company.id}
          onClick={() => onSelect(company.id)}
          className="flex w-full items-center gap-4 rounded-lg border p-4 text-left hover:bg-primary-50"
        >
          <div>
            <h3 className="font-medium text-gray-900">{company.name}</h3>
            <p className="mt-1 text-sm text-gray-500">{company.website}</p>
          </div>
          <div className="ml-auto text-sm text-gray-500">
            {company.employee_count} employees
          </div>
        </button>
      ))}
    </div>
  );
}