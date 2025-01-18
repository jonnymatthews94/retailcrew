import { Check, X } from 'lucide-react';

interface PasswordStrengthProps {
  password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const requirements = [
    {
      label: 'At least 8 characters',
      test: (p: string) => p.length >= 8
    },
    {
      label: 'Contains uppercase letter',
      test: (p: string) => /[A-Z]/.test(p)
    },
    {
      label: 'Contains special character',
      test: (p: string) => /[!@#$%^&*(),.?":{}|<>]/.test(p)
    }
  ];

  return (
    <div className="mt-2 space-y-2">
      {requirements.map((req, index) => (
        <div key={index} className="flex items-center gap-2 text-sm">
          {req.test(password) ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <X className="h-4 w-4 text-gray-300" />
          )}
          <span className={req.test(password) ? 'text-green-700' : 'text-gray-500'}>
            {req.label}
          </span>
        </div>
      ))}
    </div>
  );
}