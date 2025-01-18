import { useState } from 'react';
import { useContactForm } from '../../hooks/use-contact-form';
import { AuthButton } from '../auth/ui/auth-button';

interface ContactFormData {
  email: string;
  message: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const { submitMessage, loading, error } = useContactForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitMessage(formData.email, formData.message);
      setSubmitted(true);
    } catch (err) {
      // Error handling is done in the hook
    }
  };

  if (submitted) {
    return (
      <div className="text-center rounded-lg bg-primary-50 p-8">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
          <Check className="h-6 w-6 text-primary-600" />
        </div>
        <h2 className="mt-4 text-lg font-semibold">Message sent successfully</h2>
        <p className="mt-2 text-gray-600">
          Thanks for reaching out! We'll get back to you within 2 business days.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({ email: '', message: '' });
          }}
          className="mt-6 text-primary-600 hover:text-primary-700"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <div className="mt-1">
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
            placeholder="Enter your email"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Message
        </label>
        <div className="mt-1">
          <textarea
            id="message"
            required
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
            placeholder="How can we help?"
          />
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <AuthButton loading={loading}>
        Send message
      </AuthButton>
    </form>
  );
}