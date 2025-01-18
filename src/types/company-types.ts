import type { LucideIcon } from 'lucide-react';

export interface CompanyMember {
  src: string;
  alt: string;
}

export interface CompanyType {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  members: CompanyMember[];
}