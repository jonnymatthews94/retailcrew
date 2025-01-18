import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export function SuccessState() {
  return (
    <div className="text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
        <Check className="h-6 w-6 text-green-600" />
      </div>
      <h2 className="mt-4 text-lg font-semibold">Offer submitted successfully</h2>
      <p className="mt-2 text-gray-600">
        Thank you for submitting your offer to RetailCrew. Our team will review your submission within 7 business days.
      </p>
      <div className="mt-6 space-y-4">
        <Link
          to="/brands"
          className="inline-block w-full rounded-lg bg-primary-600 px-4 py-2 text-center text-white hover:bg-primary-700"
        >
          Browse other offers
        </Link>
        <Link
          to="/"
          className="inline-block w-full rounded-lg border border-gray-300 px-4 py-2 text-center text-gray-700 hover:bg-gray-50"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}