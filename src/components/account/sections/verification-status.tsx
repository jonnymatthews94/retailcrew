import { useState } from 'react';
import { ShieldCheck, ShieldX, Clock } from 'lucide-react';
import { VerificationDialog } from '../../ui/verification-dialog';
import type { VerificationStatus } from '../../../types/user';

interface VerificationStatusProps {
  status: VerificationStatus;
  expiryDate?: string;
}

export function VerificationStatusSection({ status, expiryDate }: VerificationStatusProps) {
  const [showVerification, setShowVerification] = useState(false);

  const getStatusDisplay = () => {
    switch (status) {
      case 'verified':
        return {
          icon: ShieldCheck,
          title: 'Verified Retail Professional',
          description: `Your retail industry status is verified until ${expiryDate ? new Date(expiryDate).toLocaleDateString() : 'N/A'}. You have full access to all exclusive discounts.`,
          buttonText: null,
          className: 'bg-green-50 border-green-100',
          iconClassName: 'text-green-600',
          textClassName: 'text-green-900'
        };
      case 'not-verified':
        return {
          icon: ShieldX,
          title: 'Verification Required',
          description: 'Verify your retail industry status to unlock exclusive discounts from hundreds of brands.',
          buttonText: 'Verify now',
          className: 'bg-yellow-50 border-yellow-100',
          iconClassName: 'text-yellow-600',
          textClassName: 'text-yellow-900'
        };
      case 'verified-expired':
        return {
          icon: Clock,
          title: 'Verification Expired',
          description: 'Your retail industry verification has expired. Please renew to continue accessing exclusive discounts.',
          buttonText: 'Renew verification',
          className: 'bg-red-50 border-red-100',
          iconClassName: 'text-red-600',
          textClassName: 'text-red-900'
        };
      default:
        return {
          icon: ShieldX,
          title: 'Verification Status Unknown',
          description: 'There was an issue determining your retail industry verification status.',
          buttonText: 'Verify now',
          className: 'bg-gray-50 border-gray-100',
          iconClassName: 'text-gray-600',
          textClassName: 'text-gray-900'
        };
    }
  };

  const statusDisplay = getStatusDisplay();
  const StatusIcon = statusDisplay.icon;

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Retail Industry Verification</h2>

      <div className={`flex items-start gap-4 rounded-lg border p-4 ${statusDisplay.className}`}>
        <div className={`mt-1 rounded-lg p-2 ${statusDisplay.className}`}>
          <StatusIcon className={`h-5 w-5 ${statusDisplay.iconClassName}`} />
        </div>
        
        <div className="flex-1">
          <h3 className={`font-medium ${statusDisplay.textClassName}`}>
            {statusDisplay.title}
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            {statusDisplay.description}
          </p>
          
          {statusDisplay.buttonText && (
            <button
              onClick={() => setShowVerification(true)}
              className="mt-3 text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              {statusDisplay.buttonText}
            </button>
          )}
        </div>
      </div>

      <VerificationDialog
        open={showVerification}
        onClose={() => setShowVerification(false)}
        isExpired={status === 'verified-expired'}
      />
    </div>
  );
}