import { Dialog, Transition } from '@headlessui/react';
import { Building2, X } from 'lucide-react';
import { Fragment } from 'react';

interface RetailerReferralDialogProps {
  open: boolean;
  onClose: () => void;
  brandName?: string;
}

export function RetailerReferralDialog({ open, onClose, brandName }: RetailerReferralDialogProps) {
  const handleEmailPartner = () => {
    const subject = `Add ${brandName} to RetailCrew's marketplace`;
    const body = `Hi,

I noticed ${brandName} isn't offering a retail industry discount on RetailCrew yet. 

RetailCrew (retailcrew.com) is a marketplace that gives retail professionals exclusive access to hundreds of brand discounts. It would be great to get our team access to discounts at ${brandName}.

Would you be able to look into setting this up?

Best regards`;

    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}&cc=partners@gocertify.me`;
  };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform bg-white p-6 shadow-xl transition-all rounded-xl">
                <div className="flex items-center justify-between">
                  <Dialog.Title className="text-lg font-semibold text-gray-900">
                    Help add {brandName} to RetailCrew
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="rounded-lg p-2 text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-4 flex items-center gap-4 rounded-lg bg-primary-50 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100">
                    <Building2 className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-primary-900">
                      Expand RetailCrew's reach
                    </p>
                    <p className="mt-1 text-sm text-primary-700">
                      Help us bring {brandName}'s discounts to thousands of retail professionals
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-gray-600">
                  As a retail professional, your referral carries weight. Help us connect with the right person at {brandName} to set up exclusive discounts for the entire retail community.
                </p>

                <button
                  onClick={handleEmailPartner}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700"
                >
                  Draft introduction email
                </button>

                <p className="mt-4 text-center text-sm text-gray-500">
                  Your referral helps grow discounts available to the entire retail community
                </p>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}