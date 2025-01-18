import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useCountryCodes } from '../../hooks/use-country-codes';
import { cn } from '../../lib/utils';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function PhoneInput({ value, onChange, error }: PhoneInputProps) {
  const [countryCode, setCountryCode] = useState('+44'); // Default to UK
  const [showDropdown, setShowDropdown] = useState(false);
  const [isCustom, setIsCustom] = useState(false);
  const { countryCodes, loading } = useCountryCodes();

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/\D/g, '');
    if (isCustom) {
      onChange(inputValue);
    } else {
      onChange(`${countryCode}${inputValue}`);
    }
  };

  const handleCountrySelect = (code: string) => {
    if (code === 'other') {
      setIsCustom(true);
      onChange('');
    } else {
      setIsCustom(false);
      setCountryCode(code);
      // Extract just the number part without the country code
      const numberPart = value.replace(/^\+\d+/, '');
      onChange(`${code}${numberPart}`);
    }
    setShowDropdown(false);
  };

  // Strip country code for display if not custom
  const displayValue = isCustom 
    ? value 
    : value.replace(new RegExp(`^\\${countryCode}`), '');

  return (
    <div className="space-y-2">
      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
        Phone Number
      </label>
      <div className="relative flex rounded-lg border border-gray-300 focus-within:border-primary-600 focus-within:ring-1 focus-within:ring-primary-600">
        {!isCustom && (
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-1 rounded-l-lg border-r border-gray-300 px-3 py-2 text-gray-500 hover:text-gray-700"
            >
              {countryCode}
              <ChevronDown className="h-4 w-4" />
            </button>
            
            {showDropdown && (
              <div className="absolute left-0 top-full z-10 mt-1 max-h-60 w-48 overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg">
                {loading ? (
                  <div className="px-4 py-2 text-sm text-gray-500">Loading...</div>
                ) : (
                  <>
                    {countryCodes.map((country) => (
                      <button
                        key={`${country.code}-${country.name}`}
                        type="button"
                        onClick={() => handleCountrySelect(country.code)}
                        className={cn(
                          "flex w-full items-center px-4 py-2 text-left text-sm hover:bg-gray-50",
                          country.code === countryCode && "bg-primary-50 text-primary-600"
                        )}
                      >
                        <span className="mr-2">{country.flag}</span>
                        <span>{country.name}</span>
                        <span className="ml-auto text-gray-500">{country.code}</span>
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleCountrySelect('other')}
                      className="flex w-full items-center px-4 py-2 text-left text-sm hover:bg-gray-50"
                    >
                      Other
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        )}
        <input
          type="text"
          value={displayValue}
          onChange={handlePhoneChange}
          className={cn(
            "flex-1 border-0 px-3 py-2 focus:outline-none",
            isCustom ? "rounded-lg" : "rounded-r-lg"
          )}
          placeholder={isCustom ? "Enter your full phone number" : "Enter your phone number"}
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-sm text-gray-500">
        We collect this to help you retain access if your work email changes
      </p>
    </div>
  );
}