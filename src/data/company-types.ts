import { Store, Building2, Network, Laptop, Building } from 'lucide-react';
import type { CompanyType } from '../types/company-types';

export const companyTypes: CompanyType[] = [
  {
    id: 'store',
    name: 'Store Staff',
    icon: Store,
    description: 'Retail store employees, managers, and sales associates',
    members: [
      {
        src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=128&h=128&fit=crop',
        alt: 'Store Staff Member'
      }
    ]
  },
  {
    id: 'agencies',
    name: 'Agencies',
    icon: Building2,
    description: 'Marketing and ecommerce agency professionals',
    members: [
      {
        src: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=128&h=128&fit=crop',
        alt: 'Agency Professional'
      }
    ]
  },
  {
    id: 'affiliate',
    name: 'Affiliate Networks',
    icon: Network,
    description: 'Publishers and affiliate marketing professionals',
    members: [
      {
        src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop',
        alt: 'Affiliate Network Member'
      }
    ]
  },
  {
    id: 'tech',
    name: 'Tech Partners',
    icon: Laptop,
    description: 'Professionals at retail technology companies',
    members: [
      {
        src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop',
        alt: 'Tech Partner'
      }
    ]
  },
  {
    id: 'retail-brands',
    name: 'Retail Brands',
    icon: Building,
    description: 'Team members at retail and DTC brands',
    members: [
      {
        src: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=128&h=128&fit=crop',
        alt: 'Retail Brand Professional'
      }
    ]
  }
];