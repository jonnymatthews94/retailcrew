import { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface JobInfoProps {
  jobTitle: string;
  onUpdate: (data: { jobTitle: string }) => Promise<void>;
}

export function JobInfo({ jobTitle, onUpdate }: JobInfoProps) {
  const [formData, setFormData] = useState({ jobTitle });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onUpdate(formData);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-lg font-semibold">Job Information</h2>

      <div>
        <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
          Job Title
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="jobTitle"
            value={formData.jobTitle}
            onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
            className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
          />
        </div>
      </div>

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