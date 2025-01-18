import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { Check, Copy, ExternalLink } from 'lucide-react';

interface CouponDialogProps {
  open: boolean;
  onClose: () => void;
  code: string;
  brandWebsite: string;
}

export function CouponDialog({ open, onClose, code, brandWebsite }: CouponDialogProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVisitSite = () => {
    window.open(brandWebsite, '_blank');
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
                <Dialog.Title className="text-lg font-semibold">
                  Your Unique Discount Code
                </Dialog.Title>

                <div className="mt-4">
                  <div className="flex items-center gap-2 rounded-lg border p-3">
                    <code className="flex-1 font-mono text-lg">{code}</code>
                    <button
                      onClick={handleCopy}
                      className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                    >
                      {copied ? (
                        <Check className="h-5 w-5 text-green-600" />
                      ) : (
                        <Copy className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleVisitSite}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700"
                >
                  Visit Site
                  <ExternalLink className="h-4 w-4" />
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}