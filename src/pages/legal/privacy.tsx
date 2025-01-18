import { MetaTags } from '../../components/seo/meta-tags';

export function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <MetaTags
        title="Privacy Policy"
        description="Learn how RetailCrew protects and handles your personal information."
      />

      <div className="prose mx-auto max-w-3xl">
        <h1>Privacy Policy</h1>

        <h2>1. Information We Collect</h2>
        <p>
          We collect information you provide directly, including:
        </p>
        <ul>
          <li>Name and email address</li>
          <li>Employment information for verification</li>
          <li>Company details and job title</li>
          <li>Usage data and interactions with offers</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>
          Your information helps us:
        </p>
        <ul>
          <li>Verify your retail industry status</li>
          <li>Provide access to exclusive discounts</li>
          <li>Improve our services and offers</li>
          <li>Communicate updates and recommendations</li>
        </ul>

        <h2>3. Information Sharing</h2>
        <p>
          We share information with:
        </p>
        <ul>
          <li>GoCertify for employment verification</li>
          <li>Partner brands (aggregated, non-personal data)</li>
          <li>Service providers who assist our operations</li>
        </ul>

        <h2>4. Data Security</h2>
        <p>
          We implement appropriate security measures to protect your information from 
          unauthorized access, alteration, or disclosure.
        </p>

        <h2>5. Your Rights</h2>
        <p>
          You have the right to:
        </p>
        <ul>
          <li>Access your personal information</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Opt-out of marketing communications</li>
        </ul>

        <h2>6. Cookies</h2>
        <p>
          We use cookies to improve your experience and analyze usage patterns. 
          You can control cookie preferences through your browser settings.
        </p>

        <h2>7. Updates</h2>
        <p>
          We may update this policy periodically. We will notify you of significant 
          changes via email or site notifications.
        </p>

        <h2>8. Contact</h2>
        <p>
          For privacy-related questions, please contact us at{' '}
          <a href="mailto:privacy@retailcrew.com">privacy@retailcrew.com</a>
        </p>
      </div>
    </div>
  );
}