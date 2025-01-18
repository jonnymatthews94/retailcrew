export interface SignupFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  companyType: string;
  companyName: string;
  companyWebsite: string;
  jobTitle: string;
  marketingConsent: boolean;
}

export interface LoginFormData {
  email: string;
  password: string;
}