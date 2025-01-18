import { Building2 } from 'lucide-react';
import { BrandCard } from './brand-card';
import { EmptyState } from '../../ui/empty-state';
import type { BrandManager } from '../../../types/company';

interface BrandGridProps {
  managedBrands: BrandManager[];
  loading?: boolean;
}

export function BrandGrid({ managedBrands, loading }: BrandGridProps) {
  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse rounded-lg border p-6">
            <div className="h-12 w-12 rounded-lg bg-gray-200" />
            <div className="mt-4 h-4 w-24 bg-gray-200 rounded" />
            <div className="mt-2 h-4 w-16 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (managedBrands.length === 0) {
    return (
      <EmptyState
        icon={Building2}
        title="No brands yet"
        description="You haven't been granted access to manage any brands yet."
        action={{
          label: "Request Access",
          href: "/brands"
        }}
      />
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {managedBrands.map((manager) => (
        <BrandCard key={manager.id} manager={manager} />
      ))}
    </div>
  );
}