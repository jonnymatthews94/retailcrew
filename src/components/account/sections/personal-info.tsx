import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { PhoneInput } from '../../auth/phone-input';

interface PersonalInfoProps {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  onUpdate: (data: { email: string; firstName: string; lastName: string; phone: string }) => Promise<void>;
  loading?: boolean;
}

export function PersonalInfo({ email, firstName, lastName, phone, onUpdate, loading }: PersonalInfoProps) {
  const [formData, setFormData] = useState({ email, firstName, lastName, phone });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-lg font-semibold">Personal Information</h2>
      
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
            />
          </div>
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
            />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Work Email Address
        </label>
        <div className="mt-1">
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
          />
        </div>
      </div>

      <PhoneInput
        value={formData.phone}
        onChange={(value) => setFormData({ ...formData, phone: value })}
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