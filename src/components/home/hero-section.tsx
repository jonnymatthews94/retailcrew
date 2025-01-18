import { Link } from 'react-router-dom';
import { ShieldCheck, Check } from 'lucide-react';
import { useUser } from '../../contexts/user-context';

export function HeroSection() {
  const { user } = useUser();

  return (
    <section className="bg-primary-50">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 lg:text-5xl">
            Exclusive discounts for retail & ecommerce professionals
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Join thousands of retail store staff, online sellers, and industry professionals 
            accessing member-only discounts at hundreds of brands. Free to join!
          </p>
          <div className="mt-8 flex gap-4">
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
      </div>

      <div className="border-t border-b border-primary-100 bg-primary-50/50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-2 text-sm">
            <ShieldCheck className="h-4 w-4 text-primary-600" />
            <span className="text-gray-600">
              Powered by{' '}
              <a
                href="https://gocertify.me?utm_source=retailcrew&utm_medium=banner&utm_campaign=powered_by"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline font-medium"
              >
                Gocertify
              </a>
              {' '}— helping brands run smart & meaningful offers
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}