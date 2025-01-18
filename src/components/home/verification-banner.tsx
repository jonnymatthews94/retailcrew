import { ShieldCheck } from 'lucide-react';

export function VerificationBanner() {
  return (
    <div className="mt-12 rounded-xl bg-primary-50 p-8 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
        <ShieldCheck className="h-6 w-6 text-primary-600" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900">
        Trusted Verification by GoCertify
      </h3>
      <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
        RetailCrew uses{' '}
        <a 
          href="https://gocertify.me?utm_source=retailcrew&utm_medium=homepage&utm_campaign=verification_banner"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-600 hover:underline"
        >
          GoCertify's
        </a>
        {' '}industry-leading verification platform, trusted by 400+ global brands, 
        to ensure all members are genuine retail professionals. This means exclusive access to real discounts 
        for verified industry members only.
      </p>
    </div>
  );
}