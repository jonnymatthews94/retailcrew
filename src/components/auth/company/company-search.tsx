import { useState } from 'react';
import { Search, Building2 } from 'lucide-react';
import { useCompanies } from '../../../hooks/use-companies';
import { CompanyList } from './company-list';
import { CreateCompanyForm } from './create-company-form';

interface CompanySearchProps {
  onSelect: (companyId: string) => void;
}

export function CompanySearch({ onSelect }: CompanySearchProps) {
  const [query, setQuery] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const { companies, loading } = useCompanies(query);

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search for your company..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="block w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
        />
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Loading companies...</div>
      ) : companies.length > 0 ? (
        <CompanyList companies={companies} onSelect={onSelect} />
      ) : (
        <div className="text-center">
          <Building2 className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No companies found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Can't find your company? You can add it now.
          </p>
          <button
            onClick={() => setShowCreate(true)}
            className="mt-4 text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            Add your company
          </button>
        </div>
      )}

      {showCreate && (
        <CreateCompanyForm
          onSuccess={(companyId) => {
            onSelect(companyId);
            setShowCreate(false);
          }}
          onCancel={() => setShowCreate(false)}
        />
      )}
    </div>
  );
}