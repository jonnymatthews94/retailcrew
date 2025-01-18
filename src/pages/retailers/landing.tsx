import { ArrowRight, Users, Clock, ShieldCheck, Building2, Network } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUser } from '../../contexts/user-context';
import { MetaTags } from '../../components/seo/meta-tags';
import { Stats } from '../../components/retailers/landing/stats';
import { Benefits } from '../../components/retailers/landing/benefits';
import { CompanyTypes } from '../../components/retailers/landing/company-types';
import { Process } from '../../components/retailers/landing/process';

export function RetailerLandingPage() {
  const { user } = useUser();

  return (
    <>
      <MetaTags
        title="List Your Brand on RetailCrew"
        description="Join hundreds of brands offering exclusive discounts to retail professionals. Reach 50,000+ verified industry members in just minutes."
      />

      <div className="bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 lg:text-5xl">
              Connect with 50,000+ retail professionals
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Join hundreds of brands offering exclusive discounts to verified retail professionals. 
              Launch your offer in minutes and start building lasting relationships with the retail community.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                to={user ? "/list-your-brand/create" : "/signup?returnTo=/list-your-brand/create"}
                className="flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-base font-semibold text-white hover:bg-primary-700"
              >
                Launch on RetailCrew
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Stats />
      <Benefits />
      <CompanyTypes />
      <Process />
    </>
  );
}