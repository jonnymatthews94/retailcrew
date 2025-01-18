import { MetaTags } from '../../components/seo/meta-tags';

export function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <MetaTags
        title="Terms of Service"
        description="RetailCrew terms of service and conditions for retail professionals and partner brands."
      />

      <div className="prose mx-auto max-w-3xl">
        <h1>Terms of Service</h1>
        
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using RetailCrew, you agree to be bound by these Terms of Service. 
          If you do not agree to these terms, please do not use our service.
        </p>

        <h2>2. Eligibility</h2>
        <p>
          RetailCrew is exclusively available to retail industry professionals. You must be 
          employed in the retail industry or related sectors to access our exclusive discounts.
        </p>

        <h2>3. Verification</h2>
        <p>
          We reserve the right to verify your retail industry status through our verification 
          partner, GoCertify. Providing false information may result in account termination.
        </p>

        <h2>4. Use of Discounts</h2>
        <p>
          Discount codes are for personal use only and may not be shared outside the RetailCrew 
          platform. Violation may result in account suspension.
        </p>

        <h2>5. Partner Brands</h2>
        <p>
          Partner brands set their own terms for discounts, including expiry dates and usage 
          restrictions. RetailCrew is not responsible for changes to partner offers.
        </p>

        <h2>6. Account Security</h2>
        <p>
          You are responsible for maintaining the security of your account credentials. 
          Notify us immediately if you suspect unauthorized access.
        </p>

        <h2>7. Privacy</h2>
        <p>
          Your use of RetailCrew is also governed by our Privacy Policy. Please review it 
          to understand how we collect and use your information.
        </p>

        <h2>8. Modifications</h2>
        <p>
          We reserve the right to modify these terms at any time. Continued use of RetailCrew 
          after changes constitutes acceptance of modified terms.
        </p>

        <h2>9. Termination</h2>
        <p>
          We may terminate or suspend access to RetailCrew immediately, without prior notice, 
          for conduct that we believe violates these terms.
        </p>

        <h2>10. Contact</h2>
        <p>
          For questions about these terms, please contact us at{' '}
          <a href="mailto:legal@retailcrew.com">legal@retailcrew.com</a>
        </p>
      </div>
    </div>
  );
}