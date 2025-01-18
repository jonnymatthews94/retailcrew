import { createContext, useContext, useEffect, useState } from 'react';
import { useAuthContext } from './auth-context';
import { useProfile } from '../hooks/use-profile';
import { debugLog } from '../components/debug/logger';
import type { User } from '../types/user';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { user: authUser } = useAuthContext();
  const { profile } = useProfile();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!authUser || !profile) {
      setUser(null);
      return;
    }

    const newUser = {
      id: authUser.id,
      email: profile.email,
      firstName: profile.first_name || undefined,
      lastName: profile.last_name || undefined,
      companyName: profile.company_name || undefined,
      companyType: profile.company_type || undefined,
      companyWebsite: profile.company_website || undefined,
      verificationStatus: profile.verification_status,
      verificationExpiry: profile.verification_expiry || undefined
    };

    debugLog('info', 'User context updated', {
      userId: newUser.id,
      verificationStatus: newUser.verificationStatus
    });

    setUser(newUser);
  }, [authUser, profile]);

  const updateUser = (newUser: User | null) => {
    debugLog('info', 'User state changed', {
      previousStatus: user?.verificationStatus,
      newStatus: newUser?.verificationStatus
    });
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={{ user, setUser: updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}