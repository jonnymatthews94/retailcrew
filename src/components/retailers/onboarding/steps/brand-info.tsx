import { useEffect, useRef } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { useBrandLogo } from '../../../../hooks/use-brand-logo';
import { useUser } from '../../../../contexts/user-context';
import type { RetailerOnboardingData } from '../../../../types/retailer';

interface BrandInfoStepProps extends RetailerOnboardingData {
  updateFields: (fields: Partial<RetailerOnboardingData>) => void;
  errors: Record<string, string>;
}

export function BrandInfoStep({ 
  brandName,
  brandLogo,
  brandWebsite,
  updateFields,
  errors
}: BrandInfoStepProps) {
  const { user } = useUser();
  const { uploadLogo, uploading, error: uploadError } = useBrandLogo();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Pre-populate from user data
  useEffect(() => {
    if (user?.companyName && !brandName) {
      updateFields({ 
        brandName: user.companyName,
        brandWebsite: user.companyWebsite || ''
      });
    }
  }, [user, brandName, updateFields]);

  const handleFileUpload = async (file: File) => {
    try {
      const logoUrl = await uploadLogo(file, brandName);
      updateFields({ brandLogo: logoUrl });
    } catch (err) {
      console.error('Failed to upload logo:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="brandName" className="block text-sm font-medium text-gray-700">
          Brand Name
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="brandName"
            value={brandName}
            onChange={e => updateFields({ brandName: e.target.value })}
            className={`block w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-1 ${
              errors.brandName 
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:border-primary-600 focus:ring-primary-600'
            }`}
          />
        </div>
        {errors.brandName && (
          <p className="mt-1 text-sm text-red-600">{errors.brandName}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Brand Logo
        </label>
        <div className="mt-4 flex items-start gap-8">
          <div>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="relative h-32 w-32 cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-2 hover:border-primary-600"
            >
              {brandLogo ? (
                <img
                  src={brandLogo}
                  alt="Brand logo preview"
                  className="h-full w-full rounded-lg object-contain"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <Upload className="h-8 w-8 text-gray-400" />
                </div>
              )}
              {uploading && (
                <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file);
              }}
            />
            <p className="mt-2 text-xs text-gray-500">
              500px by 500px recommended
            </p>
          </div>
          {uploadError && (
            <div className="flex items-center gap-2 text-sm text-red-600">
              <AlertCircle className="h-4 w-4" />
              {uploadError}
            </div>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="brandWebsite" className="block text-sm font-medium text-gray-700">
          Brand Website
        </label>
        <div className="mt-1">
          <input
            type="url"
            id="brandWebsite"
            value={brandWebsite}
            onChange={e => updateFields({ brandWebsite: e.target.value })}
            placeholder="https://example.com"
            className={`block w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-1 ${
              errors.brandWebsite 
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:border-primary-600 focus:ring-primary-600'
            }`}
          />
        </div>
        {errors.brandWebsite && (
          <p className="mt-1 text-sm text-red-600">{errors.brandWebsite}</p>
        )}
      </div>
    </div>
  );
}