import { Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SignupSuccessProps {
  onVerify: () => void;
  onEdit: () => void;
  formData: {
    companyName: string;
    companyType: string;
    jobTitle: string;
  };
}

export function SignupSuccess({ onVerify, onEdit, formData }: SignupSuccessProps) {
  const getCompanyTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      'agency': 'Agency or Affiliate Network',
      'publisher': 'Publisher',
      'retailer': 'Retailer',
      'tech': 'Tech Partner',
      'other': 'Other'
    };
    return types[type] || type;
  };

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">Welcome to RetailCrew!</h1>
      <p className="mt-2 text-gray-600">
        Your account has been created. Verify your occupation to access exclusive discounts.
      </p>
      
      <div className="mt-8 rounded-lg border border-gray-200 p-6">
        <div className="flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-50">
            <Building2 className="h-6 w-6 text-primary-600" />
          </div>
        </div>
        <div className="mt-4 space-y-2 text-center">
          <p className="font-medium text-gray-900">{formData.companyName}</p>
          <p className="text-sm text-gray-500">{getCompanyTypeLabel(formData.companyType)}</p>
          <p className="text-sm text-gray-500">{formData.jobTitle}</p>
        </div>
        <button
          onClick={onEdit}
          className="mt-4 text-sm text-primary-600 hover:text-primary-700 mx-auto"
        >
          Edit details
        </button>
      </div>

      <div className="mt-8 space-y-4">
        <button
          onClick={onVerify}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700"
        >
          Verify your occupation
        </button>

        <Link
          to="/"
          className="block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 text-center"
        >
          I'll verify later
        </Link>
      </div>
      
      <p className="mt-4 text-sm text-gray-500">
        Instant verification by{' '}
        <a 
          href="https://gocertify.me?utm_source=retailcrew&utm_medium=signup&utm_campaign=verification" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary-600 hover:underline"
        >
          Gocertify
        </a>
      </p>
    </div>
  );
}