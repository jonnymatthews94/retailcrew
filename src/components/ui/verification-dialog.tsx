import { Dialog, Transition } from '@headlessui/react';
import { ShieldCheck, X } from 'lucide-react';
import { Fragment } from 'react';

interface VerificationDialogProps {
  open: boolean;
  onClose: () => void;
  isExpired?: boolean;
}

export function VerificationDialog({ open, onClose, isExpired }: VerificationDialogProps) {
  const handleStartVerification = () => {
    // TODO: Integrate with verification provider
    onClose();
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
                    {isExpired ? 'Renew Verification' : 'Verify Your Account'}
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
                    <ShieldCheck className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-primary-900">
                      {isExpired ? 'Your verification has expired' : 'Quick verification required'}
                    </p>
                    <p className="mt-1 text-sm text-primary-700">
                      {isExpired 
                        ? 'Please renew your verification to continue accessing exclusive discounts'
                        : 'Verify your retail industry status to access exclusive discounts'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleStartVerification}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700"
                >
                  {isExpired ? 'Renew verification' : 'Start verification'}
                </button>

                <p className="mt-4 text-center text-sm text-gray-500">
                  Powered by{' '}
                  <a 
                    href="https://gocertify.me" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:underline"
                  >
                    GoCertify
                  </a>
                </p>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}