import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';

const categories = [
  { name: 'Fashion', path: '/category/fashion' },
  { name: 'Food & Drink', path: '/category/food-drink' },
  { name: 'Tech & Mobile', path: '/category/tech-mobile' },
  { name: 'Beauty', path: '/category/beauty' },
  { name: 'Health & Fitness', path: '/category/health-fitness' },
  { name: 'Travel', path: '/category/travel' },
  { name: 'Entertainment', path: '/category/entertainment' }
];

export function CategoriesNav() {
  const location = useLocation();

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-8 overflow-x-auto">
          <Link
            to="/brands"
            className={cn(
              "py-3 text-sm font-medium text-gray-700 hover:text-primary-600 border-b-2 border-transparent hover:border-primary-600 whitespace-nowrap",
              location.pathname === '/brands' && "text-primary-600 border-primary-600"
            )}
          >
            All Brands
          </Link>
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.path}
              className={cn(
                "py-3 text-sm font-medium text-gray-700 hover:text-primary-600 border-b-2 border-transparent hover:border-primary-600 whitespace-nowrap",
                location.pathname === category.path && "text-primary-600 border-primary-600"
              )}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}