import { Switch } from '@headlessui/react';
import { useUser } from '../../contexts/user-context';

export function AuthToggle() {
  const { user, setUser } = useUser();

  const toggleAuth = () => {
    if (user) {
      setUser(null);
    } else {
      setUser({
        id: 'demo-user',
        email: 'demo@retailstore.com',
        name: 'Demo User',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
      });
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Switch
        checked={!!user}
        onChange={toggleAuth}
        className={`${
          user ? 'bg-primary-600' : 'bg-gray-200'
        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2`}
      >
        <span className="sr-only">Toggle authentication</span>
        <span
          className={`${
            user ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        />
      </Switch>
      <span className="text-sm text-gray-600">
        {user ? 'Signed in' : 'Signed out'}
      </span>
    </div>
  );
}