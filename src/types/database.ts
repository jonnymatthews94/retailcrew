export interface Profile {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  company_name: string | null;
  company_type: string | null;
  company_website: string | null;
  job_title: string | null;
  phone: string | null;
  verification_status: 'verified' | 'not-verified' | 'verified-expired';
  verification_expiry: string | null;
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at' | 'updated_at'>;
        Update: Partial<Profile>;
      };
      brands: {
        Row: {
          id: string;
          name: string;
          logo_url: string | null;
          website: string;
          category_id: string;
          description: string | null;
          status: 'pending' | 'approved' | 'rejected';
          created_at: string;
          updated_at: string;
        };
      };
      offers: {
        Row: {
          id: string;
          brand_id: string;
          title: string;
          description: string | null;
          discount_value: string;
          code: string;
          unique_per_user: boolean;
          start_date: string;
          expiry_date: string;
          terms: string[];
          status: 'pending' | 'approved' | 'rejected' | 'expired';
          created_at: string;
          updated_at: string;
        };
      };
      coupon_batches: {
        Row: {
          id: string;
          offer_id: string;
          name: string;
          total_codes: number;
          used_codes: number;
          alert_threshold: number;
          created_at: string;
          updated_at: string;
        };
      };
      coupon_codes: {
        Row: {
          id: string;
          batch_id: string;
          code: string;
          is_used: boolean;
          used_at: string | null;
          used_by: string | null;
          created_at: string;
        };
      };
    };
    Functions: {
      is_admin: {
        Args: Record<string, never>;
        Returns: boolean;
      };
    };
  };
}