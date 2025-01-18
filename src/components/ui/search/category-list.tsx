import { Link } from 'react-router-dom';
import { useCategories } from '../../../hooks/use-categories';
import { useBrands } from '../../../hooks/use-brands';
import { getIconComponent } from '../../../lib/icons';

interface CategoryListProps {
  onClose: () => void;
}

export function CategoryList({ onClose }: CategoryListProps) {
  const { categories, loading } = useCategories();
  const { brands } = useBrands();

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse rounded-lg border p-4">
            <div className="h-10 w-10 rounded-lg bg-gray-200"></div>
            <div className="mt-2 h-4 w-24 bg-gray-200 rounded"></div>
            <div className="mt-1 h-3 w-16 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {categories.map((category) => {
        const Icon = getIconComponent(category.icon);
        const categoryBrands = brands.filter(
          b => b.category.toLowerCase() === category.name.toLowerCase()
        );

        return (
          <Link
            key={category.id}
            to={`/category/${category.name.toLowerCase()}`}
            onClick={onClose}
            className="flex items-center gap-3 rounded-lg border p-4 text-left hover:bg-primary-50 transition-colors group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 group-hover:bg-primary-100">
              <Icon className="h-5 w-5 text-gray-600 group-hover:text-primary-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">{category.name}</h4>
              <p className="text-sm text-gray-500">
                {categoryBrands.length} offers
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}