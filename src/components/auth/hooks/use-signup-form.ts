import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/auth-context';
import { supabase } from '../../../lib/supabase';
import type { SignupFormData } from '../../../types/auth';

export function useSignupForm() {
  const [step, setStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuthContext();

  const [formData, setFormData] = useState<SignupFormData>({
    email: '',
    password: '',
    phone: '',
    jobTitle: '',
    companyType: '',
    companyName: '',
    companyWebsite: '',
    marketingConsent: true,
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      // Sign up with Supabase
      await signUp(formData.email, formData.password);

      // Create profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          email: formData.email,
          phone: formData.phone,
          job_title: formData.jobTitle,
          company_type: formData.companyType,
          company_name: formData.companyName,
          company_website: formData.companyWebsite,
        });

      if (profileError) throw profileError;

      setIsComplete(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return {
    step,
    setStep,
    isComplete,
    error,
    loading,
    formData,
    setFormData,
    handleSubmit,
  };
}