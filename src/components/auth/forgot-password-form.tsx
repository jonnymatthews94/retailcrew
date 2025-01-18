import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement password reset logic
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <Check className="h-6 w-6 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold">Check your email</h1>
        <p className="mt-2 text-sm text-gray-600">
          We've sent password reset instructions to {email}
        </p>
        <Link
          to="/login"
          className="mt-6 inline-flex items-center gap-2 text-primary-600 hover:text-primary-700"
        >
          Back to sign in
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Reset your password</h1>
        <p className="mt-2 text-sm text-gray-600">
          Enter your email address and we'll send you instructions to reset your password
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="mt-1">
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
            />
          </div>
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700"
        >
          Send instructions
          <ArrowRight className="h-4 w-4" />
        </button>

        <div className="flex items-center justify-center gap-2 text-sm">
          <span className="text-gray-600">Remember your password?</span>
          <Link to="/login" className="text-primary-600 hover:text-primary-700">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}