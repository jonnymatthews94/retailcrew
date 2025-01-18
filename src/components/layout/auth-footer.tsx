import { Link } from 'react-router-dom';

export function AuthFooter() {
  return (
    <footer className="border-t py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
          <a
            href="mailto:marketplace@gocertify.me?subject=RetailCrew Support Request"
            className="hover:text-primary-600"
          >
            Support
          </a>
          <Link to="/privacy" className="hover:text-primary-600">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-primary-600">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}