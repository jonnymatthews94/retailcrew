import { useState } from 'react';
import { useAuthContext } from '../../../contexts/auth-context';

export function useForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      await resetPassword(email);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    submitted,
    error,
    loading,
    handleSubmit,
  };
}