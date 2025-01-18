import { Users, ShieldCheck } from 'lucide-react';

export function FeaturesSection() {
  return (
    <div className="grid gap-12 md:grid-cols-2">
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100">
            <Users className="h-6 w-6 text-primary-600" />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Community first</h3>
          <p className="mt-2 text-lg text-gray-600">
            Join thousands of retail professionals sharing exclusive discounts
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100">
            <ShieldCheck className="h-6 w-6 text-primary-600" />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Verified access</h3>
          <p className="mt-2 text-lg text-gray-600">
            Quick verification through your work email
          </p>
        </div>
      </div>
    </div>
  );
}