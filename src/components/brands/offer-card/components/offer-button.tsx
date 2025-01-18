import { Loader2, ShieldCheck, ShieldX, Clock } from 'lucide-react';
import { useUser } from '../../../../contexts/user-context';
import { debugLog } from '../../../../components/debug/logger';
import { isVerified, getVerificationMessage } from '../../../../lib/verification';

interface OfferButtonProps {
  isLoading: boolean;
  onClick: () => void;
}

export function OfferButton({ isLoading, onClick }: OfferButtonProps) {
  const { user } = useUser();
  
  debugLog('info', 'Rendering offer button', { 
    isLoggedIn: !!user,
    verificationStatus: user?.verificationStatus,
    isLoading
  });

  const getButtonState = () => {
    if (!user) {
      return {
        icon: ShieldCheck,
        text: 'Sign in to view code',
        className: 'bg-primary-50 text-primary-600 hover:bg-primary-100'
      };
    }

    switch (user.verificationStatus) {
      case 'verified':
        return {
          icon: ShieldCheck,
          text: 'Get Code',
          className: 'bg-primary-600 text-white hover:bg-primary-700'
        };
      case 'not-verified':
        return {
          icon: ShieldX,
          text: 'Get verified to view code',
          className: 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'
        };
      case 'verified-expired':
        return {
          icon: Clock,
          text: 'Renew verification to view code',
          className: 'bg-red-50 text-red-600 hover:bg-red-100'
        };
      default:
        return {
          icon: ShieldX,
          text: 'Verification required',
          className: 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'
        };
    }
  };

  const state = getButtonState();
  const Icon = state.icon;

  if (isLoading && isVerified(user?.verificationStatus)) {
    return (
      <button
        disabled
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-white opacity-50"
      >
        <Loader2 className="h-4 w-4 animate-spin" />
        Getting code...
      </button>
    );
  }

  return (
    <button
      onClick={() => {
        debugLog('info', 'Offer button clicked', {
          verificationStatus: user?.verificationStatus,
          message: getVerificationMessage(user?.verificationStatus)
        });
        onClick();
      }}
      className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 font-medium ${state.className}`}
    >
      <Icon className="h-4 w-4" />
      {state.text}
    </button>
  );
}