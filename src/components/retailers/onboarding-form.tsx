import { useState } from 'react';
import { ArrowRight, Check, Loader2 } from 'lucide-react';

interface RetailerFormData {
  email: string;
  jobTitle: string;
  note: string;
}

export function RetailerOnboardingForm() {
  const [formData, setFormData] = useState<RetailerFormData>({
    email: '',
    jobTitle: '',
    note: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Implement form submission
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <Check className="h-6 w-6 text-green-600" />
        </div>
        <h2 className="mt-4 text-lg font-semibold">Request submitted successfully</h2>
        <p className="mt-2 text-gray-600">
          Thank you for your interest in partnering with RetailCrew. We'll review your request and get back to you within 2 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Work Email
        </label>
        <div className="mt-1">
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
          />
        </div>
      </div>

      <div>
        <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
          Job Title
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="jobTitle"
            required
            value={formData.jobTitle}
            onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
            className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
          />
        </div>
      </div>

      <div>
        <label htmlFor="note" className="block text-sm font-medium text-gray-700">
          Additional Notes (Optional)
        </label>
        <div className="mt-1">
          <textarea
            id="note"
            rows={4}
            value={formData.note}
            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
            className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700 disabled:opacity-50"
      >
        Submit request
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <ArrowRight className="h-4 w-4" />
        )}
      </button>
    </form>
  );
}