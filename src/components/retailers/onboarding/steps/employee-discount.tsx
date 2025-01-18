import { AlertCircle } from 'lucide-react';
import type { RetailerOnboardingData } from '../../../../types/retailer';

interface EmployeeDiscountStepProps extends RetailerOnboardingData {
  updateFields: (fields: Partial<RetailerOnboardingData>) => void;
}

export function EmployeeDiscountStep({ 
  joinEmployeeDiscountBeta = true, // Set default to true
  updateFields 
}: EmployeeDiscountStepProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-primary-50 p-4">
        <div className="flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-primary-600" />
          <h3 className="font-medium text-primary-900">Employee Discount Program (Beta)</h3>
        </div>
        <p className="mt-2 text-sm text-primary-700">
          We're developing a feature to help brands manage their employee discounts through RetailCrew. 
          Our team will verify employment through work emails and payslips, and handle code distribution 
          automatically.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Would you like to join the employee discount beta program?
        </label>
        <div className="mt-2 space-y-4">
          <label className="flex items-center gap-3">
            <input
              type="radio"
              checked={joinEmployeeDiscountBeta === true}
              onChange={() => updateFields({ joinEmployeeDiscountBeta: true })}
              className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-600"
            />
            <div>
              <span className="font-medium">Yes, I'm interested</span>
              <p className="text-sm text-gray-500">
                Our team will contact you to discuss setup options
              </p>
            </div>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="radio"
              checked={joinEmployeeDiscountBeta === false}
              onChange={() => updateFields({ joinEmployeeDiscountBeta: false })}
              className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-600"
            />
            <div>
              <span className="font-medium">No, maybe later</span>
              <p className="text-sm text-gray-500">
                You can always contact us later if you change your mind
              </p>
            </div>
          </label>
        </div>
      </div>

      {joinEmployeeDiscountBeta && (
        <div className="rounded-lg bg-green-50 p-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-green-600" />
            <p className="text-sm text-green-800">
              Great! Our team will reach out within 7 business days to discuss the beta program and setup options.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}