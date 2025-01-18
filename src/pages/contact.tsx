import { MetaTags } from '../components/seo/meta-tags';
import { ContactForm } from '../components/contact/contact-form';

export function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <MetaTags
        title="Contact Us"
        description="Get in touch with the RetailCrew team. We're here to help with any questions about our exclusive discounts for retail professionals."
      />

      <div className="mx-auto max-w-xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Contact Us</h1>
          <p className="mt-2 text-gray-600">
            Have a question or need help? Send us a message and we'll get back to you.
          </p>
        </div>

        <div className="mt-8">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}