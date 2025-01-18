import { Dialog, Transition } from '@headlessui/react';
import { Search, X } from 'lucide-react';
import { Fragment, useState } from 'react';
import { SearchResults } from './search/search-results';
import { CategoryList } from './search/category-list';
import { useBrandSearch } from '../../hooks/use-brand-search';

export function SearchDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { results, loading } = useBrandSearch(query);

  const handleClose = () => {
    setIsOpen(false);
    setQuery('');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-500 bg-white rounded-lg border hover:border-primary-600 hover:text-primary-600 transition-colors"
      >
        <Search className="w-4 h-4" />
        <span>Search brands and offers...</span>
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
            <div className="flex min-h-full items-start justify-center p-4 pt-16">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform bg-white p-6 shadow-xl transition-all rounded-xl">
                  <div className="relative">
                    <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search brands and offers..."
                      className="h-12 w-full rounded-lg border border-gray-300 bg-white pl-11 pr-4 text-gray-900 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
                      autoFocus
                    />
                    <button
                      onClick={handleClose}
                      className="absolute right-2 top-2 rounded-lg p-2 text-gray-400 hover:text-gray-500"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="mt-8">
                    {query ? (
                      <SearchResults 
                        results={results} 
                        loading={loading} 
                        onClose={handleClose} 
                      />
                    ) : (
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Browse categories</h3>
                        <div className="mt-4">
                          <CategoryList onClose={handleClose} />
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}