import { PhoneInput } from '../../phone-input';
import { PasswordStrength } from '../../password-strength';
import type { SignupFormData } from '../../../../types/auth';

interface PersonalInfoStepProps {
  formData: SignupFormData;
  updateFields: (fields: Partial<SignupFormData>) => void;
  errors: Record<string, string>;
}

export function PersonalInfoStep({ formData, updateFields, errors }: PersonalInfoStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
          First Name
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="firstName"
            value={formData.firstName}
            onChange={(e) => updateFields({ firstName: e.target.value })}
            className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
          />
        </div>
        {errors.firstName && (
          <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
        )}
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
            onChange={(e) => updateFields({ lastName: e.target.value })}
            className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
          />
        </div>
        {errors.lastName && (
          <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Work Email
        </label>
        <div className="mt-1">
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => updateFields({ email: e.target.value })}
            className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="mt-1">
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={(e) => updateFields({ password: e.target.value })}
            className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
          />
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password}</p>
        )}
        <PasswordStrength password={formData.password} />
      </div>

      <PhoneInput
        value={formData.phone}
        onChange={(value) => updateFields({ phone: value })}
        error={errors.phone}
      />
    </div>
  );
}