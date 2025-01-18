import { Link } from 'react-router-dom';
import { Clock, CheckCircle2, XCircle } from 'lucide-react';
import type { BrandManager } from '../../../types/company';
import { LazyImage } from '../../ui/lazy-image';

interface BrandCardProps {
  manager: BrandManager & {
    brands: {
      name: string;
      logo: string;
      offers: any[];
    };
  };
}

export function BrandCard({ manager }: BrandCardProps) {
  const { brands: brand } = manager;
  
  const statusConfig = {
    pending: {
      icon: Clock,
      text: 'Access Pending',
      className: 'text-yellow-600 bg-yellow-50'
    },
    approved: {
      icon: CheckCircle2,
      text: 'Access Granted',
      className: 'text-green-600 bg-green-50'
    },
    rejected: {
      icon: XCircle,
      text: 'Access Denied',
      className: 'text-red-600 bg-red-50'
    }
  };

  const { icon: StatusIcon, text: statusText, className: statusClass } = 
    statusConfig[manager.status];

  return (
    <Link
      to={`/brands/${brand.id}/manage`}
      className="group rounded-lg border p-6 hover:bg-primary-50 transition-colors"
    >
      <div className="flex items-start gap-4">
        <LazyImage
          src={brand.logo}
          alt={brand.name}
          className="h-12 w-12 rounded-lg object-contain bg-white"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 truncate">{brand.name}</h3>
          <div className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium ${statusClass}`}>
            <StatusIcon className="h-3.5 w-3.5" />
            {statusText}
          </div>
        </div>
      </div>

      {manager.status === 'approved' && (
        <div className="mt-4 border-t pt-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Active Offers</span>
            <span className="font-medium text-gray-900">
              {brand.offers.filter(o => !o.is_draft).length}
            </span>
          </div>
          <div className="mt-1 flex justify-between text-sm">
            <span className="text-gray-500">Draft Offers</span>
            <span className="font-medium text-gray-900">
              {brand.offers.filter(o => o.is_draft).length}
            </span>
          </div>
        </div>
      )}
    </Link>
  );
}