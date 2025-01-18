import { TrendingUp } from 'lucide-react';
import type { RetailerOnboardingData } from '../../../../types/retailer';

interface AffiliateStepProps extends RetailerOnboardingData {
  updateFields: (fields: Partial<RetailerOnboardingData>) => void;
  errors: Record<string, string>;
}

const affiliateNetworks = [
  'Awin',
  'Commission Junction',
  'Impact',
  'Partnerize',
  'Rakuten',
  'ShareASale',
  'Tradedoubler',
  'Webgains',
  'Other'
];

export function AffiliateStep({ 
  useAffiliateLinks,
  affiliateNetwork,
  quote,
  updateFields,
  errors
}: AffiliateStepProps) {
  return (
    <div className="space-y-8">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Would you like to use affiliate links for tracking?
        </label>
        <div className="mt-2 space-y-4">
          <label className="flex items-center gap-3">
            <input
              type="radio"
              checked={useAffiliateLinks === true}
              onChange={() => updateFields({ useAffiliateLinks: true })}
              className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-600"
            />
            <span>Yes, use affiliate links</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="radio"
              checked={useAffiliateLinks === false}
              onChange={() => updateFields({ useAffiliateLinks: false })}
              className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-600"
            />
            <span>No, use direct links only</span>
          </label>
        </div>
      </div>

      {useAffiliateLinks && (
        <div>
          <label htmlFor="affiliateNetwork" className="block text-sm font-medium text-gray-700">
            Select your affiliate network
          </label>
          <div className="mt-1">
            <select
              id="affiliateNetwork"
              value={affiliateNetwork}
              onChange={e => updateFields({ affiliateNetwork: e.target.value })}
              className={`block w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-1 ${
                errors.affiliateNetwork 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:border-primary-600 focus:ring-primary-600'
              }`}
            >
              <option value="">Select a network</option>
              {affiliateNetworks.map(network => (
                <option key={network} value={network}>{network}</option>
              ))}
            </select>
          </div>
          {errors.affiliateNetwork && (
            <p className="mt-1 text-sm text-red-600">{errors.affiliateNetwork}</p>
          )}
        </div>
      )}

      <div>
        <label htmlFor="quote" className="block text-sm font-medium text-gray-700">
          Message to the Community
        </label>
        <p className="mt-1 text-sm text-gray-500">
          Share why you're offering this discount to the retail community
        </p>
        <div className="mt-2">
          <textarea
            id="quote"
            value={quote}
            onChange={e => updateFields({ quote: e.target.value })}
            placeholder="We wanted to give back to retail professionals as we know this industry can be stressful sometimes and wanted to do our bit!"
            rows={3}
            className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
          />
        </div>
      </div>
    </div>
  );
}