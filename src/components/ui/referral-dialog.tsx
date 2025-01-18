import { Dialog, Transition } from '@headlessui/react';
import { Link, Mail, MessageSquare, X, Check } from 'lucide-react';
import { Fragment, useState, useEffect } from 'react';
import { getBrandUrl, getEmailShareContent, getSlackShareContent } from '../../lib/sharing';

interface ReferralDialogProps {
  open: boolean;
  onClose: () => void;
  brandName?: string;
  discountValue?: string;
}

export function ReferralDialog({ open, onClose, brandName, discountValue }: ReferralDialogProps) {
  const [copied, setCopied] = useState(false);
  
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleEmailShare = () => {
    const { subject, body } = getEmailShareContent(brandName, discountValue);
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleCopyLink = async () => {
    const url = getBrandUrl(brandName || '');
    await navigator.clipboard.writeText(url);
    setCopied(true);
  };

  const handleSlackShare = () => {
    const { text, url } = getSlackShareContent(brandName, discountValue);
    window.open(`https://slack.com/share?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
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
                    Share offer with colleagues
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="rounded-lg p-2 text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-4 flex items-center gap-4 rounded-lg bg-primary-50 p-4">
                  <img
                    src={`https://logo.clearbit.com/${brandName?.toLowerCase().replace(/\s+/g, '')}.com`}
                    alt={brandName}
                    className="h-12 w-12 rounded-lg object-contain bg-white p-1"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div>
                    <p className="font-medium text-primary-900">
                      Help us unlock more exclusive discounts
                    </p>
                    <p className="mt-1 text-sm text-primary-700">
                      The bigger our community grows, the more brands and better offers we can secure for everyone
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <button
                    onClick={handleSlackShare}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-indigo-600 hover:bg-gray-50"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Share on Slack
                  </button>

                  <button
                    onClick={handleEmailShare}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-indigo-600 hover:bg-gray-50"
                  >
                    <Mail className="h-4 w-4" />
                    Share via email
                  </button>

                  <button
                    onClick={handleCopyLink}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-indigo-600 hover:bg-gray-50"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Link className="h-4 w-4" />
                        Copy link
                      </>
                    )}
                  </button>
                </div>

                <p className="mt-4 text-center text-sm text-gray-500">
                  Together we can build the largest retail professional community
                </p>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}