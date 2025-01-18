import { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Globe, X, Check } from 'lucide-react';
import { Fragment } from 'react';
import { useWaitlist } from '../../hooks/use-waitlist';
import { debugLog } from '../../components/debug/logger';

const countries = [
  { code: 'us', name: 'United States' },
  { code: 'ca', name: 'Canada' },
  { code: 'au', name: 'Australia' },
  { code: 'nz', name: 'New Zealand' },
  { code: 'sg', name: 'Singapore' },
  { code: 'fr', name: 'France' },
  { code: 'de', name: 'Germany' },
];

export function CountrySelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { addToWaitlist, loading, error } = useWaitlist();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      debugLog('info', 'Submitting country waitlist', { email, country });
      await addToWaitlist(email, 'country', country);
      setSubmitted(true);
      debugLog('success', 'Country waitlist submission successful');
    } catch (err) {
      debugLog('error', 'Country waitlist submission failed', { error: err });
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    // Reset form after dialog is closed
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
      setCountry('');
    }, 300);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm text-gray-700 hover:border-primary-600 hover:text-primary-600"
      >
        <Globe className="h-4 w-4" />
        <span>UK</span>
      </button>

      <Transition show={isOpen} as={Fragment}>
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
                    <div className="text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                        <Check className="h-6 w-6 text-green-600" />
                      </div>
                      <Dialog.Title className="mt-4 text-lg font-semibold text-gray-900">
                        Thanks for your interest!
                      </Dialog.Title>
                      <p className="mt-2 text-gray-600">
                        We'll notify you when RetailCrew launches in {countries.find(c => c.code === country)?.name || 'your country'}.
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
                          Coming Soon to More Countries
                        </Dialog.Title>
                        <button
                          onClick={handleClose}
                          className="rounded-lg p-2 text-gray-400 hover:text-gray-500"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>

                      <p className="mt-4 text-gray-600">
                        RetailCrew is currently only available in the UK. Join our waitlist to be notified when we launch in your country!
                      </p>

                      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        <div>
                          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                            Country
                          </label>
                          <select
                            id="country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
                          >
                            <option value="">Select a country</option>
                            {countries.map((country) => (
                              <option key={country.code} value={country.code}>
                                {country.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Work Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
                          />
                        </div>

                        {error && (
                          <p className="text-sm text-red-600">{error}</p>
                        )}

                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700 disabled:opacity-50"
                        >
                          {loading ? 'Joining...' : 'Join Waitlist'}
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
    </>
  );
}