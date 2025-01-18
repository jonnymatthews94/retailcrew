import { useState } from 'react';
import { Upload, AlertCircle, TrendingUp, Loader2 } from 'lucide-react';
import type { RetailerOnboardingData } from '../../../../types/retailer';
import { useCodeUpload } from '../../../../hooks/use-code-upload';

interface OfferDetailsStepProps extends RetailerOnboardingData {
  updateFields: (fields: Partial<RetailerOnboardingData>) => void;
  errors: Record<string, string>;
}

export function OfferDetailsStep({
  offerTitle,
  offerDescription,
  discountValue,
  discountCode,
  isUniqueCode,
  uniqueCodes,
  expiryDate,
  terms,
  updateFields,
  errors
}: OfferDetailsStepProps) {
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const { uploadCodes, uploading, error: uploadError } = useCodeUpload();

  const handleFileUpload = async (file: File) => {
    try {
      setCsvFile(file);
      const codes = await uploadCodes(file);
      updateFields({ uniqueCodes: codes });
    } catch (err) {
      console.error('Failed to upload codes:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="offerTitle" className="block text-sm font-medium text-gray-700">
          Offer Title
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="offerTitle"
            value={offerTitle}
            onChange={e => updateFields({ offerTitle: e.target.value })}
            placeholder="e.g., 30% off for retail professionals"
            className={`block w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-1 ${
              errors.offerTitle 
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:border-primary-600 focus:ring-primary-600'
            }`}
          />
        </div>
        {errors.offerTitle && (
          <p className="mt-1 text-sm text-red-600">{errors.offerTitle}</p>
        )}
      </div>

      <div>
        <label htmlFor="offerDescription" className="block text-sm font-medium text-gray-700">
          Offer Description
        </label>
        <div className="mt-1">
          <textarea
            id="offerDescription"
            value={offerDescription}
            onChange={e => updateFields({ offerDescription: e.target.value })}
            placeholder="Describe your offer in detail..."
            rows={3}
            className={`block w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-1 ${
              errors.offerDescription 
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:border-primary-600 focus:ring-primary-600'
            }`}
          />
        </div>
        {errors.offerDescription && (
          <p className="mt-1 text-sm text-red-600">{errors.offerDescription}</p>
        )}
      </div>

      <div>
        <label htmlFor="discountValue" className="block text-sm font-medium text-gray-700">
          Discount Value
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="discountValue"
            value={discountValue}
            onChange={e => updateFields({ discountValue: e.target.value })}
            placeholder="e.g., 30% off, £50 off, Buy one get one free"
            className={`block w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-1 ${
              errors.discountValue 
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:border-primary-600 focus:ring-primary-600'
            }`}
          />
        </div>
        {errors.discountValue && (
          <p className="mt-1 text-sm text-red-600">{errors.discountValue}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Discount Code Type
        </label>
        <div className="mt-2 space-y-4">
          <label className="flex items-center gap-3">
            <input
              type="radio"
              checked={isUniqueCode}
              onChange={() => updateFields({ isUniqueCode: true })}
              className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-600"
            />
            <div>
              <span className="font-medium">Unique codes (Recommended)</span>
              <p className="text-sm text-gray-500">Better security and prevents offer leakage</p>
            </div>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="radio"
              checked={!isUniqueCode}
              onChange={() => updateFields({ isUniqueCode: false })}
              className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-600"
            />
            <div>
              <span className="font-medium">Single code for everyone</span>
              <p className="text-sm text-gray-500">One code that works for all verified members</p>
            </div>
          </label>
        </div>

        {isUniqueCode ? (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Upload Codes CSV
            </label>
            <div className="mt-1">
              <div className="flex items-center gap-4">
                <label className="flex-1 cursor-pointer rounded-lg border-2 border-dashed border-gray-300 px-6 py-4 hover:border-primary-600">
                  <input
                    type="file"
                    accept=".csv"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file);
                    }}
                  />
                  <div className="flex items-center justify-center gap-2 text-gray-600">
                    {uploading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Upload className="h-5 w-5" />
                    )}
                    <span>{csvFile ? csvFile.name : 'Upload CSV file'}</span>
                  </div>
                </label>
                {csvFile && !uploading && (
                  <button
                    type="button"
                    onClick={() => {
                      setCsvFile(null);
                      updateFields({ uniqueCodes: [] });
                    }}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>
              {uploadError && (
                <p className="mt-2 text-sm text-red-600">{uploadError}</p>
              )}
              {errors.uniqueCodes && (
                <p className="mt-2 text-sm text-red-600">{errors.uniqueCodes}</p>
              )}
              {uniqueCodes.length > 0 && (
                <p className="mt-2 text-sm text-green-600">
                  {uniqueCodes.length} valid codes loaded
                </p>
              )}
              <p className="mt-2 text-sm text-gray-500">
                CSV should contain a single column with unique discount codes
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-4">
            <label htmlFor="discountCode" className="block text-sm font-medium text-gray-700">
              Discount Code
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="discountCode"
                value={discountCode}
                onChange={e => updateFields({ discountCode: e.target.value.toUpperCase() })}
                placeholder="e.g., RETAIL30"
                className={`block w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-1 ${
                  errors.discountCode 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:border-primary-600 focus:ring-primary-600'
                }`}
              />
            </div>
            {errors.discountCode && (
              <p className="mt-1 text-sm text-red-600">{errors.discountCode}</p>
            )}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
          Expiry Date
        </label>
        <div className="mt-1">
          <input
            type="date"
            id="expiryDate"
            value={expiryDate}
            onChange={e => updateFields({ expiryDate: e.target.value })}
            min={new Date().toISOString().split('T')[0]}
            className={`block w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-1 ${
              errors.expiryDate 
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:border-primary-600 focus:ring-primary-600'
            }`}
          />
        </div>
        {errors.expiryDate && (
          <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
        )}
      </div>

      <div>
        <label htmlFor="terms" className="block text-sm font-medium text-gray-700">
          Terms & Conditions
        </label>
        <p className="mt-1 text-sm text-gray-500">
          Include any limitations such as excluded categories, minimum spend requirements, etc.
          Add each term on a new line.
        </p>
        <div className="mt-2">
          <textarea
            id="terms"
            value={terms.join('\n')}
            onChange={e => updateFields({ terms: e.target.value.split('\n').filter(Boolean) })}
            rows={4}
            placeholder="Excludes sale items&#10;Minimum spend £50&#10;Not valid on limited editions"
            className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
          />
        </div>
      </div>
    </div>
  );
}