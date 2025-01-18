export interface Company {
  id: string;
  name: string;
  website: string;
  type: string;
  employee_count: number;
  verified_employee_count: number;
  created_at: string;
  updated_at: string;
}

export interface CompanyEmployee {
  company_id: string;
  user_id: string;
  created_at: string;
}

export interface BrandManager {
  id: string;
  user_id: string;
  brand_id: string;
  status: 'pending' | 'approved' | 'rejected';
  approved_at?: string;
  approved_by?: string;
  rejection_reason?: string;
  created_at: string;
}