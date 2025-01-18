import { ShoppingBag, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export function AuthHeader() {
  const navigate = useNavigate();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-primary-600" />
            <span className="text-xl font-bold">RetailCrew</span>
          </Link>

          <button
            onClick={() => navigate('/')}
            className="rounded-lg p-2 text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}