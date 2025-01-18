import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { CompanyTypeSelector } from '../../auth/company-type-selector';
import { WebsiteInput } from '../../auth/website-input';

interface CompanyInfoProps {
  companyName: string;
  companyType: string;
  companyWebsite: string;
  onUpdate: (data: { 
    companyName: string; 
    companyType: string; 
    companyWebsite: string;
  }) => Promise<void>;
}

export function CompanyInfo({ 
  companyName, 
  companyType, 
  companyWebsite, 
  onUpdate 
}: CompanyInfoProps) {
  const [formData, setFormData] = useState({ companyName, companyType, companyWebsite });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onUpdate(formData);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-lg font-semibold">Company Information</h2>

      <div>
        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
          Company Name
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="companyName"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
          />
        </div>
      </div>

      <CompanyTypeSelector
        value={formData.companyType}
        onChange={(value) => setFormData({ ...formData, companyType: value })}
      />

      <WebsiteInput
        value={formData.companyWebsite}
        onChange={(value) => setFormData({ ...formData, companyWebsite: value })}
      />

      <button
        type="submit"
        disabled={loading}
        className="flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700 disabled:opacity-50"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        Save changes
      </button>
    </form>
  );
}