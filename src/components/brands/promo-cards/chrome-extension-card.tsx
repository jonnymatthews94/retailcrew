import { Chrome, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { ChromeExtensionDialog } from '../../ui/chrome-extension-dialog';

export function ChromeExtensionCard() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowDialog(true)}
        className="group flex flex-col justify-between rounded-lg border border-dashed border-primary-300 bg-primary-50 p-6 text-left hover:border-primary-400 hover:bg-primary-100"
      >
        <div>
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-primary-100 group-hover:bg-primary-200">
            <Chrome className="h-8 w-8 text-primary-600" />
          </div>
          <h3 className="font-semibold text-gray-900">Never miss a discount!</h3>
          <p className="mt-2 text-sm text-gray-600">
            Our Chrome extension will remind you of available discounts while shopping
          </p>
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary-600">
          Join waitlist
          <ArrowRight className="h-4 w-4" />
        </div>
      </button>

      <ChromeExtensionDialog 
        open={showDialog}
        onClose={() => setShowDialog(false)}
      />
    </>
  );
}