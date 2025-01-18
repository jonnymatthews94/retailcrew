import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/auth-context';
import { supabase } from '../lib/supabase';
import { useCompanyCreation } from './use-company-creation';
import type { SignupFormData } from '../types/auth';
import { debugLog } from '../components/debug/logger';

export function useSignupForm() {
  const [step, setStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuthContext();
  const { createCompany } = useCompanyCreation();
  
  const [formData, setFormData] = useState<SignupFormData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    companyType: '',
    companyName: '',
    companyWebsite: '',
    jobTitle: '',
    marketingConsent: true,
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      debugLog('info', 'Starting signup process', { 
        email: formData.email,
        companyType: formData.companyType 
      });

      // First create company
      const company = await createCompany({
        name: formData.companyName,
        website: formData.companyWebsite,
        type: formData.companyType
      });

      // Then sign up user
      const { data: authData, error: signUpError } = await signUp(
        formData.email, 
        formData.password
      );
      
      if (signUpError) throw signUpError;

      // Update profile with company info
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          job_title: formData.jobTitle,
          company_id: company.id,
          company_type: formData.companyType,
          company_name: formData.companyName,
          company_website: company.website
        })
        .eq('id', authData?.user?.id);

      if (profileError) throw profileError;

      debugLog('success', 'Signup completed successfully');
      setIsComplete(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred during signup';
      setError(message);
      debugLog('error', 'Signup failed', { error: message });
      throw err;
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