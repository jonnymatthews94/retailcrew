import { Menu, ShoppingBag, User, X, Globe, Search } from 'lucide-react';
import { SearchDialog } from '../ui/search-dialog';
import { CountrySelector } from '../ui/country-selector';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useUser } from '../../contexts/user-context';
import { UserMenu } from './user-menu';
import { AuthToggle } from '../ui/auth-toggle';
import { UserStatusSelector } from '../ui/user-status-selector';
import { CategoriesNav } from './categories-nav';
import type { VerificationStatus } from '../../types/user';

const categories = [
  { name: 'Fashion', path: '/category/fashion' },
  { name: 'Food & Drink', path: '/category/food-drink' },
  { name: 'Tech & Mobile', path: '/category/tech-mobile' },
  { name: 'Beauty', path: '/category/beauty' },
  { name: 'Health & Fitness', path: '/category/health-fitness' },
  { name: 'Travel', path: '/category/travel' },
  { name: 'Entertainment', path: '/category/entertainment' }
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser } = useUser();

  const handleStatusChange = (status: VerificationStatus) => {
    if (user) {
      setUser({ ...user, verificationStatus: status });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Left section */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
            <Link to="/" className="flex items-center gap-2">
              <ShoppingBag className="h-6 w-6 text-primary-600" />
              <span className="text-xl font-bold">RetailCrew</span>
            </Link>
          </div>

          {/* Center section */}
          <div className="hidden lg:flex flex-1 items-center justify-center">
            <SearchDialog />
          </div>

          {/* Right section */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <AuthToggle />
            </div>
            {user && (
              <UserStatusSelector 
                status={user.verificationStatus} 
                onChange={handleStatusChange}
              />
            )}
            <div className="hidden md:block">
              <CountrySelector />
            </div>
            {user ? (
              <UserMenu />
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-primary-600"
                >
                  <User className="h-5 w-5" />
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
                >
                  <span className="lg:hidden">Join</span>
                  <span className="hidden lg:inline">Join RetailCrew</span>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile search */}
        <div className="lg:hidden border-t">
          <div className="py-3">
            <SearchDialog />
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t">
            <div className="py-4 space-y-4">
              <div className="md:hidden">
                <AuthToggle />
              </div>

              {/* Categories */}
              <div className="space-y-1">
                <div className="px-2 text-xs font-semibold text-gray-500 uppercase">
                  Categories
                </div>
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    to={category.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>

              {!user && (
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-2 py-2 text-sm font-medium text-gray-700 hover:text-primary-600"
                >
                  <User className="h-5 w-5" />
                  Sign in
                </Link>
              )}
              
              <div className="px-2">
                <CountrySelector />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Desktop categories */}
      <div className="hidden lg:block">
        <CategoriesNav />
      </div>
    </header>
  );
}