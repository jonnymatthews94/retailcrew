import { useUser } from '../../../contexts/user-context';
import { useBrandManagement } from '../../../hooks/use-brand-management';
import { BrandGrid } from '../../../components/brands/management/brand-grid';
import { MetaTags } from '../../../components/seo/meta-tags';

export function BrandManagementHub() {
  const { user } = useUser();
  const { managedBrands, loading } = useBrandManagement(user?.id);

  return (
    <div className="container mx-auto px-4 py-12">
      <MetaTags
        title="Brand Management"
        description="Manage your brand offers and discounts on RetailCrew"
      />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Brand Management</h1>
          <p className="mt-2 text-gray-600">
            Manage your brand offers and track performance
          </p>
        </div>
      </div>

      <div className="mt-12">
        <BrandGrid managedBrands={managedBrands} loading={loading} />
      </div>
    </div>
  );
}