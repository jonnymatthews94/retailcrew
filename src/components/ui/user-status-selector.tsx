import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDown, ShieldCheck, ShieldOff, ShieldX } from 'lucide-react';
import { useVerification } from '../../hooks/use-verification';
import { debugLog } from '../../components/debug/logger';
import type { VerificationStatus } from '../../types/user';

const statuses: { value: VerificationStatus; label: string; icon: typeof ShieldCheck }[] = [
  { value: 'verified', label: 'Verified', icon: ShieldCheck },
  { value: 'not-verified', label: 'Not Verified', icon: ShieldOff },
  { value: 'verified-expired', label: 'Verification Expired', icon: ShieldX }
];

export function UserStatusSelector() {
  const { status, updateStatus } = useVerification();

  const handleStatusChange = (newStatus: VerificationStatus) => {
    debugLog('info', 'User manually changed verification status', {
      from: status,
      to: newStatus
    });
    updateStatus(newStatus);
  };

  const currentStatus = statuses.find(s => s.value === status) || statuses[1];
  const StatusIcon = currentStatus.icon;

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm text-gray-700 hover:border-primary-600 hover:text-primary-600">
        <StatusIcon className="h-4 w-4" />
        <span>{currentStatus.label}</span>
        <ChevronDown className="h-4 w-4" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {statuses.map(({ value, label, icon: Icon }) => (
            <Menu.Item key={value}>
              {({ active }) => (
                <button
                  onClick={() => handleStatusChange(value)}
                  className={`${
                    active ? 'bg-gray-50' : ''
                  } flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}