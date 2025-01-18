import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/auth-context';
import type { LoginFormData } from '../../../types/auth';

export function useLoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      await signIn(formData.email, formData.password);

      // Get return URL from location state or default to home
      const returnTo = (location.state as any)?.returnTo || '/';
      navigate(returnTo);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    error,
    loading,
    handleSubmit,
  };
}