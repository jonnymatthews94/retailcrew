import { useCategories } from '../../hooks/use-categories';
import { useBrands } from '../../hooks/use-brands';
import { getIconComponent } from '../../lib/icons';

export function CompanyTypes() {
  const { categories, loading } = useCategories();
  const { brands } = useBrands();

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse rounded-lg border border-gray-200 bg-white p-6">
            <div className="h-12 w-12 rounded-lg bg-gray-200"></div>
            <div className="mt-4 h-6 w-32 bg-gray-200 rounded"></div>
            <div className="mt-2 h-4 w-48 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => {
        const Icon = getIconComponent(category.icon);
        const categoryBrands = brands.filter(
          brand => brand.category.toLowerCase() === category.name.toLowerCase()
        );

        return (
          <div 
            key={category.id}
            className="flex gap-4 rounded-lg border border-gray-200 bg-white p-6"
          >
            <div className="flex-shrink-0">
              <div className="h-12 w-12 rounded-lg bg-primary-100 p-3">
                <Icon className="h-full w-full text-primary-600" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{category.name}</h3>
              <p className="mt-1 text-sm text-gray-600">{category.description}</p>
              <p className="mt-2 text-sm text-primary-600">{categoryBrands.length}+ offers</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}