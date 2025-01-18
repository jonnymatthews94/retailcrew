import type { RetailerOnboardingData } from '../../../../types/retailer';

interface ReviewStepProps extends RetailerOnboardingData {}

export function ReviewStep(data: ReviewStepProps) {
  return (
    <div className="space-y-8">
      <div className="rounded-lg border p-6">
        <h3 className="font-medium">Brand Information</h3>
        <dl className="mt-4 space-y-4">
          <div>
            <dt className="text-sm text-gray-500">Brand Name</dt>
            <dd className="mt-1">{data.brandName}</dd>
          </div>
          {data.brandLogo && (
            <div>
              <dt className="text-sm text-gray-500">Logo</dt>
              <dd className="mt-1">
                <img 
                  src={data.brandLogo} 
                  alt={data.brandName} 
                  className="h-16 w-16 rounded-lg object-contain bg-white p-2 border"
                />
              </dd>
            </div>
          )}
          <div>
            <dt className="text-sm text-gray-500">Description</dt>
            <dd className="mt-1">{data.brandDescription}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Website</dt>
            <dd className="mt-1">{data.brandWebsite}</dd>
          </div>
        </dl>
      </div>

      <div className="rounded-lg border p-6">
        <h3 className="font-medium">Offer Details</h3>
        <dl className="mt-4 space-y-4">
          <div>
            <dt className="text-sm text-gray-500">Title</dt>
            <dd className="mt-1">{data.offerTitle}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Description</dt>
            <dd className="mt-1">{data.offerDescription}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Discount Value</dt>
            <dd className="mt-1">{data.discountValue}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Code</dt>
            <dd className="mt-1">{data.discountCode}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Expiry Date</dt>
            <dd className="mt-1">{new Date(data.expiryDate).toLocaleDateString()}</dd>
          </div>
          {data.terms.length > 0 && (
            <div>
              <dt className="text-sm text-gray-500">Terms & Conditions</dt>
              <dd className="mt-1">
                <ul className="list-disc pl-4 space-y-1">
                  {data.terms.map((term, index) => (
                    <li key={index}>{term}</li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
          {data.quote && (
            <div>
              <dt className="text-sm text-gray-500">Message to Community</dt>
              <dd className="mt-1 italic">"{data.quote}"</dd>
            </div>
          )}
        </dl>
      </div>

      {data.useAffiliateLinks && (
        <div className="rounded-lg border p-6">
          <h3 className="font-medium">Affiliate Details</h3>
          <dl className="mt-4 space-y-4">
            <div>
              <dt className="text-sm text-gray-500">Network</dt>
              <dd className="mt-1">{data.affiliateNetwork}</dd>
            </div>
          </dl>
        </div>
      )}

      {data.offerEmployeeDiscount && (
        <div className="rounded-lg border p-6">
          <h3 className="font-medium">Employee Discount Program</h3>
          <dl className="mt-4 space-y-4">
            <div>
              <dt className="text-sm text-gray-500">Discount Value</dt>
              <dd className="mt-1">{data.employeeDiscountValue}</dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
}