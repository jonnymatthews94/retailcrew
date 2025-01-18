import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/user-context';
import { Avatar } from '../ui/avatar';
import { useAuthContext } from '../../contexts/auth-context';

export function UserMenu() {
  const { user, setUser } = useUser();
  const { signOut } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      setUser(null);
      navigate('/'); // Redirect to homepage after signout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (!user) return null;

  const displayName = user.firstName && user.lastName 
    ? `${user.firstName} ${user.lastName}`
    : user.email.split('@')[0];

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center gap-2 rounded-lg py-2 px-3 text-sm text-gray-700 hover:text-primary-600 transition-colors">
        <Avatar name={displayName} size="sm" />
        <span className="hidden lg:inline">{displayName}</span>
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
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-4 py-2 border-b">
            <div className="font-medium truncate">{displayName}</div>
            <div className="text-sm text-gray-500 truncate">{user.email}</div>
          </div>

          <Menu.Item>
            {({ active }) => (
              <Link
                to="/account/settings"
                className={`${
                  active ? 'bg-gray-50' : ''
                } block px-4 py-2 text-sm text-gray-700`}
              >
                Account settings
              </Link>
            )}
          </Menu.Item>

          <Menu.Item>
            {({ active }) => (
              <button
                onClick={handleLogout}
                className={`${
                  active ? 'bg-gray-50' : ''
                } flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600`}
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}