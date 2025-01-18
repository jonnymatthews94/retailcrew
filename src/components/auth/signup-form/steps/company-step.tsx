import { useState } from 'react';
import { Search, Building2, Plus } from 'lucide-react';
import { useCompanies } from '../../../../hooks/use-companies';
import { CompanyTypeSelector } from '../../company-type-selector';
import { WebsiteInput } from '../../website-input';
import type { SignupFormData } from '../../../../types/auth';

interface CompanyStepProps {
  formData: SignupFormData;
  updateFields: (fields: Partial<SignupFormData>) => void;
  errors: Record<string, string>;
}

export function CompanyStep({ formData, updateFields, errors }: CompanyStepProps) {
  const [query, setQuery] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const { companies, loading } = useCompanies(query);

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Your Company</h2>
      <p className="text-sm text-gray-600">
        Help us connect you with colleagues and relevant offers
      </p>

      {!showCreate ? (
        <>
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
            <div className="space-y-2">
              {companies.map((company) => (
                <button
                  key={company.id}
                  onClick={() => {
                    updateFields({
                      companyName: company.name,
                      companyType: company.type,
                      companyWebsite: company.website
                    });
                    setShowCreate(false);
                  }}
                  className="flex w-full items-center gap-4 rounded-lg border p-4 text-left hover:bg-primary-50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">{company.name}</h3>
                    <p className="mt-1 text-sm text-gray-500 truncate">{company.website}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="font-medium">{company.employee_count}</span>
                    <span className="text-gray-400">employees</span>
                  </div>
                </button>
              ))}
            </div>
          ) : query ? (
            <div className="text-center py-8">
              <Building2 className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No companies found</h3>
              <p className="mt-1 text-sm text-gray-500">
                We couldn't find any companies matching your search
              </p>
              <button
                onClick={() => setShowCreate(true)}
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                <Plus className="h-4 w-4" />
                Add a new company
              </button>
            </div>
          ) : (
            <div className="text-center py-8">
              <Building2 className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Search for your company</h3>
              <p className="mt-1 text-sm text-gray-500">
                Enter your company name to search or add a new one
              </p>
              <button
                onClick={() => setShowCreate(true)}
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                <Plus className="h-4 w-4" />
                Add a new company
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="space-y-6">
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="companyName"
                value={formData.companyName}
                onChange={(e) => updateFields({ companyName: e.target.value })}
                className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
              />
            </div>
            {errors.companyName && (
              <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>
            )}
          </div>

          <WebsiteInput
            value={formData.companyWebsite}
            onChange={(value) => updateFields({ companyWebsite: value })}
            error={errors.companyWebsite}
          />

          <CompanyTypeSelector
            value={formData.companyType}
            onChange={(value) => updateFields({ companyType: value })}
            error={errors.companyType}
          />

          <button
            onClick={() => setShowCreate(false)}
            className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700"
          >
            <Search className="h-4 w-4" />
            Back to search
          </button>
        </div>
      )}
    </div>
  );
}