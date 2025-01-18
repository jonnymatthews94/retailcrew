import { AuthHeader } from './auth-header';
import { AuthFooter } from './auth-footer';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <AuthHeader />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          {children}
        </div>
      </main>
      <AuthFooter />
    </div>
  );
}