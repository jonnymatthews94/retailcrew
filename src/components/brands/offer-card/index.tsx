import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../contexts/user-context';
import { CouponDialog } from '../../ui/coupon-dialog';
import { OfferButton } from './components/offer-button';
import { OfferDetails } from './components/offer-details';
import { OfferTerms } from './components/offer-terms';
import { OfferDates } from './components/offer-dates';
import { useOfferCode } from './hooks/use-offer-code';
import type { OfferCardProps } from './types';

export function OfferCard({ offer, brandWebsite }: OfferCardProps) {
  const navigate = useNavigate();
  const { user } = useUser();
  const { 
    isLoading, 
    currentCode, 
    showDialog,
    handleGetCode,
    closeDialog
  } = useOfferCode(offer.id);

  const handleClick = async () => {
    if (!user) {
      navigate('/login', { state: { returnTo: window.location.pathname } });
      return;
    }

    if (user.verificationStatus !== 'verified') {
      navigate('/account/settings');
      return;
    }

    await handleGetCode();
  };

  return (
    <>
      <div className="rounded-lg border p-6">
        <OfferDetails offer={offer} />
        
        <div className="mt-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <p className="text-sm text-gray-500">Discount code:</p>
              <div className="mt-1">
                <OfferButton 
                  isLoading={isLoading}
                  onClick={handleClick}
                />
              </div>
            </div>
            <OfferDates 
              startDate={offer.startDate} 
              expiryDate={offer.expiryDate} 
            />
          </div>
        </div>

        <OfferTerms terms={offer.terms} />
      </div>

      <CouponDialog
        open={showDialog}
        onClose={closeDialog}
        code={currentCode}
        brandWebsite={brandWebsite}
      />
    </>
  );
}