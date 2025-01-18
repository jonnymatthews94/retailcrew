import { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSignupForm } from '../../../hooks/use-signup-form';
import { SignupSuccess } from '../signup-success';
import { VerificationDialog } from '../verification-dialog';
import { PersonalInfoStep, CompanyStep, JobInfoStep, ReviewStep } from './steps';

export function SignupForm() {
  const {
    step,
    setStep,
    isComplete,
    error,
    loading,
    formData,
    setFormData,
    handleSubmit
  } = useSignupForm();

  const [showVerification, setShowVerification] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const updateFields = (fields: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...fields }));
  };

  const validateStep = () => {
    const errors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.firstName?.trim()) errors.firstName = 'First name is required';
        if (!formData.lastName?.trim()) errors.lastName = 'Last name is required';
        if (!formData.email?.trim()) errors.email = 'Email is required';
        if (!formData.password?.trim()) errors.password = 'Password is required';
        if (!formData.phone?.trim()) errors.phone = 'Phone number is required';
        break;
      case 2:
        if (!formData.companyName?.trim()) errors.companyName = 'Company name is required';
        if (!formData.companyType?.trim()) errors.companyType = 'Company type is required';
        if (!formData.companyWebsite?.trim()) errors.companyWebsite = 'Company website is required';
        break;
      case 3:
        if (!formData.jobTitle?.trim()) errors.jobTitle = 'Job title is required';
        break;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleStepSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep()) return;

    if (step < 4) {
      setStep(step + 1);
      return;
    }
    
    try {
      await handleSubmit();
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  if (isComplete) {
    return (
      <>
        <SignupSuccess 
          onVerify={() => setShowVerification(true)}
          formData={{
            companyName: formData.companyName,
            companyType: formData.companyType,
            jobTitle: formData.jobTitle
          }}
        />
        <VerificationDialog 
          open={showVerification} 
          onClose={() => setShowVerification(false)} 
        />
      </>
    );
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Join RetailCrew</h1>
        <p className="mt-2 text-sm text-gray-600">
          Get access to exclusive discounts for ecommerce professionals
        </p>
        
        <div className="mt-8 flex items-center justify-center gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-2 w-2 rounded-full ${
                s <= step ? 'bg-primary-600' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      <form onSubmit={handleStepSubmit} className="mt-8 space-y-6">
        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {step === 1 && (
          <PersonalInfoStep
            formData={formData}
            updateFields={updateFields}
            errors={validationErrors}
          />
        )}

        {step === 2 && (
          <CompanyStep
            formData={formData}
            updateFields={updateFields}
            errors={validationErrors}
          />
        )}

        {step === 3 && (
          <JobInfoStep
            formData={formData}
            updateFields={updateFields}
            errors={validationErrors}
          />
        )}

        {step === 4 && (
          <ReviewStep formData={formData} />
        )}

        <div className="flex gap-4">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700 disabled:opacity-50"
          >
            {step === 4 ? (
              <>
                Complete signup
                <ArrowRight className="h-4 w-4" />
              </>
            ) : (
              'Continue'
            )}
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm">
          <span className="text-gray-600">Already have an account?</span>
          <Link to="/login" className="text-primary-600 hover:text-primary-700">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}