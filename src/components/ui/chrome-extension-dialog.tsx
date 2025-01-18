import { Dialog, Transition } from '@headlessui/react';
import { Chrome, X, Check } from 'lucide-react';
import { Fragment, useState } from 'react';
import { useWaitlist } from '../../hooks/use-waitlist';

interface ChromeExtensionDialogProps {
  open: boolean;
  onClose: () => void;
}

export function ChromeExtensionDialog({ open, onClose }: ChromeExtensionDialogProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { addToWaitlist, loading, error } = useWaitlist();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addToWaitlist(email, 'chrome_extension');
      setSubmitted(true);
    } catch (err) {
      // Error handling is done in the hook
    }
  };

  const handleClose = () => {
    onClose();
    // Reset form after dialog is closed
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
    }, 300);
  };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={handleClose} className="relative z-50">
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
                {submitted ? (
                  <div className="text-center bg-primary-50 p-8 rounded-lg">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
                      <Check className="h-6 w-6 text-primary-600" />
                    </div>
                    <Dialog.Title className="mt-4 text-lg font-semibold text-gray-900">
                      You're on the list!
                    </Dialog.Title>
                    <p className="mt-2 text-gray-600">
                      Thanks for your interest! We'll notify you when the Chrome extension launches.
                    </p>
                    <button
                      onClick={handleClose}
                      className="mt-6 w-full rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <Dialog.Title className="text-lg font-semibold text-gray-900">
                        Chrome Extension Coming Soon
                      </Dialog.Title>
                      <button
                        onClick={handleClose}
                        className="rounded-lg p-2 text-gray-400 hover:text-gray-500"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center gap-3 rounded-lg bg-primary-50 p-4">
                        <Chrome className="h-6 w-6 text-primary-600" />
                        <p className="text-sm text-primary-900">
                          Never miss a discount! Our Chrome extension will remind you of available discounts while shopping.
                        </p>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-6">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Work Email
                      </label>
                      <div className="mt-1">
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
                          placeholder="Enter your work email"
                        />
                      </div>
                      {error && (
                        <p className="mt-2 text-sm text-red-600">{error}</p>
                      )}
                      <button
                        type="submit"
                        disabled={loading}
                        className="mt-4 w-full rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700 disabled:opacity-50"
                      >
                        {loading ? 'Joining...' : 'Join the Waitlist'}
                      </button>
                    </form>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}