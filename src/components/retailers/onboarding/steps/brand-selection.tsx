import { useState } from 'react';
import { Search, Plus, Building2 } from 'lucide-react';
import { useBrands } from '../../../../hooks/use-brands';
import type { Brand } from '../../../../types/brand';
import { Combobox } from '@headlessui/react';

interface BrandSelectionProps {
  onSelectBrand: (brand: Brand | null) => void;
  onCreateNew: () => void;
}

export function BrandSelection({ onSelectBrand, onCreateNew }: BrandSelectionProps) {
  const [query, setQuery] = useState('');
  const { brands, loading } = useBrands();

  const filteredBrands = query === ''
    ? brands
    : brands.filter(brand => 
        brand.name.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-lg font-semibold">First, let's find your brand</h2>
        <p className="mt-2 text-sm text-gray-600">
          Search to see if your brand is already listed, or create a new listing
        </p>
      </div>

      <div className="space-y-4">
        {/* Already listed section */}
        <div className="rounded-lg border-2 border-primary-100 bg-primary-50 p-4">
          <h3 className="font-medium">Already listed?</h3>
          <p className="mt-1 text-sm text-gray-600">
            Search for your brand to manage existing offers
          </p>

          <div className="relative mt-4">
            <Combobox onChange={onSelectBrand}>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Combobox.Input
                  className="block w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
                  placeholder="Search brands..."
                  onChange={(e) => setQuery(e.target.value)}
                  displayValue={(brand: Brand) => brand?.name || ''}
                />
              </div>

              <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                {loading ? (
                  <div className="px-4 py-2 text-sm text-gray-500">Loading...</div>
                ) : filteredBrands.length === 0 ? (
                  <div className="px-4 py-2 text-sm text-gray-500">
                    No brands found
                  </div>
                ) : (
                  filteredBrands.map(brand => (
                    <Combobox.Option
                      key={brand.id}
                      value={brand}
                      className={({ active }) => `
                        flex items-center gap-3 px-4 py-2 cursor-pointer
                        ${active ? 'bg-primary-50' : ''}
                      `}
                    >
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="h-8 w-8 rounded-lg object-contain bg-white"
                      />
                      <div>
                        <div className="font-medium">{brand.name}</div>
                        <div className="text-sm text-gray-500">{brand.category}</div>
                      </div>
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Combobox>
          </div>
        </div>

        {/* New to RetailCrew section */}
        <div className="rounded-lg border-2 border-dashed border-gray-300 p-4">
          <h3 className="font-medium">New to RetailCrew?</h3>
          <p className="mt-1 text-sm text-gray-600">
            Create a new brand listing to start offering discounts
          </p>

          <button
            onClick={onCreateNew}
            className="mt-4 flex w-full items-center gap-3 rounded-lg bg-white border border-gray-300 p-4 hover:border-primary-600 hover:bg-primary-50 transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50">
              <Plus className="h-5 w-5 text-primary-600" />
            </div>
            <div className="flex-1 text-left">
              <div className="font-medium">Add new brand</div>
              <div className="text-sm text-gray-500">Create a new listing</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}