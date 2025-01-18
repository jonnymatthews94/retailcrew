import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { ArrowRight } from 'lucide-react';

interface VerificationDialogProps {
  open: boolean;
  onClose: () => void;
}

export function VerificationDialog({ open, onClose }: VerificationDialogProps) {
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
              <Dialog.Panel className="w-full max-w-md transform bg-white p-6 text-center shadow-xl transition-all rounded-xl">
                <Dialog.Title className="text-lg font-semibold text-gray-900">
                  Verify your work email
                </Dialog.Title>
                <p className="mt-2 text-sm text-gray-600">
                  To complete your signup, we need to verify your work email address.
                </p>
                <button
                  onClick={handleStartVerification}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700"
                >
                  Start verification
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}