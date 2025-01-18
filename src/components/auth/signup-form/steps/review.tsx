import { Check } from 'lucide-react';
import type { SignupFormData } from '../../../../types/auth';

interface ReviewStepProps {
  formData: SignupFormData;
}

export function ReviewStep({ formData }: ReviewStepProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-6">
        <h3 className="font-medium">Personal Information</h3>
        <dl className="mt-4 space-y-2">
          <div>
            <dt className="text-sm text-gray-500">Name</dt>
            <dd>{formData.firstName} {formData.lastName}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Email</dt>
            <dd>{formData.email}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Phone</dt>
            <dd>{formData.phone}</dd>
          </div>
        </dl>
      </div>

      <div className="rounded-lg border p-6">
        <h3 className="font-medium">Company Information</h3>
        <dl className="mt-4 space-y-2">
          <div>
            <dt className="text-sm text-gray-500">Company</dt>
            <dd>{formData.companyName}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Type</dt>
            <dd>{formData.companyType}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Website</dt>
            <dd>{formData.companyWebsite}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Job Title</dt>
            <dd>{formData.jobTitle}</dd>
          </div>
        </dl>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="marketingConsent"
          checked={formData.marketingConsent}
          onChange={(e) => updateFields({ marketingConsent: e.target.checked })}
          className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600"
        />
        <label htmlFor="marketingConsent" className="text-sm text-gray-600">
          Keep me updated about new and popular offers
        </label>
      </div>
    </div>
  );
}