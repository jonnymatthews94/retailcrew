import { TrendingUp, Users, Clock, ShieldCheck } from 'lucide-react';

const benefits = [
  {
    title: 'Increase Brand Awareness',
    description: 'Get your brand in front of 50,000+ retail professionals actively looking for industry partnerships.',
    icon: TrendingUp
  },
  {
    title: 'Build Industry Relationships',
    description: 'Connect directly with retail store staff, agencies, and tech partners to create lasting partnerships.',
    icon: Users
  },
  {
    title: 'Quick Setup',
    description: 'Launch your offer in minutes with our simple submission process. No complex integrations required.',
    icon: Clock
  },
  {
    title: 'Verified Audience',
    description: 'Every member is verified as a retail professional, ensuring your offers reach the right audience.',
    icon: ShieldCheck
  }
];

export function Benefits() {
  return (
    <section className="bg-primary-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold">Why list on RetailCrew?</h2>
          <p className="mt-4 text-lg text-gray-600">
            Join hundreds of brands building relationships with the retail community
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div key={benefit.title} className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100">
                  <Icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="mt-4 font-semibold text-gray-900">{benefit.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}