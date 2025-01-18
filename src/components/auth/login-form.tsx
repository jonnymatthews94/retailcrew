import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useAuthContext } from '../../contexts/auth-context';
import type { LoginFormData } from '../../types/auth';

export function LoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      await signIn(formData.email, formData.password);
      const returnTo = (location.state as any)?.returnTo || '/';
      navigate(returnTo);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="mt-2 text-sm text-gray-600">
          Sign in to access your exclusive discounts
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Work Email
          </label>
          <div className="mt-1">
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="mt-1">
            <input
              type="password"
              id="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
            />
          </div>
        </div>

        <div className="flex items-center justify-end">
          <Link to="/forgot-password" className="text-sm text-primary-600 hover:text-primary-700">
            Forgot your password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Sign in
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-2 text-sm">
          <span className="text-gray-600">Don't have an account?</span>
          <Link to="/signup" className="text-primary-600 hover:text-primary-700">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}