import { useState } from 'react';
import { VerificationStatusSection } from './sections/verification-status';
import { PersonalInfo } from './sections/personal-info';
import { EmployerInfo } from './sections/employer-info';
import { JobInfo } from './sections/job-info';
import { useUser } from '../../contexts/user-context';
import { useProfile } from '../../hooks/use-profile';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { debugLog } from '../debug/logger';

export function AccountSettings() {
  const { user } = useUser();
  const { profile, loading, updateProfile } = useProfile();
  const [error, setError] = useState<string | null>(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePersonalInfoUpdate = async (data: { 
    email: string; 
    firstName: string;
    lastName: string;
    phone: string;
  }) => {
    try {
      setUpdateLoading(true);
      setError(null);
      debugLog('info', 'Updating personal info', { data });
      await updateProfile({
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        phone: data.phone
      });
      showSuccessMessage();
      debugLog('success', 'Personal info updated');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update personal information';
      setError(message);
      debugLog('error', 'Personal info update failed', { error: message });
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleEmployerInfoUpdate = async (data: { 
    companyName: string; 
    companyType: string; 
    companyWebsite: string;
  }) => {
    try {
      setUpdateLoading(true);
      setError(null);
      debugLog('info', 'Updating employer info', { data });
      await updateProfile({
        company_name: data.companyName,
        company_type: data.companyType,
        company_website: data.companyWebsite
      });
      showSuccessMessage();
      debugLog('success', 'Employer info updated');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update employer information';
      setError(message);
      debugLog('error', 'Employer info update failed', { error: message });
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleJobInfoUpdate = async (data: { jobTitle: string }) => {
    try {
      setUpdateLoading(true);
      setError(null);
      debugLog('info', 'Updating job info', { data });
      await updateProfile({
        job_title: data.jobTitle
      });
      showSuccessMessage();
      debugLog('success', 'Job info updated');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update job information';
      setError(message);
      debugLog('error', 'Job info update failed', { error: message });
    } finally {
      setUpdateLoading(false);
    }
  };

  const showSuccessMessage = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  if (!user) return null;
  if (loading) return <div className="flex justify-center p-8"><Loader2 className="h-6 w-6 animate-spin" /></div>;

  return (
    <div className="space-y-12">
      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {showSuccess && (
        <div className="rounded-lg bg-green-50 p-4 flex items-center gap-2 text-green-600">
          <CheckCircle2 className="h-5 w-5" />
          <span>Changes saved successfully</span>
        </div>
      )}

      <VerificationStatusSection
        status={profile?.verification_status || 'not-verified'}
        expiryDate={profile?.verification_expiry}
      />

      <hr />

      <PersonalInfo
        email={profile?.email || ''}
        firstName={profile?.first_name || ''}
        lastName={profile?.last_name || ''}
        phone={profile?.phone || ''}
        onUpdate={handlePersonalInfoUpdate}
        loading={updateLoading}
      />

      <hr />

      <EmployerInfo
        companyName={profile?.company_name || ''}
        companyType={profile?.company_type || ''}
        companyWebsite={profile?.company_website || ''}
        onUpdate={handleEmployerInfoUpdate}
        loading={updateLoading}
      />

      <hr />

      <JobInfo
        jobTitle={profile?.job_title || ''}
        onUpdate={handleJobInfoUpdate}
        loading={updateLoading}
      />
    </div>
  );
}