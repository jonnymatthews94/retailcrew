import { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { countryCodes } from '../../data/country-codes';

interface CountrySelectorProps {
  value: string;
  onChange: (code: string) => void;
  onClose: () => void;
}

export function CountrySelector({ value, onChange, onClose }: CountrySelectorProps) {
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const filteredCountries = countryCodes.filter(country => 
    country.name.toLowerCase().includes(search.toLowerCase()) ||
    country.code.includes(search)
  );

  return (
    <div ref={ref} className="absolute left-0 top-full z-10 mt-1 w-64 rounded-lg border border-gray-200 bg-white shadow-lg">
      <div className="p-2">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search countries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border border-gray-200 pl-9 pr-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>
      </div>
      <div className="max-h-60 overflow-auto">
        {filteredCountries.map((country) => (
          <button
            key={country.code}
            onClick={() => {
              onChange(country.code);
              onClose();
            }}
            className="flex w-full items-center px-4 py-2 text-left text-sm hover:bg-gray-50"
          >
            <span className="mr-2">{country.flag}</span>
            <span>{country.name}</span>
            <span className="ml-auto text-gray-500">{country.code}</span>
          </button>
        ))}
      </div>
    </div>
  );
}