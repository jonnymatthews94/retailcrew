import { SignupForm } from '../../components/auth/signup-form';
import { AuthLayout } from '../../components/layout/auth-layout';

export function SignupPage() {
  return (
    <AuthLayout>
      <SignupForm />
    </AuthLayout>
  );
}