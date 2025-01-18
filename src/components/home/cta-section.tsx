import { Link } from 'react-router-dom';
import { useUser } from '../../contexts/user-context';
import { Check } from 'lucide-react';

export function CTASection() {
  const { user } = useUser();

  return (
    <section className="bg-primary-50 py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Join RetailCrew today
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Get access to exclusive discounts at hundreds of brands. Free to join for everyone 
          working in retail stores and ecommerce.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          {user ? (
            <div className="flex items-center gap-2 rounded-lg bg-primary-100 px-6 py-3 text-primary-700">
              <Check className="h-5 w-5" />
              <span className="font-semibold">You're a member</span>
            </div>
          ) : (
            <Link
              to="/signup"
              className="rounded-lg bg-primary-600 px-6 py-3 text-base font-semibold text-white hover:bg-primary-700"
            >
              Join for free
            </Link>
          )}
          <Link
            to="/list-your-brand"
            className="rounded-lg bg-white border border-gray-300 px-6 py-3 text-base font-semibold text-gray-700 hover:bg-gray-50"
          >
            List your brand
          </Link>
        </div>
      </div>
    </section>
  );
}