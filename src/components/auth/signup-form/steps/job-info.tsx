interface JobInfoStepProps {
  formData: SignupFormData;
  updateFields: (fields: Partial<SignupFormData>) => void;
  errors: Record<string, string>;
}

export function JobInfoStep({ formData, updateFields, errors }: JobInfoStepProps) {
  return (
    <div>
      <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
        Job Title
      </label>
      <div className="mt-1">
        <input
          type="text"
          id="jobTitle"
          value={formData.jobTitle}
          onChange={(e) => updateFields({ jobTitle: e.target.value })}
          className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
        />
      </div>
      {errors.jobTitle && (
        <p className="mt-1 text-sm text-red-600">{errors.jobTitle}</p>
      )}
    </div>
  );
}