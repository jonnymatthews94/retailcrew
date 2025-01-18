import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useUser } from '../../contexts/user-context';
import { CouponDialog } from '../ui/coupon-dialog';
import { getUnusedCode } from '../../lib/coupons';
import type { Offer } from '../../types/brand';

interface OfferCardProps {
  offer: Offer;
  brandWebsite: string;
}

export function OfferCard({ offer, brandWebsite }: OfferCardProps) {
  const navigate = useNavigate();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [currentCode, setCurrentCode] = useState('');

  const handleGetCode = async () => {
    if (!user) {
      navigate('/login', { state: { returnTo: window.location.pathname } });
      return;
    }

    if (user.verificationStatus !== 'verified') {
      navigate('/account/settings');
      return;
    }

    setIsLoading(true);
    try {
      const code = await getUnusedCode(offer.id);
      if (code) {
        setCurrentCode(code);
        setShowDialog(true);
      }
    } catch (error) {
      console.error('Failed to get code:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="rounded-lg border p-6">
        <h3 className="text-lg font-semibold text-gray-900">{offer.title}</h3>
        <p className="mt-2 text-gray-600">{offer.description}</p>
        
        <div className="mt-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <p className="text-sm text-gray-500">Discount code:</p>
              <div className="mt-1">
                <button
                  onClick={handleGetCode}
                  disabled={isLoading}
                  className="flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Getting code...
                    </>
                  ) : (
                    'Get Code'
                  )}
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Valid until:</p>
              <p className="mt-1 font-medium">
                {new Date(offer.expiryDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {offer.terms.length > 0 && (
          <div className="mt-4 border-t pt-4">
            <p className="text-sm font-medium text-gray-900">Terms & Conditions:</p>
            <ul className="mt-2 space-y-1">
              {offer.terms.map((term, index) => (
                <li key={index} className="text-sm text-gray-600">
                  • {term}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <CouponDialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        code={currentCode}
        brandWebsite={brandWebsite}
      />
    </>
  );
}