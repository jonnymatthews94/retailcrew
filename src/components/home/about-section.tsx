import { AvatarGroup } from '../ui/avatar-group';
import { companyTypes } from '../../data/company-types';
import { Link } from 'react-router-dom';

// Get one member from each company type for diversity
const avatarImages = companyTypes.map(type => type.members[0]);

export function AboutSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-8">
            <AvatarGroup images={avatarImages} />
          </div>
          
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Join thousands of retail professionals
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Access exclusive discounts at hundreds of brands, free for everyone working in retail and ecommerce.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}