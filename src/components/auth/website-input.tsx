interface WebsiteInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function WebsiteInput({ value, onChange, error }: WebsiteInputProps) {
  return (
    <div>
      <label htmlFor="companyWebsite" className="block text-sm font-medium text-gray-700">
        Company Website
      </label>
      <div className="mt-1 flex rounded-lg border border-gray-300 focus-within:border-primary-600 focus-within:ring-1 focus-within:ring-primary-600">
        <span className="inline-flex items-center px-3 text-gray-500 border-r border-gray-300 bg-gray-50 rounded-l-lg">
          https://
        </span>
        <input
          type="text"
          id="companyWebsite"
          value={value.replace('https://', '')}
          onChange={(e) => onChange(`https://${e.target.value}`)}
          className="block w-full rounded-r-lg border-0 px-3 py-2 focus:outline-none"
          placeholder="example.com"
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}