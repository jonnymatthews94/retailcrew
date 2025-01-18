import { ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { companyTypes } from '../../data/company-types';

export function CategorySection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900">Who can join?</h2>
        <p className="mt-2 text-gray-600">
          RetailCrew is exclusively for professionals working in these roles
        </p>
        
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {companyTypes.map((type) => {
            const Icon = type.icon;
            
            return (
              <Link
                key={type.id}
                to="/signup"
                className="flex items-start gap-4 rounded-lg bg-white p-6 hover:bg-primary-50 transition-colors group"
              >
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 group-hover:bg-primary-200">
                    <Icon className="h-6 w-6 text-primary-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{type.name}</h3>
                  <p className="mt-1 text-sm text-gray-600">{type.description}</p>
                </div>
              </Link>
            );
          })}
        </div>

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
      </div>
    </section>
  );
}