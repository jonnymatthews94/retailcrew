import { Users, Building2, ArrowUpRight } from 'lucide-react';

const stats = [
  {
    label: 'Verified Members',
    value: '50,000+',
    description: 'Active retail professionals',
    icon: Users
  },
  {
    label: 'Partner Brands',
    value: '200+',
    description: 'Offering exclusive discounts',
    icon: Building2
  },
  {
    label: 'Average Conversion',
    value: '12%',
    description: 'From visit to purchase',
    icon: ArrowUpRight
  }
];

export function Stats() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex gap-4 rounded-lg border p-6">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-100">
                  <Icon className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="font-medium text-gray-900">{stat.label}</p>
                  <p className="mt-1 text-sm text-gray-600">{stat.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}