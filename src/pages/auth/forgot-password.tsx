import { ForgotPasswordForm } from '../../components/auth/forgot-password-form';
import { AuthLayout } from '../../components/layout/auth-layout';

export function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <ForgotPasswordForm />
    </AuthLayout>
  );
}