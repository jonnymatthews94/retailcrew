import { useState } from 'react';
import { useCompanies } from '../../../hooks/use-companies';
import { CompanyTypeSelector } from './company-type-selector';
import { WebsiteInput } from '../website-input';

interface CreateCompanyFormProps {
  onSuccess: (companyId: string) => void;
  onCancel: () => void;
}

export function CreateCompanyForm({ onSuccess, onCancel }: CreateCompanyFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    type: ''
  });
  const { createCompany } = useCompanies();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const company = await createCompany(formData);
      onSuccess(company.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create company');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Company Name
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
          required
        />
      </div>

      <WebsiteInput
        value={formData.website}
        onChange={(value) => setFormData({ ...formData, website: value })}
      />

      <CompanyTypeSelector
        value={formData.type}
        onChange={(value) => setFormData({ ...formData, type: value })}
      />

      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700 disabled:opacity-50"
        >
          Create Company
        </button>
      </div>
    </form>
  );
}