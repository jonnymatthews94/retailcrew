import { Building2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ListBrandCard() {
  return (
    <Link
      to="/list-your-brand"
      className="group flex flex-col justify-between rounded-lg border border-dashed border-primary-300 bg-primary-50 p-6 hover:border-primary-400 hover:bg-primary-100"
    >
      <div>
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-primary-100 group-hover:bg-primary-200">
          <Building2 className="h-8 w-8 text-primary-600" />
        </div>
        <h3 className="font-semibold text-gray-900">List your brand here</h3>
        <p className="mt-2 text-sm text-gray-600">
          Join hundreds of brands offering exclusive discounts to retail professionals
        </p>
      </div>
      <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary-600">
        Get started
        <ArrowRight className="h-4 w-4" />
      </div>
    </Link>
  );
}