import { Store, Building2, Network, Laptop } from 'lucide-react';

const types = [
  {
    title: 'Store Staff',
    count: '25,000+',
    description: 'Retail store employees, managers, and sales associates',
    icon: Store
  },
  {
    title: 'Agencies',
    count: '10,000+',
    description: 'Marketing and ecommerce agency professionals',
    icon: Building2
  },
  {
    title: 'Affiliate Networks',
    count: '8,000+',
    description: 'Publishers and affiliate marketing professionals',
    icon: Network
  },
  {
    title: 'Tech Partners',
    count: '7,000+',
    description: 'Professionals at retail technology companies',
    icon: Laptop
  }
];

export function CompanyTypes() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold">Reach your target audience</h2>
          <p className="mt-4 text-lg text-gray-600">
            Connect with verified professionals across the retail industry
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {types.map((type) => {
            const Icon = type.icon;
            return (
              <div key={type.title} className="rounded-lg border p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100">
                  <Icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="mt-4 font-semibold text-gray-900">{type.title}</h3>
                <p className="mt-1 text-2xl font-bold text-primary-600">{type.count}</p>
                <p className="mt-2 text-sm text-gray-600">{type.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}